import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MOLT2024'; // Fallback for dev

// Initialize Supabase (Service Role for Admin Access)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { password, orderId } = JSON.parse(event.body || '{}');

        // 1. Security Check
        if (password !== ADMIN_PASSWORD) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
        }

        if (!orderId) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing Order ID' }) };
        }

        // 2. Fetch Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .ilike('stripe_session_id', `%${orderId}%`) // Flexible search
            .single();

        if (orderError || !order) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Order not found' }) };
        }

        // 3. Fetch Legacy Code associated with this order
        const { data: legacyData } = await supabase
            .from('owners_legacy')
            .select('code_secret, is_claimed, owner_name, owner_city')
            .eq('stripe_session_id', order.stripe_session_id)
            .single();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order: order,
                legacy: legacyData || null // Can be null if not generated yet? Should exist though.
            }),
        };

    } catch (error: any) {
        console.error('Admin API Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
