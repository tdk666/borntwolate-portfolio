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

        // PERFORMANCE: Early exit for static assets
        if (path.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|js|css|map|json|xml|txt|avif)$/i)) {
            return context.next();
        }

        // Remove trailing slash for matching
        if (path !== "/" && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const response = await context.next();

        // SECURITY: Only process HTML
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) {
            return response;
        }

        let metaData = null;
        let dynamicImageUrl = null;

        // 1. Check static dictionary
        if (seoDictionary[path]) {
            metaData = seoDictionary[path];
        }
        // 2. Check dynamic path
        else {
            const photoMatch = path.match(/^\/series\/([^/]+)\/([^/]+)$/);
            if (photoMatch) {
                const seriesId = photoMatch[1];
                const photoId = photoMatch[ photoMatch.length - 1]; // Robustness
                const formattedSeries = formatSlug(seriesId);
                const formattedPhoto = formatSlug(photoId);

                metaData = {
                    title: `Tirage Art: ${formattedPhoto} - ${formattedSeries} | Borntwolate`,
                    description: `Découvrez la photographie argentique "${formattedPhoto}" issue de la série "${formattedSeries}". Disponible en tirage d'art édition limitée.`
                };
                dynamicImageUrl = `${url.origin}/images/${seriesId}/${photoId}.jpg`;
            }
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

        if (!metaData) {
            return response;
        }

        // --- HTML REWRITER (Memory Efficient) ---
        // @ts-expect-error Deno-specific HTMLRewriter
        return new HTMLRewriter()
            .on("title", {
                element(el: any) { el.setInnerContent(metaData.title); }
            })
            .on("head", {
                element(el: any) {
                    // Inject Canonical
                    el.append(`<link rel="canonical" href="${url.origin}${path}" />`, { html: true });
                }
            })
            .on('meta[name="description"]', {
                element(el: any) { el.setAttribute("content", metaData.description); }
            })
            .on('meta[property="og:title"]', {
                element(el: any) { el.setAttribute("content", metaData.title); }
            })
            .on('meta[property="og:description"]', {
                element(el: any) { el.setAttribute("content", metaData.description); }
            })
            .on('meta[property="og:url"]', {
                element(el: any) { el.setAttribute("content", `${url.origin}${path}`); }
            })
            .on('meta[name="twitter:title"]', {
                element(el: any) { el.setAttribute("content", metaData.title); }
            })
            .on('meta[name="twitter:description"]', {
                element(el: any) { el.setAttribute("content", metaData.description); }
            })
            .on('head', {
                element(el: any) {
                    if (dynamicImageUrl) {
                        el.append(`<meta property="og:image" content="${dynamicImageUrl}" />`, { html: true });
                        el.append(`<meta name="twitter:image" content="${dynamicImageUrl}" />`, { html: true });
                    }
                }
            })
            .transform(response);

    } catch (error) {
        return context.next();
    }
};
