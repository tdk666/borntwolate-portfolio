import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object; // Nouveau : Injection de données structurées
}

export const SEO = ({
    title,
    description,
    image = 'https://borntwolate.com/images/cover-default.jpg', // Mets une URL absolue par défaut
    url = 'https://borntwolate.com',
    type = 'website',
    schema
}: SEOProps) => {
    const siteTitle = 'Born Too Late';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const absoluteUrl = url.startsWith('http') ? url : `https://borntwolate.com${url}`;
    const absoluteImage = image.startsWith('http') ? image : `https://borntwolate.com${image}`;

    // Schema de base (Site + Personne) toujours présent
    const baseSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "Born Too Late",
                "url": "https://borntwolate.com",
                "author": {
                    "@type": "Person",
                    "name": "Théophile Dequecker"
                }
            },
            {
                "@type": "Person",
                "name": "Théophile Dequecker",
                "jobTitle": "Photographe Argentique",
                "url": "https://borntwolate.com",
                "sameAs": ["https://www.instagram.com/borntwolate_/"]
            }
        ]
    };

    return (
        <Helmet>
            {/* Balises Visibles par les Robots uniquement */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Théophile Dequecker" />
            <link rel="canonical" href={absoluteUrl} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph (Facebook/Linkedin) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:url" content={absoluteUrl} />
            <meta property="og:site_name" content="Born Too Late" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />

            {/* JSON-LD : Le langage des robots */}
            <script type="application/ld+json">
                {JSON.stringify(schema ? { "@context": "https://schema.org", "@graph": [...baseSchema["@graph"], schema] } : baseSchema)}
            </script>
        </Helmet>
    );
};
