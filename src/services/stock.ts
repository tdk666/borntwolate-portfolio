import { supabase } from './supabase';

const CACHE_KEY = 'borntwolate_stock_cache';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// Timeout helper to avoid infinite loading
const fetchWithTimeout = async <T>(promise: Promise<T> | PromiseLike<T>, ms: number = 3000): Promise<T> => {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), ms);
    });
    return Promise.race([promise as Promise<T>, timeout]);
};

// Simple localized cache wrapper
const getCachedData = (key: string) => {
    try {
        const cached = localStorage.getItem(key);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) return data;
        }
    } catch (e) {
        // Ignore JSON parse errors
    }
    return null;
};

const setCachedData = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {
        // Handle QuotaExceededError
    }
};

export const stockService = {
    getAllStocks: async (): Promise<Record<string, { remaining: number; total: number }>> => {
        const cached = getCachedData(`${CACHE_KEY}_all`);
        if (cached) return cached;

        try {
            const query = supabase.from('art_stocks').select('slug, sold_count, max_limit');
            const { data, error } = await fetchWithTimeout<any>(query, 5000);

            if (error) throw error;

            const stocks: Record<string, { remaining: number; total: number }> = {};
            if (data) {
                data.forEach((item: any) => {
                    stocks[item.slug] = {
                        remaining: Math.max(0, (item.max_limit || 30) - (item.sold_count || 0)),
                        total: item.max_limit || 30
                    };
                });
            }
            setCachedData(`${CACHE_KEY}_all`, stocks);
            return stocks;
        } catch (error) {
            console.warn("Stock fetch failed (timeout or network):", error);
            const staleCache = localStorage.getItem(`${CACHE_KEY}_all`);
            if (staleCache) {
                try { return JSON.parse(staleCache).data; } catch (e) {}
            }
            return {};
        }
    },

    getStock: async (slug: string): Promise<{ remaining: number; total: number; isFallback: boolean }> => {
        const cached = getCachedData(`${CACHE_KEY}_${slug}`);
        if (cached) return cached;

        try {
            const query = supabase.from('art_stocks').select('sold_count, max_limit').eq('slug', slug).maybeSingle();
            const { data, error } = await fetchWithTimeout<any>(query, 3000);

            if (error) {
                if (error.code === 'PGRST116') return { remaining: 30, total: 30, isFallback: false }; // Default if not found
                throw error;
            }

            const total = data?.max_limit || 30;
            const sold = data?.sold_count || 0;

            const result = { remaining: Math.max(0, total - sold), total: total, isFallback: false };
            setCachedData(`${CACHE_KEY}_${slug}`, result);
            return result;
        } catch (error) {
            console.warn(`Error fetching stock for ${slug} (timeout or network):`, error);
            const staleCache = localStorage.getItem(`${CACHE_KEY}_${slug}`);
            if (staleCache) {
                try { return JSON.parse(staleCache).data; } catch (e) {}
            }
            return { remaining: 0, total: 30, isFallback: true }; // Fail safe
        }
    }
};
