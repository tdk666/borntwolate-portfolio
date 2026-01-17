import { createContext, useContext, useState, type ReactNode } from 'react';

type Currency = 'EUR' | 'USD' | 'GBP';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (priceInEur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES: Record<Currency, number> = {
    EUR: 1,
    USD: 1.10,
    GBP: 0.85
};

const SYMBOLS: Record<Currency, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£'
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('EUR');

    const formatPrice = (priceInEur: number): string => {
        const rate = EXCHANGE_RATES[currency];
        const converted = priceInEur * rate;
        let finalPrice = converted;

        // Smart Rounding
        if (converted > 50) {
            // Round to nearest 5 (e.g., 142 -> 140, 144 -> 145)
            finalPrice = Math.round(converted / 5) * 5;
        } else {
            // Round to nearest integer (e.g., 34.2 -> 34)
            finalPrice = Math.round(converted);
        }

        // Formatting
        if (currency === 'EUR') {
            return `${finalPrice} €`;
        }
        return `${SYMBOLS[currency]}${finalPrice}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
    return context;
};
