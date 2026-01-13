import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object; // Nouveau : Pour les données structurées JSON-LD
}

export const SEO = ({
    title,
    description,
    image = 'https://borntwolate.com/images/canadian-evasion/infinity.JPG', // Image par défaut forte
    url = 'https://borntwolate.com',
    type = 'website',
    schema
}: SEOProps) => {
    const siteTitle = 'Born Too Late';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // URL canonique absolue obligatoire pour le SEO
    const absoluteUrl = url.startsWith('http') ? url : `https://borntwolate.com${url}`;
    const absoluteImage = image.startsWith('http') ? image : `https://borntwolate.com${image}`;

    // Schéma de base : Identité de l'Artiste (sur toutes les pages)
    const baseSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "Born Too Late",
                "url": "https://borntwolate.com",
                "author": {
                    "@type": "Person",
                    "name": "Théophile Dequecker",
                    "jobTitle": "Photographe Argentique"
                }
            },
            {
                "@type": "Person",
                "name": "Théophile Dequecker",
                "url": "https://borntwolate.com",
                "sameAs": ["https://www.instagram.com/borntwolate_/"],
                "jobTitle": "Photographe Argentique",
                "description": "Photographe argentique basé à Paris, spécialisé dans le voyage et l'esthétique du grain 35mm."
            }
        ]
    };

    // Fusion du schéma de base avec le schéma spécifique de la page (si fourni)
    const finalSchema = schema
        ? { "@context": "https://schema.org", "@graph": [...baseSchema["@graph"], schema] }
        : baseSchema;

    return (
        <Helmet>
            {/* Balises Méta Essentielles */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="photographe argentique, born too late, film photography, 35mm, portfolio photo, paris, argentique couleur" />
            <link rel="canonical" href={absoluteUrl} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Théophile Dequecker" />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:url" content={absoluteUrl} />
            <meta property="og:site_name" content="Born Too Late - Photographie Argentique" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />

            {/* Injection des Données Structurées JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};
