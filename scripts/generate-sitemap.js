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
const photosFilePath = path.join(__dirname, '../src/data/photos.ts');
let seriesData = [];

try {
  console.log(`📖 Reading ${photosFilePath}...`);
  const fileContent = fs.readFileSync(photosFilePath, 'utf-8');

  // Robust Parsing Strategy:
  // 1. Find all "id: 'series-slug'" patterns which denote a Series definition
  // 2. For each series, find the associated "photos: [...]" block
  // 3. Extract url and title from the photos block

  // Step 1: Normalize content to make regex easier (remove newlines inside objects potentially, but keeping it simple is better)
  // We will iterate through the file looking for series blocks.

  // Regex to find: { id: '...', ... photos: [ ... ] }
  // We assume 'id' comes before 'photos'.
  const seriesRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?photos:\s*\[([\s\S]*?)\]/g;

  let match;
  while ((match = seriesRegex.exec(fileContent)) !== null) {
    const seriesId = match[1]; // Captured ID
    const photosBlock = match[2]; // Captured photos array content

    const seriesObj = {
      id: seriesId,
      photos: []
    };

    // Parse photos within the block
    // Looking for: url: '...', title: '...'
    const photoRegex = /url:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"]/g;
    let photoMatch;

    while ((photoMatch = photoRegex.exec(photosBlock)) !== null) {
      seriesObj.photos.push({
        url: photoMatch[1],
        title: photoMatch[2]
      });
    }

    if (seriesObj.photos.length > 0) {
      seriesData.push(seriesObj);
    }
  }

  // VALIDATION: Fail if no data found
  const totalPhotos = seriesData.reduce((acc, s) => acc + s.photos.length, 0);

  console.log(`🔍 Found ${seriesData.length} series and ${totalPhotos} photos.`);

  if (seriesData.length === 0) {
    throw new Error("❌ CRITICAL: No series found in photos.ts. Sitemap generation aborted.");
  }
  if (totalPhotos === 0) {
    throw new Error("❌ CRITICAL: No photos extracted. Sitemap generation aborted.");
  }

} catch (error) {
  console.error(error.message);
  process.exit(1); // Fail the build
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
          <image:title>${photo.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</image:title>
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

} catch (error) {
  console.error('❌ Error writing sitemap.xml:', error);
  process.exit(1);
}
