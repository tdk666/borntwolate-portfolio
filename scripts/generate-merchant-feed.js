import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Hack for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://borntwolate.com';
const PRICE_EUR = '45.00 EUR';

// Parsing Logic (Copied/Adapted from sitemap generator)
const photosFilePath = path.join(__dirname, '../src/data/photos.ts');
let products = [];

try {
    const fileContent = fs.readFileSync(photosFilePath, 'utf-8');

    // Strategy: Extract all photos with regex to capture properties
    // We need: id, seriesId context, title, caption, url

    // First, split by series to get seriesId context
    const seriesBlocks = fileContent.split(/id:\s*'([a-z0-9-]+)',/g);

    for (let i = 1; i < seriesBlocks.length; i += 2) {
        const seriesId = seriesBlocks[i];
        const content = seriesBlocks[i + 1];

        // Regex for photos within the series block
        // Looking for: id: 9105 ... url: ... title: ... caption_artistic: { fr: "..." }
        // We iterate through the content looking for photo objects

        // Simplification: We will just extract individual properties via global regex on the chunk
        // This assumes properties are somewhat close or we can parse objects.
        // Parsing JS object literals with regex is hard.

        // Better approach for Feed: We need correct descriptions.
        // Let's match the whole photo block if possible. 
        // Photo block starts with `{` and ends with `}` inside `photos: [...]`

        // Fallback: Let's use a capture group that grabs the content between `{` and `}` that looks like a photo
        const photoRegex = /{\s*id:\s*(\d+).*?url:\s*'([^']+)'.*?title:\s*(?:'([^']+)'|"([^"]+)")/gs;
        // Note: caption is harder because it's further down and multiline. 
        // We might have to fetch it separately or extend the regex.

        // Let's use a simpler regex to identify photos and then extract details from the match
        // Updated Regex to capture 'slug' property as well.
        // Needs to match: slug: 'my-slug'
        const detailedPhotoRegex = /{\s*id:\s*(\d+),.*?slug:\s*'([^']+)'.*?url:\s*'([^']+)'.*?title:\s*(?:'([^']+)'|"([^"]+)").*?caption_artistic:\s*{\s*fr:\s*(?:"([^"]*)"|`([^`]*)`)/gs;

        let match;
        while ((match = detailedPhotoRegex.exec(content)) !== null) {
            // match[1] = id
            // match[2] = slug
            // match[3] = url
            // match[4] or [5] = title
            // match[6] or [7] = caption (fr)

            const photoId = match[1];
            const slug = match[2];
            const url = match[3];
            const title = match[4] || match[5];
            const caption = match[6] || match[7] || "";

            products.push({
                id: photoId,
                slug: slug,
                seriesId: seriesId,
                url: url,
                title: title,
                description: caption.replace(/\s+/g, ' ').trim()
            });
        }
    }

} catch (error) {
    console.error('❌ Error parsing photos.ts for merchant feed:', error);
}

// Generate XML (RSS 2.0 / Atom)
const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>BornTwoLate Photography</title>
<link>${BASE_URL}</link>
<description>Limited Edition Analog Photography Prints</description>

${products.map(product => `
<item>
    <g:id>${product.id}</g:id>
    <g:title>${product.title.replace(/&/g, '&amp;')}</g:title>
    <g:description>${product.description.replace(/&/g, '&amp;').slice(0, 5000)}</g:description>
    <g:link>${BASE_URL}/series/${product.seriesId}/${product.slug}</g:link>
    <g:image_link>${BASE_URL}${product.url}</g:image_link>
    <g:brand>BornTwoLate</g:brand>
    <g:condition>new</g:condition>
    <g:availability>in_stock</g:availability>
    <g:price>${PRICE_EUR}</g:price>
    <g:google_product_category>821</g:google_product_category>
    <g:shipping_weight>0.5 kg</g:shipping_weight>
    <g:custom_label_0>${product.seriesId}</g:custom_label_0>
    
    <!-- Shipping Rules -->
    <g:shipping>
        <g:country>FR</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>DE</g:country>
        <g:service>Standard</g:service>
        <g:price>20.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>BE</g:country>
        <g:service>Standard</g:service>
        <g:price>20.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>IT</g:country>
        <g:service>Standard</g:service>
        <g:price>20.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>ES</g:country>
        <g:service>Standard</g:service>
        <g:price>20.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard</g:service>
        <g:price>20.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>US</g:country>
        <g:service>International</g:service>
        <g:price>35.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>CA</g:country>
        <g:service>International</g:service>
        <g:price>35.00 EUR</g:price>
    </g:shipping>
    <g:shipping>
        <g:country>CH</g:country>
        <g:service>International</g:service>
        <g:price>35.00 EUR</g:price>
    </g:shipping>
</item>
`).join('\n')}

</channel>
</rss>`;

// Write to public/products.xml
try {
    const publicPath = path.join(__dirname, '../public/products.xml');
    fs.writeFileSync(publicPath, xml);
    console.log(`✅ Merchant Feed generated at ${publicPath}`);

    // ALSO Write to dist/products.xml if it exists (for post-build execution)
    const distDir = path.join(__dirname, '../dist');
    if (fs.existsSync(distDir)) {
        const distPath = path.join(distDir, 'products.xml');
        fs.writeFileSync(distPath, xml);
        console.log(`✅ Merchant Feed ALSO generated at ${distPath}`);
    }

    console.log(`🛍️  Products: ${products.length}`);
} catch (error) {
    console.error('❌ Error writing products.xml:', error);
}
