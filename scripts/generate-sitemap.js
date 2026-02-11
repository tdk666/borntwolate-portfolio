import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hack for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://borntwolate.com';

// 1. Static Pages
const pages = [
  '',
  '/about',
  '/portfolio',
  '/series',
  '/contact',
  '/prints',
  '/legals',
  '/photographe-argentique'
];

// 2. Advanced Parsing of src/data/photos.ts
// We need to extract Series IDs AND their Photos (url, title, caption)
const photosFilePath = path.join(__dirname, '../src/data/photos.ts');
let seriesData = [];

try {
  const fileContent = fs.readFileSync(photosFilePath, 'utf-8');

  // Strategy: Split by "id: 'series-id'" to handle each series block
  // This is a naive but effective parser for the known file structure
  const seriesBlocks = fileContent.split(/id:\s*'([a-z0-9-]+)',/g);

  // seriesBlocks[0] is garbage before first match
  // seriesBlocks[1] is id, seriesBlocks[2] is content, seriesBlocks[3] is id...

  for (let i = 1; i < seriesBlocks.length; i += 2) {
    const id = seriesBlocks[i];
    const content = seriesBlocks[i + 1];

    const series = {
      id: id,
      photos: []
    };

    // Extract photos in this series block
    // Regex for photo objects: { ... url: '/images/...', title: '...', ... caption_artistic: { fr: "..." } }
    // We look for url and title/caption specifically
    const photoRegex = /url:\s*'([^']+)',\s*title:\s*(?:'([^']*)'|`([^`]*)`|"[^"]*").*?caption_artistic:\s*{\s*fr:\s*(?:"([^"]*)"|`([^`]*)`)/gs;

    let photoMatch;
    // We need to limit the search to the current series content
    // However, the split might be tricky if content overlaps. 
    // Let's rely on the fact that series are defined sequentially.

    // Actually, a safer regex approach for the whole file might be better to avoid boundaries issues.
    // Let's stick to the previous robust ID extraction for the main pages, 
    // and try a best-effort extraction for images, as strict parsing of TS without AST is hard.

    // NEW STRATEGY: 
    // 1. Get all series IDs (we already mastered this).
    // 2. Extract ALL photos with their properties.
    // 3. Map photos to series based on the file hierarchy or assumption.

    // Let's refine the "Split" strategy which is actually decent if the file format is strict.
    // The file format is: { id: 'slug', ..., photos: [ ... ] }

    // Extracting photos from the content chunk
    const urlRegex = /url:\s*'([^']+)'/g;
    const titleRegex = /title:\s*(?:'([^']+)'|"([^"]+)")/g;

    let matchUrl;
    while ((matchUrl = urlRegex.exec(content)) !== null) {
      // Find title near the URL? This is getting too loose.
      // Let's go for a simpler approach: Just list all images found in the series block.

      series.photos.push({
        url: matchUrl[1],
        title: `Photo ${id}` // Fallback if title parsing is too hard
      });
    }

    seriesData.push(series);
  }

  // Refined Parsing to get titles and captions properly if possible
  // We will re-read the file and use a global regex for photos
  // pattern: url: '...', title: '...',

  const allPhotos = [];
  const globalPhotoRegex = /url:\s*'([^']+)',\s*title:\s*(?:'([^']+)'|"([^"]+)")/g;
  let pMatch;
  while ((pMatch = globalPhotoRegex.exec(fileContent)) !== null) {
    allPhotos.push({
      url: pMatch[1],
      title: pMatch[2] || pMatch[3]
    });
  }

  // Now we map these back to series? 
  // Ideally, we want <image:loc>, <image:title>.
  // Since we know the folder structure /images/series-name/..., we can map URL to series ID!

  seriesData = seriesData.map(s => {
    s.photos = allPhotos.filter(p => p.url.includes(`/${s.id}/`) || p.url.includes(`/${s.id.replace('puglia-famiglia', 'puglia')}/`)); // Handle aliases if any, e.g. puglia-famiglia vs puglia
    return s;
  });

} catch (error) {
  console.error('❌ Error parsing photos.ts:', error);
  // Fallback
  seriesData = [
    { id: 'polish-hike', photos: [] },
    { id: 'white-mounts', photos: [] },
    { id: 'retro-mountain', photos: [] },
    { id: 'winter-in-the-fruit', photos: [] },
    { id: 'psychadelic-mtl', photos: [] },
    { id: 'canadian-evasion', photos: [] },
    { id: 'mauvais-garcons', photos: [] },
    { id: 'puglia-famiglia', photos: [] }
  ];
}

// 3. Generate XML with Image Extension
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        
  <!-- Static Pages -->
  ${pages.map(page => `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}

  <!-- Dynamic Series Pages with Images -->
  ${seriesData.map(series => `
    <url>
      <loc>${BASE_URL}/series/${series.id}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
      ${series.photos.map(photo => `
        <image:image>
          <image:loc>${BASE_URL}${photo.url}</image:loc>
          <image:title>${photo.title.replace(/&/g, '&amp;')}</image:title>
        </image:image>
      `).join('')}
    </url>
  `).join('')}
</urlset>`;

// 4. Write to public/sitemap.xml
try {
  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, sitemap);
  console.log(`✅ Sitemap with Images generated at ${publicPath}`);

  // ALSO Write to dist/sitemap.xml if it exists (for post-build execution)
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, sitemap);
    console.log(`✅ Sitemap ALSO generated at ${distPath}`);
  }

  console.log(`📊 URLs: ${pages.length + seriesData.length}`);
  console.log(`📸 Images Indexed: ${seriesData.reduce((acc, s) => acc + s.photos.length, 0)}`);
} catch (error) {
  console.error('❌ Error writing sitemap.xml:', error);
}
