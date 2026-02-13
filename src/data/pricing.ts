
export interface ProductVariant {
    id: string;
    label: string;
    details?: string; // Ex: "(Image 20x30)"
    price: number;
    stripeUrl: string; // Lien de paiement direct
}

export interface ProductRange {
    id: string;
    label: string;
    description: string;
    shipping_text: string;
    features: string[];
    variants: ProductVariant[];
}

export const PRICING_CATALOG: Record<string, ProductRange> = {
    collection: {
        id: 'collection',
        label: "La Collection",
        description: "L'entrée de gamme premium. Tirage Fine Art sur papier Canson Infinity Platine Fibre Rag 310g. Livré avec une marge blanche tournante pour faciliter l'encadrement futur.",
        shipping_text: "Livraison Offerte (France)",
        features: [
            "Papier Canson Platine 310g",
            "Marge blanche incluse (Protection)",
            "Signé & Numéroté (30 ex)",
            "Livré roulé (Tube renforcé)"
        ],
        variants: [
            { id: '20x30', label: '20x30 cm', price: 45, stripeUrl: 'https://buy.stripe.com/6oU8wP3t7cxE6FD73I1Jm0b' },
            { id: '30x45', label: '30x45 cm', price: 80, stripeUrl: 'https://buy.stripe.com/eVqfZh1kZ8hoe8573I1Jm0c' },
            { id: '40x60', label: '40x60 cm', price: 135, stripeUrl: 'https://buy.stripe.com/bJe7sL7Jn55c6FD2Ns1Jm0d' },
            { id: '60x90', label: '60x90 cm', price: 270, stripeUrl: 'https://buy.stripe.com/eVq9ATbZDapw2pnfAe1Jm0e' },
            { id: '70x105', label: '70x105 cm', price: 370, stripeUrl: 'https://buy.stripe.com/8x228r5BffJQ4xv5ZE1Jm0f' }
        ]
    },
    elegance: {
        id: 'elegance',
        label: "L'Élégance (Cadre)",
        description: "Le Prêt-à-accrocher intemporel. Tirage centré avec un Passe-Partout blanc tournant dans un cadre Aluminium Noir Mat (Nielsen Alpha).",
        shipping_text: "Livraison Incluse (France) • Europe (+50€)",
        features: [
            "Cadre Nielsen Alpha Noir",
            "Passe-partout Blanc Musée",
            "Verre Minéral & Dos Dibond",
            "Prêt à accrocher"
        ],
        variants: [
            { id: '30x40', label: 'Cadre 30x40 cm', details: '(Image 20x30)', price: 290, stripeUrl: 'https://buy.stripe.com/8x29AT9RvbtAfc90Fk1Jm0g' },
            { id: '40x60', label: 'Cadre 40x60 cm', details: '(Image 24x36)', price: 495, stripeUrl: 'https://buy.stripe.com/fZueVd1kZ8ho5Bz4VA1Jm0h' },
            { id: '60x80', label: 'Cadre 60x80 cm', details: '(Image 47x70)', price: 890, stripeUrl: 'https://buy.stripe.com/7sY5kDaVz8hobZXfAe1Jm0i' }
        ]
    },
    exception: {
        id: 'exception',
        label: "Exception (Caisse)",
        description: "La finition Galerie ultime. Tirage contrecollé sur Aluminium 1mm, flottant dans une Caisse Américaine en bois noir. Sans verre pour une immersion totale.",
        shipping_text: "Livraison Incluse (France) • Europe (+50€)",
        features: [
            "Caisse Américaine Bois Noir",
            "Contrecollage Alu 1mm",
            "Sans Vitre (Zéro Reflet)",
            "Aspect Flottant"
        ],
        variants: [
            { id: '24x36', label: 'Caisse 24x36 cm', price: 290, stripeUrl: 'https://buy.stripe.com/00wdR9gfT7dkaVT3Rw1Jm0j' },
            { id: '40x60', label: 'Caisse 40x60 cm', price: 490, stripeUrl: 'https://buy.stripe.com/bJedR97Jn69g5Bz87M1Jm0k' },
            { id: '50x75', label: 'Caisse 50x75 cm', price: 690, stripeUrl: 'https://buy.stripe.com/8x26oHd3Hapwd41ds61Jm0l' }
        ]
    }
};

interface PricingOverride {
    rangeId: string;
    formatId: string;
    price: number;
    stripeUrl?: string;
}

const applyPricingOverrides = (overrides: PricingOverride[]) => {
    overrides.forEach(o => {
        const range = PRICING_CATALOG[o.rangeId];
        if (range) {
            const variant = range.variants.find(v => v.id === o.formatId);
            if (variant) {
                variant.price = o.price;
                if (o.stripeUrl) variant.stripeUrl = o.stripeUrl;
            }
        }
    });
};

const CACHE_KEY = 'pricing_cache_v2';
const CACHE_DURATION = 60 * 60 * 1000; // 1h (3600000 ms)

export const fetchExternalPrices = async (): Promise<void> => {
    // Check Cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.debug("Pricing: Using cached data.");
                applyPricingOverrides(data);
                return;
            }
        } catch (e) {
            localStorage.removeItem(CACHE_KEY);
        }
    }

    try {
        // Call the Netlify Function
        const response = await fetch('/.netlify/functions/get-prices');
        if (!response.ok) throw new Error('Network response was not ok');

        const json: { values?: string[][] } = await response.json();

        if (json.values && json.values.length > 1) {
            const rows = json.values.slice(1); // Skip header
            // Expected Columns: [RangeID, FormatID, Price, StripeURL]
            // Example: ['collection', '20x30', '45', 'https://...']

            const overrides: PricingOverride[] = rows.map((r) => ({
                rangeId: r[0]?.toLowerCase().trim() || '',
                formatId: r[1]?.trim() || '',
                price: Number(r[2]?.replace(/[€$ ]/g, '').replace(',', '.')),
                stripeUrl: r[3]?.trim()
            })).filter((o): o is PricingOverride & { stripeUrl: string } => {
                return !!(o.rangeId && o.formatId && !isNaN(o.price) && o.stripeUrl);
            });

            if (overrides.length > 0) {
                // Cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: overrides
                }));

                applyPricingOverrides(overrides);
                console.debug(`Pricing: Updated ${overrides.length} prices from Netlify Function.`);
            }
        }
    } catch (err) {
        console.error("Pricing: API Error - using static data.", err);
    }
};
