
import { supabase } from './supabase';



export const stockService = {


    getAllStocks: async (): Promise<Record<string, { remaining: number; total: number }>> => {
        try {
            const { data, error } = await supabase
                .from('art_stocks')
                .select('slug, sold_count, max_limit');

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
            return stocks;
        } catch (error) {
            console.warn("Stock fetch failed:", error);
            return {};
        }
    },

    getStock: async (slug: string): Promise<{ remaining: number; total: number; isFallback: boolean }> => {
        try {
            const { data, error } = await supabase
                .from('art_stocks')
                .select('sold_count, max_limit')
                .eq('slug', slug)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return { remaining: 30, total: 30, isFallback: false }; // Default if not found
                throw error;
            }

            const total = data?.max_limit || 30;
            const sold = data?.sold_count || 0;

            return {
                remaining: Math.max(0, total - sold),
                total: total,
                isFallback: false
            };
        } catch (error) {
            console.warn(`Error fetching stock for ${slug}:`, error);
            return { remaining: 0, total: 30, isFallback: true }; // Fail safe
        }
    }
};
