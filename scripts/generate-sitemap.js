import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hack pour __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://borntwolate.com';

// 1. Pages Statiques
const pages = [
  '',
  '/about',
  '/portfolio',
  '/series',
  '/contact',
  '/prints',
  '/legals'
];

// 2. Liste manuelle des IDs de séries
const seriesIds = [
  'polish-hike',
  'white-mounts',
  'puglia-famiglia',
  'retro-mountain',
  'winter-in-the-fruit',
  'psychadelic-mtl',
  'canadian-evasion',
  'mauvais-garcons'
];

// Génération du XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${BASE_URL}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
  ${seriesIds.map(id => `
    <url>
      <loc>${BASE_URL}/series/${id}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('')}
</urlset>`;

// Écriture du fichier dans /public
// Note: We are running from root usually, but using __dirname is safer if called deeply.
// However, since we write to ../public/sitemap.xml relative to /scripts/generate-sitemap.js
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully with ' + (pages.length + seriesIds.length) + ' URLs.');
