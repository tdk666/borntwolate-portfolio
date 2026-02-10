import type { Series, Photo, LocalizedText } from '../data/photos';
import { PRICING_CATALOG } from '../data/pricing';

const BASE_URL = 'https://borntwolate.com';
const BRAND_NAME = 'BornTwoLate';

// Helper to get localized string or fallback
const getLoc = (text?: LocalizedText | string, lang: 'fr' | 'en' = 'fr'): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[lang];
};

interface Offer {
    "@type": "Offer";
    price: number;
    priceCurrency: string;
    availability: string;
    itemCondition: string;
    url: string;
    name: string;
}

// Generate Product Schema for a single photo
export const generatePhotoProductSchema = (photo: Photo, lang: 'fr' | 'en' = 'fr') => {
    const title = photo.title;
    const description = getLoc(photo.caption_artistic, lang) || `Fine Art Print: ${title}`;
    const imageUrl = `${BASE_URL}${photo.url}`;
    // const productUrl = `${BASE_URL}/series/${series.id}`; // Unused currently

    // Aggregate offers from PRICING_CATALOG
    // We assume all photos are available in 'Collection' and 'Elegance' ranges principally
    const offers: Offer[] = [];

    // Add Collection variants (Prints only)
    PRICING_CATALOG.collection.variants.forEach(variant => {
        offers.push({
            "@type": "Offer",
            "price": variant.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": variant.stripeUrl,
            "name": `${PRICING_CATALOG.collection.label} - ${variant.label}`
        });
    });

    // Add Elegance variants (Framed)
    PRICING_CATALOG.elegance.variants.forEach(variant => {
        offers.push({
            "@type": "Offer",
            "price": variant.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "url": variant.stripeUrl,
            "name": `${PRICING_CATALOG.elegance.label} - ${variant.label}`
        });
    });

    return {
        "@type": ["Product", "ImageObject"],
        "name": title,
        "description": description,
        "image": imageUrl,
        "contentUrl": imageUrl, // For ImageObject
        "license": "https://www.borntwolate.com/legals",
        "acquireLicensePage": "https://www.borntwolate.com/contact",
        "brand": {
            "@type": "Brand",
            "name": BRAND_NAME
        },
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...offers.map(o => o.price)),
            "highPrice": Math.max(...offers.map(o => o.price)),
            "priceCurrency": "EUR",
            "offerCount": offers.length.toString(),
            "offers": offers
        },
        "creator": {
            "@type": "Person",
            "name": "Borntwolate"
        },
        "creditText": "Born Too Late Photography",
        "copyrightNotice": "© Borntwolate"
    };
};

// Generate CollectionPage Schema for a Series
export const generateSeriesSchema = (series: Series, lang: 'fr' | 'en' = 'fr') => {
    const description = getLoc(series.description, lang);
    const products = series.photos.map((photo, index) => {
        return {
            ...generatePhotoProductSchema(photo, lang),
            "position": index + 1
        };
    });

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": series.title,
        "description": description,
        "url": `${BASE_URL}/series/${series.id}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": product
            }))
        }
    };
};
