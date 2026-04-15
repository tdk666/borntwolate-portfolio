import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hack for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://borntwolate.com';

// ------------------------------------------------------------------
// 1. DEFINITION DU CATALOGUE (Hardcoded pour stabilité Build Script)
// ------------------------------------------------------------------
// Copie conforme de src/data/pricing.ts
const PRICING_CATALOG = {
    collection: {
        id: 'collection',
        label: "La Collection",
        description: "Tirage Fine Art sur papier Canson Infinity Platine Fibre Rag 310g. Marge blanche incluse.",
        shipping_category: 'print', // Lightweight
        variants: [
            { id: '20x30', label: '20x30 cm', price: '45.00', weight: '0.4 kg' },
            { id: '30x45', label: '30x45 cm', price: '80.00', weight: '0.6 kg' },
            { id: '40x60', label: '40x60 cm', price: '135.00', weight: '0.8 kg' },
            { id: '60x90', label: '60x90 cm', price: '270.00', weight: '1.2 kg' },
            { id: '70x105', label: '70x105 cm', price: '370.00', weight: '1.8 kg' }
        ]
    },
    elegance: {
        id: 'elegance',
        label: "L'Élégance (Cadre)",
        description: "Tirage encadré Nielsen Alpha Noir avec Passe-Partout blanc musée.",
        shipping_category: 'frame', // Heavy
        variants: [
            { id: '30x40', label: 'Cadre 30x40 cm', price: '290.00', weight: '3.5 kg' },
            { id: '40x60', label: 'Cadre 40x60 cm', price: '495.00', weight: '6.0 kg' },
            { id: '60x80', label: 'Cadre 60x80 cm', price: '890.00', weight: '9.5 kg' }
        ]
    },
    exception: {
        id: 'exception',
        label: "Exception (Caisse)",
        description: "Tirage contrecollé sur Alu dans une Caisse Américaine en bois noir. Finition Galerie.",
        shipping_category: 'frame', // Heavy
        variants: [
            { id: '24x36', label: 'Caisse 24x36 cm', price: '290.00', weight: '3.0 kg' },
            { id: '40x60', label: 'Caisse 40x60 cm', price: '490.00', weight: '5.5 kg' },
            { id: '50x75', label: 'Caisse 50x75 cm', price: '690.00', weight: '8.0 kg' }
        ]
    }
};

// ------------------------------------------------------------------
// ...
// (We keep logical code intact)
// ...
// ------------------------------------------------------------------

function getShippingRules(category) {
    const rules = [];

    // FRANCE (Toujours offert)
    rules.push(`
    <g:shipping>
        <g:country>FR</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 EUR</g:price>
    </g:shipping>`);

    // EUROPE (Zone 1)
    const europePrice = category === 'frame' ? '50.00' : '20.00';
    ['DE', 'BE', 'IT', 'ES', 'GB'].forEach(country => {
        rules.push(`
    <g:shipping>
        <g:country>${country}</g:country>
        <g:service>Standard</g:service>
        <g:price>${europePrice} EUR</g:price>
    </g:shipping>`);
    });

    // MONDE (Uniquement pour les TIRAGES)
    if (category === 'print') {
        ['US', 'CA', 'CH'].forEach(country => {
            rules.push(`
    <g:shipping>
        <g:country>${country}</g:country>
        <g:service>International</g:service>
        <g:price>35.00 EUR</g:price>
    </g:shipping>`);
        });
    }

    return rules.join('');
}

const photosFilePath = path.join(__dirname, '../src/data/photos.ts');
let products = [];

try {
    const fileContent = fs.readFileSync(photosFilePath, 'utf-8');
    const seriesBlocks = fileContent.split(/id:\s*'([a-z0-9-]+)',/g);

    for (let i = 1; i < seriesBlocks.length; i += 2) {
        const seriesId = seriesBlocks[i];
        const content = seriesBlocks[i + 1];
        // Robust regex to capture photo details regardless of property order or quote style
        const photoBlockRegex = /{[^{]*?slug:\s*['"`]([^'"`]+)['"`][^}]*?}/gs;
        
        let photoBlockMatch;
        while ((photoBlockMatch = photoBlockRegex.exec(content)) !== null) {
            const photoBlock = photoBlockMatch[0];
            
            // Helper to extract property value
            const extract = (prop, block) => {
                const regex = new RegExp(`${prop}:\\s*['"\`]([^'"\`]*?)['"\`]`, 's');
                const match = block.match(regex);
                return match ? match[1] : null;
            };

            const slug = extract('slug', photoBlock);
            const title = extract('title', photoBlock);
            const url = extract('url', photoBlock);
            
            // Special extraction for nested i18n caption
            const captionRegex = /caption_artistic:\s*{\s*fr:\s*['"`](.*?)['"`]/s;
            const captionMatch = photoBlock.match(captionRegex);
            const rawCaption = captionMatch ? captionMatch[1] : "";
            const caption = rawCaption.replace(/\\/g, '').replace(/\s+/g, ' ').replace(/['"]+/g, '').trim();

            if (slug && title && url) {
                Object.values(PRICING_CATALOG).forEach(range => {
                    range.variants.forEach(variant => {
                        products.push({
                            gId: `${slug}-${range.id}-${variant.id}`,
                            gItemGroupId: slug,
                            title: `Tirage Argentique ${title} - ${variant.label} - ${range.label}`,
                            description: `${range.description} ${caption}`.slice(0, 5000),
                            link: `${BASE_URL}/series/${seriesId}/${slug}`,
                            imageLink: `${BASE_URL}${url}`,
                            price: `${variant.price} EUR`,
                            weight: variant.weight,
                            shipping: getShippingRules(range.shipping_category),
                            customLabel0: seriesId,
                            customLabel1: range.id,
                            availability: 'in_stock',
                            quantity: 30
                        });
                    });
                });
            }
        }
    }
} catch (error) {
    console.error('❌ Error parsing photos.ts:', error);
    process.exit(1);
}

const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>BornTwoLate Photography</title>
<link>${BASE_URL}</link>
<description>Limited Edition Analog Photography Prints</description>

${products.map(p => `
<item>
    <g:id>${p.gId}</g:id>
    <g:item_group_id>${p.gItemGroupId}</g:item_group_id>
    <g:title>${p.title.replace(/&/g, '&amp;')}</g:title>
    <g:description>${p.description.replace(/&/g, '&amp;')}</g:description>
    <g:link>${p.link}</g:link>
    <g:image_link>${p.imageLink}</g:image_link>
    <g:brand>BornTwoLate</g:brand>
    <g:condition>new</g:condition>
    <g:availability>${p.availability}</g:availability>
    <g:quantity>${p.quantity}</g:quantity>
    <g:price>${p.price}</g:price>
    <g:shipping_weight>${p.weight}</g:shipping_weight>
    <g:google_product_category>2155</g:google_product_category>
    <g:custom_label_0>${p.customLabel0}</g:custom_label_0>
    <g:custom_label_1>${p.customLabel1}</g:custom_label_1>
    ${p.shipping}
</item>
`).join('')}
</channel>
</rss>`;

// ------------------------------------------------------------------
// 6. ÉCRITURE DU FICHIER
// ------------------------------------------------------------------
try {
    const publicPath = path.join(__dirname, '../public/products.xml');
    fs.writeFileSync(publicPath, xml);
    console.log(`✅ Merchant Feed generated at ${publicPath}`);

    const distDir = path.join(__dirname, '../dist');
    if (fs.existsSync(distDir)) {
        const distPath = path.join(distDir, 'products.xml');
        fs.writeFileSync(distPath, xml);
        console.log(`✅ Merchant Feed ALSO generated at ${distPath}`);
    }

    console.log(`🛍️  Total Products Generated: ${products.length} (Groups: ${products.length / 11})`);
} catch (error) {
    console.error('❌ Error writing XML:', error);
    process.exit(1);
}
