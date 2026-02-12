import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

// Configuration
const QUALITY = 80;

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.warn(`Directory not found: ${directory}`);
        return;
    }

    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const filename = path.parse(entry.name).name;
                const webpPath = path.join(directory, `${filename}.webp`);
                const avifPath = path.join(directory, `${filename}.avif`);

                // Check if WebP exists
                if (!fs.existsSync(webpPath)) {
                    console.log(`Generating WebP for: ${entry.name}`);
                    await sharp(fullPath)
                        .webp({ quality: QUALITY })
                        .toFile(webpPath)
                        .catch(err => console.error(`Error converting ${entry.name} to WebP:`, err));
                }

                // Check if AVIF exists
                /* AVIF DISABLED FOR SPEED 
                if (!fs.existsSync(avifPath)) {
                    console.log(`Generating AVIF for: ${entry.name}`);
                    await sharp(fullPath)
                        .avif({ quality: 70 }) // AVIF is efficient, 70 is usually very good
                        .toFile(avifPath)
                        .catch(err => console.error(`Error converting ${entry.name} to AVIF:`, err));
                }
                */
            }
        }
    }
}

async function main() {
    console.log('🖼️  Starting Image Optimization (WebP/AVIF Generation)...');
    await processDirectory(IMAGES_DIR);
    await processDirectory(ASSETS_DIR);
    console.log('✅ Image Optimization Complete.');
}

main().catch(console.error);
