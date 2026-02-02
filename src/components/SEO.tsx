import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object;
    robots?: string;
    keywords?: string;
}

export const SEO = ({
    title,
    description,
    image,
    url = '/',
    type = 'website',
    schema,
    robots = 'index, follow',
    keywords
}: SEOProps) => {
    const siteTitle = 'Born Too Late';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const baseUrl = 'https://borntwolate.com';

    // URL Canonique propre
    const absoluteUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

    // Gestion Intelligente de l'Image
    // 1. Si une image spécifique est fournie, on l'utilise.
    // 2. Sinon, on utilise la "Social Card" par défaut (1200x630px).
    // Note pour l'user: Il faudra créer une image 'public/social-card.jpg' (1200x630px)
    let imageUrl = image;
    if (!imageUrl) {
        imageUrl = '/social-card.jpg';
    }
    // Assure l'URL absolue
    const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

    // Schéma JSON-LD de base (Identité)
    const baseSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "Born Too Late",
                "url": baseUrl,
                "author": { "@type": "Person", "name": "Théophile Dequecker" }
            },
            {
                "@type": "Person",
                "name": "Théophile Dequecker",
                "jobTitle": "Photographe Argentique",
                "url": baseUrl,
                "sameAs": ["https://www.instagram.com/borntwolate_/"]
            }
        ]
    };

    const finalSchema = schema
        ? {
            "@context": "https://schema.org",
            "@graph": [
                ...baseSchema["@graph"],
                ...((schema as { "@graph"?: unknown[] })["@graph"] || [schema])
            ]
        }
        : baseSchema;

    return (
        <Helmet>
            {/* --- STANDARD --- */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Théophile Dequecker" />
            <link rel="canonical" href={absoluteUrl} />
            <meta name="robots" content={robots} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* --- FACEBOOK / OPEN GRAPH --- */}
            <meta property="og:site_name" content="Born Too Late" />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={absoluteUrl} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:alt" content={title} />

            {/* Taille idéale pour les réseaux (Indicatif, aide l'affichage) */}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* --- TWITTER --- */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
            <meta name="twitter:creator" content="@borntwolate_" />

            {/* --- DONNÉES STRUCTURÉES (JSON-LD) --- */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};
