import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { seriesData, type Photo } from '../data/photos';
import { PRICING_CATALOG } from '../data/pricing';
import React, { useMemo } from 'react';

export interface StructuredDataProps {
    type?: 'series' | 'article' | 'website' | 'product';
    seriesId?: string;
    data?: object | object[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type = 'website', seriesId, data }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';

    const generatedSchema = useMemo(() => {
        if (type === 'series' && seriesId) {
            const currentSeries = seriesData.find(s => s.id === seriesId);
            if (!currentSeries) return null;

            // Base Price Calculation (Lowest available price)
            let basePrice = 45; // Fallback
            if (PRICING_CATALOG && PRICING_CATALOG.collection && PRICING_CATALOG.collection.variants.length > 0) {
                basePrice = Math.min(...PRICING_CATALOG.collection.variants.map(v => v.price));
            }

            // Generate a Product Schema for EACH photo in the series
            const productSchemas = currentSeries.photos.map((photo: Photo) => {
                const title = photo.title;
                const description = photo.caption_artistic?.[currentLang]
                    ? `${photo.caption_artistic[currentLang]} - Tirage d'art argentique limité.`
                    : `Tirage d'art argentique limité : ${title}.`;

                const photoSlug = photo.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");
                const acquireUrl = `https://borntwolate.com/contact?ref=${photoSlug}`;

                return {
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": title,
                    "description": description,
                    "image": {
                        "@type": "ImageObject",
                        "contentUrl": `https://borntwolate.com${photo.url}`,
                        "license": "https://borntwolate.com/legals",
                        "acquireLicensePage": "https://borntwolate.com/contact",
                        "creditText": "Born Too Late Photography",
                        "creator": {
                            "@type": "Person",
                            "name": "Théophile Dequecker"
                        },
                        "copyrightNotice": "© Borntwolate"
                    },
                    "sku": photoSlug,
                    "brand": {
                        "@type": "Brand",
                        "name": "Borntwolate"
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": acquireUrl,
                        "priceCurrency": "EUR",
                        "price": basePrice.toFixed(2),
                        "availability": "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition",
                        "shippingDetails": {
                            "@type": "OfferShippingDetails",
                            "shippingRate": {
                                "@type": "MonetaryAmount",
                                "value": 0,
                                "currency": "EUR"
                            },
                            "shippingDestination": {
                                "@type": "DefinedRegion",
                                "addressCountry": "FR"
                            },
                            "deliveryTime": {
                                "@type": "ShippingDeliveryTime",
                                "handlingTime": {
                                    "@type": "QuantitativeValue",
                                    "minValue": 3,
                                    "maxValue": 7,
                                    "unitCode": "DAY"
                                }
                            }
                        }
                    }
                };
            });

            return productSchemas;
        }

        // Default behavior for other types
        return Array.isArray(data)
            ? { "@context": "https://schema.org", "@graph": data }
            : { "@context": "https://schema.org", ...data };
    }, [type, seriesId, data, currentLang]);

    if (!generatedSchema) return null;

    // Handle array of schemas (case: Product List) vs single schema object
    const schemaContent = Array.isArray(generatedSchema)
        ? generatedSchema.map(schema => JSON.stringify(schema)).join('\n')
        : JSON.stringify(generatedSchema);

    return (
        <Helmet>
            {Array.isArray(generatedSchema) ? (
                generatedSchema.map((schema, index) => (
                    <script key={index} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))
            ) : (
                <script type="application/ld+json">
                    {schemaContent}
                </script>
            )}
        </Helmet>
    );
};
