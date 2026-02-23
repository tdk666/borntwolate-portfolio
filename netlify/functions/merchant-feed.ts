import { Handler } from '@netlify/functions';
// Note: In a real advanced setup, we'd import the actual 'photos.ts' and 'pricing.ts' 
// to dynamically build the exact stock and prices. Here is a high-performance 
// skeleton for generating the Google Merchant XML feed that can be easily expanded.

const headers = {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' // Cache for 1 day
};

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const DOMAIN = "https://borntwolate.com";

    // Standard RSS/XML skeleton for Google Merchant Center
    // This allows the user's products (Prints) to appear in Google Shopping dynamically
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Born Too Late - Tirages d'Art</title>
    <link>https://borntwolate.com</link>
    <description>Photographie argentique et tirages limités par Théophile Dequecker</description>
    
    <!-- Item 1: Example Skeleton -->
    <item>
      <g:id>p-puglia-vespa</g:id>
      <g:title>Liberta Bianca - Tirage d'Art Canson</g:title>
      <g:description>Photographie argentique en édition limitée tirée sur papier d'art Canson Infinity Platine Fibre Rag 310g.</g:description>
      <g:link>${DOMAIN}/series/puglia</g:link>
      <g:image_link>${DOMAIN}/images/puglia/vespa.jpg</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>150.00 EUR</g:price>
      <g:brand>Théophile Dequecker</g:brand>
      <g:google_product_category>Home &amp; Garden &gt; Decor &gt; Artwork &gt; Posters, Prints, &amp; Visual Artwork</g:google_product_category>
      <g:condition>new</g:condition>
      <g:material>Canson Infinity Platine</g:material>
      <g:color>Noir et Blanc</g:color>
    </item>

    <!-- This logic can scale by iterating over the photos.ts catalog -->
  </channel>
</rss>`;

    return {
        statusCode: 200,
        headers,
        body: xml
    };
};
