export interface PricingItem {
    price: number;
    label: string;
}

export interface ShippingRates {
    france: number;
    europe: number;
    world: number | null; // null si pas de livraison
}

export interface ProductRange {
    label: string;
    description: string;
    features: string[];
    prices: Record<string, number>; // Format "20x30": 90
    shipping: ShippingRates;
}

export const PRICING_CATALOG: Record<string, ProductRange> = {
    collection: {
        label: "pricing.collection.label",
        description: "pricing.collection.description",
        features: [
            "pricing.collection.features.0",
            "pricing.collection.features.1",
            "pricing.collection.features.2",
            "pricing.collection.features.3"
        ],
        prices: {
            "20x30": 90,
            "30x45": 130,
            "40x60": 220,
            "60x90": 390
        },
        shipping: { france: 0, europe: 20, world: 35 }
    },
    elegance: {
        label: "pricing.elegance.label",
        description: "pricing.elegance.description",
        features: [
            "pricing.elegance.features.0",
            "pricing.elegance.features.1",
            "pricing.elegance.features.2",
            "pricing.elegance.features.3"
        ],
        prices: {
            "30x45": 290,
            "40x60": 450
        },
        shipping: { france: 0, europe: 100, world: null }
    },
    galerie: {
        label: "pricing.galerie.label",
        description: "pricing.galerie.description",
        features: [
            "pricing.galerie.features.0",
            "pricing.galerie.features.1",
            "pricing.galerie.features.2",
            "pricing.galerie.features.3"
        ],
        prices: {
            "30x45": 450,
            "40x60": 650,
            "60x90": 950,
            "70x100": 1200
        },
        shipping: { france: 0, europe: 100, world: null }
    }
};
