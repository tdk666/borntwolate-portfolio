import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
    data: object | object[];
}

export const StructuredData = ({ data }: StructuredDataProps) => {
    const jsonLd = Array.isArray(data)
        ? { "@context": "https://schema.org", "@graph": data }
        : { "@context": "https://schema.org", ...data };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};
