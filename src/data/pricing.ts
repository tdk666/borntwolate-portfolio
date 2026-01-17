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
        label: "La Collection",
        description: "L'œuvre pure. Tirage Fine Art sur papier Canson Infinity Baryta. Livré roulé, prêt à encadrer.",
        features: ["Papier Canson Baryta", "Qualité Musée", "Signé & Numéroté", "Livré roulé"],
        prices: {
            "20x30": 90,
            "30x45": 130,
            "40x60": 220,
            "60x90": 390
        },
        shipping: { france: 12, europe: 20, world: 35 }
    },
    elegance: {
        label: "L'Élégance",
        description: "La sobriété intemporelle. Encadrement aluminium noir mat Nielsen Alpha.",
        features: ["Cadre Nielsen Alpha", "Aluminium Noir Mat", "Prêt à accrocher", "Livraison Europe Uniq."],
        prices: {
            "30x45": 290,
            "40x60": 450
        },
        shipping: { france: 50, europe: 100, world: null }
    },
    galerie: {
        label: "La Galerie",
        description: "L'immersion totale. Tirage contrecollé flottant dans une Caisse Américaine en bois noir.",
        features: ["Caisse Américaine Bois", "Effet Flottant", "Finition Luxe", "Sans vitre (Reflets 0)"],
        prices: {
            "30x45": 450,
            "40x60": 650,
            "60x90": 950,
            "70x100": 1200
        },
        shipping: { france: 50, europe: 100, world: null }
    }
};
