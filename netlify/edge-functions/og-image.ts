import type { Context } from "https://edge.netlify.com";

// This Edge function intercepts requests to individual photos 
// and injects a custom Open Graph (OG) tag for social sharing.
export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const path = url.pathname;

    // Expected pattern: /series/:seriesId/:photoId
    const match = path.match(/^\/series\/([^/]+)\/([^/]+)/);

    // If it's not a photo detail page, just return the default response
    if (!match) {
        return context.next();
    }

    const seriesId = match[1];
    const photoId = match[2];

    try {
        // Fetch the standard index.html
        const response = await context.next();
        const text = await response.text();

        // Let's generate a temporary dynamic image URL based on the slug.
        // We assume the images are stored in /images/:seriesId/:photoId.jpg 
        // OR we can use the main series cover image if we don't have a lookup table here.
        // Since we don't have the full photos array in the Edge environment,
        // we'll try to guess the path or fallback to a generic series image.
        // In a real database scenario, we'd query Supabase here.
        const dynamicImageUrl = `${url.origin}/images/${seriesId}/${photoId}.jpg`;
        const dynamicTitle = `Série ${seriesId.charAt(0).toUpperCase() + seriesId.slice(1).replace('-', ' ')} - Œuvre d'Art | Born Too Late`;
        const dynamicDesc = "Découvrez cette photographie argentique en édition limitée tirée sur papier d'art Canson Infinity Platine.";

        // Replace the default Open Graph tags
        const modifiedText = text
            .replace(
                /<meta property="og:title" content="[^"]*"/i,
                `<meta property="og:title" content="${dynamicTitle}"`
            )
            .replace(
                /<meta property="og:image" content="[^"]*"/i,
                `<meta property="og:image" content="${dynamicImageUrl}"`
            )
            .replace(
                /<meta property="og:url" content="[^"]*"/i,
                `<meta property="og:url" content="${request.url}"`
            )
            .replace(
                /<meta property="og:description" content="[^"]*"/i,
                `<meta property="og:description" content="${dynamicDesc}"`
            );

        return new Response(modifiedText, {
            status: response.status,
            headers: response.headers,
        });

    } catch (error) {
        return context.next();
    }
};
