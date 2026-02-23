import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { seriesData, type Photo } from '../data/photos';
import { PRICING_CATALOG } from '../data/pricing';
import React, { useMemo, useState, useEffect } from 'react';
import { stockService } from '../services/stock';

export interface StructuredDataProps {
    type?: 'series' | 'article' | 'website' | 'product';
    seriesId?: string;
    data?: object | object[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type = 'website', seriesId, data }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';

    const [stocks, setStocks] = useState<Record<string, { remaining: number; total: number }>>({});

    useEffect(() => {
        if (type === 'series') {
            stockService.getAllStocks().then(setStocks).catch(console.error);
        }
    }, [type]);

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
                    ? `${photo.caption_artistic[currentLang]} - Tirage d'art argentique limité. (Ref: ${photo.id})`
                    : `Tirage d'art argentique limité : ${title}. (Ref: ${photo.id})`;

                const photoSlug = photo.slug || photo.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");
                const acquireUrl = `https://borntwolate.com/series/${currentSeries.id}#${photoSlug}`;

                const stockInfo = stocks[photo.slug];
                const isSoldOut = stockInfo && stockInfo.remaining === 0;

                return {
                    "@context": "https://schema.org",
                    "@type": ["Product", "VisualArtwork"],
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
                            "name": "Théophile Dequecker",
                            "sameAs": ["https://www.instagram.com/borntwolate_/"]
                        },
                        "copyrightNotice": "© Borntwolate"
                    },
                    "artform": "Photography",
                    "artMedium": "Analog Photography (Film)",
                    "surface": "Paper",
                    "sku": photoSlug,
                    "brand": {
                        "@type": "Brand",
                        "name": "Borntwolate",
                        "sameAs": ["https://www.instagram.com/borntwolate_/"]
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "5.0",
                        "reviewCount": "14"
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": acquireUrl,
                        "priceCurrency": "EUR",
                        "price": basePrice.toFixed(2),
                        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                        "availability": isSoldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition",
                        "hasMerchantReturnPolicy": {
                            "@type": "MerchantReturnPolicy",
                            "applicableCountry": "FR",
                            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                            "merchantReturnDays": "14",
                            "returnMethod": "https://schema.org/ReturnByMail",
                            "returnFees": "https://schema.org/CustomerResponsibility"
                        },
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
    }, [type, seriesId, data, currentLang, stocks]);

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
