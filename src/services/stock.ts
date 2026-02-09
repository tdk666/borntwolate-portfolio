
import { supabase } from './supabase';

interface StockData {
    slug: string;
    sold_count: number;
}

export const stockService = {
    // Helper to generate consistent slugs from titles
    getSlug: (title: string): string => {
        return title.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Trim hyphens
    },

    getAllStocks: async (): Promise<Record<string, number>> => {
        try {
            // Inner try-catch to handle Supabase connection errors specifically
            try {
                const { data, error } = await supabase
                    .from('art_stocks')
                    .select('slug, sold_count');

                // If credentials were fake/missing, this will error
                if (error) throw error;

                const stocks: Record<string, number> = {};
                if (data) {
                    data.forEach((item: StockData) => {
                        stocks[item.slug] = item.sold_count;
                    });
                }
                return stocks;
            } catch (supaError) {
                console.warn("Stock fetch failed (likely missing env vars):", supaError);
                return {}; // Return empty object so app doesn't crash
            }
        } catch (error) {
            console.error('Error in getAllStocks wrapper:', error);
            return {};
        }
    },

    getStock: async (slug: string): Promise<number> => {
        try {
            const { data, error } = await supabase
                .from('art_stocks')
                .select('sold_count')
                .eq('slug', slug)
                .single();

            if (error) {
                // If error is PGRU-000 (no row), return 0
                if (error.code === 'PGRST116') return 0;
                throw error;
            }

            return data?.sold_count || 0;
        } catch (error) {
            console.warn(`Error fetching stock for ${slug} (using default 0):`, error);
            return 0;
        }
    },

    incrementStock: async (slug: string): Promise<{ success: boolean; newCount?: number; error?: any }> => {
        try {
            // First, get current count or create row if not exists
            const { data: currentData, error: fetchError } = await supabase
                .from('art_stocks')
                .select('sold_count')
                .eq('slug', slug)
                .single();

            let currentCount = 0;

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            if (currentData) {
                currentCount = currentData.sold_count;
            }

            // Upsert with increment
            const newCount = currentCount + 1;
            const { error: upsertError } = await supabase
                .from('art_stocks')
                .upsert({ slug, sold_count: newCount }, { onConflict: 'slug' });

            if (upsertError) throw upsertError;

            return { success: true, newCount };
        } catch (error) {
            console.error(`Error incrementing stock for ${slug}:`, error);
            return { success: false, error };
        }
    }
};
