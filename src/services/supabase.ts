
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase URL or Key is missing. Stock features will be disabled.');
}

// Export a safe client or cast to any to avoid type errors if null, 
// though createClient handles empty strings poorly, better to pass something valid or handle null.
// We will pass empty strings if missing, but log the warning above.
// Actual calls in stock.ts should check if this works or catch errors.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder-key');
