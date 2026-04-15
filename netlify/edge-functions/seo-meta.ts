// @ts-expect-error Netlify Edge definitions are not local
import type { Context } from "https://edge.netlify.com";

const seoDictionary: Record<string, { title: string, description: string }> = {
    "/": {
        title: "Borntwolate | Photographie Argentique & Tirages d'Art - Paris",
        description: "Tirages d'art limités, Photographe Paris, Esthétique noir et blanc. Découvrez l'univers argentique de Borntwolate."
    },
    "/about": {
        title: "À propos | Borntwolate - Photographe",
        description: "Découvrez la démarche artistique et l'histoire de Théophile Dequecker, photographe argentique basé à Paris."
    },
    "/portfolio": {
        title: "Portfolio Photographie Argentique | Fine Art & Voyage | Borntwolate",
        description: "Galerie complète des œuvres photographiques de Théophile Dequecker. Tirages d'art disponibles pour les passionnés d'argentique."
    },
    "/series": {
        title: "Séries Photographiques Narratives, Reportage Argentique & Paysages",
        description: "Explorez les séries thématiques documentaires et artistiques de Théophile Dequecker. Un travail sur pellicule 35mm célébrant le grain et le temps."
    },
    "/prints": {
        title: "Acheter Tirage d'Art Photographique (Édition Limitée) | Borntwolate",
        description: "Tirages originaux signés et numérotés. Qualité musée pour collectionneurs d'art contemporain et photographie argentique."
    },
    "/photographe-argentique": {
        title: "Photographe argentique Paris : Tirages d'art & Portfolio | Borntwolate",
        description: "Photographe argentique basé à Paris. Borntwolate capture la mélancolie urbaine et l'errance. Découvrez des tirages d'art limités (Qualité Musée / Picto) pour collectionneurs exigeants."
    }
};

const formatSlug = (slug: string) => {
    if (!slug) return '';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default async (request: Request, context: Context) => {
    try {
        const url = new URL(request.url);
        let path = url.pathname;

        // PERFORMANCE: Early exit for static assets to avoid unnecessary processing
        if (path.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|js|css|map|json|xml|txt|avif)$/i)) {
            return context.next();
        }
        
        // Remove trailing slash for matching
        if (path !== "/" && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const response = await context.next();
        
        // SECURITY SCRUB: Only process HTML responses
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) {
            return response;
        }

        let text = await response.text();
        let metaData = null;
        let dynamicImageUrl = null;
            
        // 1. Check static dictionary
        if (seoDictionary[path]) {
            metaData = seoDictionary[path];
        } 
        // 2. Check dynamic photo path
        else {
            const photoMatch = path.match(/^\/series\/([^/]+)\/([^/]+)$/);
            if (photoMatch) {
                const seriesId = photoMatch[1];
                const photoId = photoMatch[2];
                const formattedSeries = formatSlug(seriesId);
                const formattedPhoto = formatSlug(photoId);
                
                metaData = {
                    title: `Tirage Art: ${formattedPhoto} - ${formattedSeries} | Borntwolate`,
                    description: `Découvrez la photographie argentique "${formattedPhoto}" issue de la série "${formattedSeries}". Disponible en tirage d'art édition limitée.`
                };
                dynamicImageUrl = `${url.origin}/images/${seriesId}/${photoId}.jpg`;
            } 
            // 3. Check generic series path
            else {
                const seriesMatch = path.match(/^\/series\/([^/]+)$/);
                if (seriesMatch) {
                    const seriesId = seriesMatch[1];
                    const formattedSeries = formatSlug(seriesId);
                    metaData = {
                        title: `Série Photographique : ${formattedSeries} | Borntwolate`,
                        description: `Explorez la série de photographies argentiques "${formattedSeries}" capturée sur pellicule 35mm par Théophile Dequecker.`
                    };
                }
            }
        }

        // If we matched something, inject it
        if (metaData) {
            // HELPER: Inject or replace a meta tag
            const injectMeta = (html: string, nameOrProperty: string, value: string, isProperty = false) => {
                const attr = isProperty ? 'property' : 'name';
                const regex = new RegExp(`<meta [^>]*${attr}="${nameOrProperty.replace(/:/g, '\\:')}"[^>]*content="[^"]*"[^>]*>`, 'gi');
                const newTag = `<meta ${attr}="${nameOrProperty}" content="${value}" />`;
                
                if (html.match(regex)) {
                    return html.replace(regex, newTag);
                }
                return html.replace(/<\/head>/i, `${newTag}\n</head>`);
            };

            // 1. Canonical (Remove existing if present to avoid SEO penalty)
            text = text.replace(/<link rel="canonical" [^>]*>/gi, '');
            text = text.replace(/<\/head>/i, `<link rel="canonical" href="${url.origin}${path}" />\n</head>`);
            
            // 2. Title
            if (text.match(/<title>.*?<\/title>/gi)) {
                text = text.replace(/<title>.*?<\/title>/gi, `<title>${metaData.title}</title>`);
            } else {
                text = text.replace(/<\/head>/i, `<title>${metaData.title}</title>\n</head>`);
            }

            // 3. Description
            text = injectMeta(text, 'description', metaData.description);
            
            // 4. OpenGraph
            text = injectMeta(text, 'og:title', metaData.title, true);
            text = injectMeta(text, 'og:description', metaData.description, true);
            text = injectMeta(text, 'og:url', `${url.origin}${path}`, true);
            
            // 5. Twitter
            text = injectMeta(text, 'twitter:title', metaData.title);
            text = injectMeta(text, 'twitter:description', metaData.description);
            
            // 6. Image (OpenGraph & Twitter)
            if (dynamicImageUrl) {
                text = injectMeta(text, 'og:image', dynamicImageUrl, true);
                text = injectMeta(text, 'twitter:image', dynamicImageUrl);
            }
        }

        return new Response(text, {
            status: response.status,
            headers: response.headers,
        });
    } catch (error) {
        return context.next();
    }
};
