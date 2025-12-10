import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
    schema?: object; // To inject structured JSON-LD data
}

export const SEO = ({ title, description, image, type = 'website', schema }: SEOProps) => {
    const siteTitle = "Théophile Dequecker | Born Two Late";
    const metaTitle = title === "Home" ? siteTitle : `${title} | ${siteTitle}`;

    // Default image if none provided (e.g., autoportrait or a generic share image)
    const shareImage = image ? image : "https://borntwolate.com/images/visuals/preview.jpg"; // Placeholder URL, to be updated

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={window.location.href} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={window.location.href} />
            {shareImage && <meta property="og:image" content={shareImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={description} />
            {shareImage && <meta name="twitter:image" content={shareImage} />}

            {/* GEO & Microdata Injection (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
