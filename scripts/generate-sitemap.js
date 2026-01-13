import fs from 'fs';

const BASE_URL = 'https://borntwolate.com';

const pages = [
    '',
    '/about',
    '/portfolio',
    '/series',
    '/contact',
    '/legals'
];

// Liste manuelle de tes séries
const seriesIds = [
    'canadian-evasion',
    'mauvais-garcons',
    'psychadelic-mtl',
    'winter-in-the-fruit',
    'retro-mountain',
    'blue-hour-paris', // Added consistent with likely data
    'puglia-famiglia',
    'bordeaux-archives'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <changefreq>monthly</changefreq>
      <priority>${page === '' ? 1.0 : 0.8}</priority>
    </url>
  `).join('')}
  ${seriesIds.map(id => `
    <url>
      <loc>${BASE_URL}/series/${id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('✅ Sitemap generated!');
