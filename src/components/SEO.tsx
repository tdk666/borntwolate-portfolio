import { Helmet } from 'react-helmet-async';

export interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    robots?: string;
    structuredData?: object;
}

export const SEO = ({
    title,
    description,
    image,
    url = '/',
    type = 'website',
    robots = 'index, follow',
    structuredData
}: SEOProps) => {
    const siteTitle = 'Born Too Late';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const baseUrl = 'https://borntwolate.com';

    // URL Canonique propre (Removing trailing slashes to prevent dilution)
    const relativeUrl = url.startsWith('/') ? url : `/${url}`;
    const cleanRelativeUrl = relativeUrl !== '/' && relativeUrl.endsWith('/') ? relativeUrl.slice(0, -1) : relativeUrl;
    const absoluteUrl = `${baseUrl}${cleanRelativeUrl === '/' ? '' : cleanRelativeUrl}`;

    // Gestion Intelligente de l'Image
    // 1. Si une image spécifique est fournie, on l'utilise.
    // 2. Sinon, on utilise la "Social Card" par défaut (1200x630px).
    let imageUrl = image;
    if (!imageUrl) {
        imageUrl = '/social-card.jpg';
    }
    // Assure l'URL absolue pour l'image
    const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;

    // EDGE FUNCTION WIRING:
    // Encodage strict URI component pour le titre et l'image pour l'Edge Function og-image
    const encodedTitle = encodeURIComponent(fullTitle);
    const encodedImage = encodeURIComponent(absoluteImage);
    const dynamicOgImage = `${baseUrl}/og-image?title=${encodedTitle}&image=${encodedImage}`;

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
            },
            {
                "@type": "PhotographyBusiness",
                "name": "Borntwolate Photography",
                "image": "https://borntwolate.com/images/portrait.jpg",
                "@id": "https://borntwolate.com",
                "url": "https://borntwolate.com",
                "priceRange": "€€",
                "taxID": "94037981600010",
                "vatID": "FR00940379816",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "",
                    "addressLocality": "Paris",
                    "postalCode": "75000",
                    "addressCountry": "FR"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 48.8566,
                    "longitude": 2.3522
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                },
                "sameAs": [
                    "https://www.instagram.com/borntwolate.photo/"
                ]
            }
        ]
    };

    // BreadcrumbList dynamique basé sur l'URL
    const pathSegments = cleanRelativeUrl.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
        const itemListElement = pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            // If it's the last segment, use the SEO title for maximal semantic accuracy, else capitalize the segment
            const name = index === pathSegments.length - 1 ? fullTitle.split(' |')[0] : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            return {
                "@type": "ListItem",
                "position": index + 2,
                "name": name,
                "item": `${baseUrl}${path}`
            };
        });
        
        itemListElement.unshift({
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": baseUrl
        });

        (baseSchema["@graph"] as any[]).push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        });
    }

    const finalSchema = structuredData
        ? {
            "@context": "https://schema.org",
            "@graph": [
                ...baseSchema["@graph"],
                ...((structuredData as { "@graph"?: unknown[] })["@graph"] || [structuredData])
            ]
        }
        : baseSchema;

    return (
        <Helmet>
            {/* --- STANDARD --- */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} data-rh="true" />
            <meta name="author" content="Théophile Dequecker" data-rh="true" />
            <link rel="canonical" href={absoluteUrl} data-rh="true" />
            <link rel="alternate" hrefLang="fr" href={absoluteUrl} data-rh="true" />
            <link rel="alternate" hrefLang="en" href={`${absoluteUrl}?lang=en`} data-rh="true" />
            <link rel="alternate" hrefLang="x-default" href={absoluteUrl} data-rh="true" />
            <meta name="robots" content={robots} data-rh="true" />

            {/* --- FACEBOOK / OPEN GRAPH --- */}
            <meta property="og:site_name" content="Born Too Late" data-rh="true" />
            <meta property="og:locale" content="fr_FR" data-rh="true" />
            <meta property="og:type" content={type} data-rh="true" />
            <meta property="og:title" content={fullTitle} data-rh="true" />
            <meta property="og:description" content={description} data-rh="true" />
            <meta property="og:url" content={absoluteUrl} data-rh="true" />
            <meta property="og:image" content={dynamicOgImage} data-rh="true" />
            <meta property="og:image:alt" content={title} data-rh="true" />
            <meta property="og:image:width" content="1200" data-rh="true" />
            <meta property="og:image:height" content="630" data-rh="true" />

            {/* --- TWITTER --- */}
            <meta name="twitter:card" content="summary_large_image" data-rh="true" />
            <meta name="twitter:title" content={fullTitle} data-rh="true" />
            <meta name="twitter:description" content={description} data-rh="true" />
            <meta name="twitter:image" content={dynamicOgImage} data-rh="true" />
            <meta name="twitter:creator" content="@borntwolate_" data-rh="true" />

            {/* --- DONNÉES STRUCTURÉES (JSON-LD) --- */}
            <script type="application/ld+json" data-rh="true">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};
