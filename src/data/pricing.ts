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

export const fetchExternalPrices = async (): Promise<void> => {
    // SKELETON: Future Google Sheets API Integration
    // This function will fetch pricing overrides and update PRICING_CATALOG at runtime.
    // For V1, we rely on the static export below.
    console.debug("fetchExternalPrices: Placeholder for V2 dynamic pricing.");
    return Promise.resolve();
};

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
