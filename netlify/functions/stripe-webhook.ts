
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-04-10',
});

// Initialize Supabase (Admin Context for writing orders)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // MUST use Service Role for Admin writes if RLS is strict
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
        console.error('Missing Stripe Signature or Webhook Secret');
        return { statusCode: 400, body: 'Missing signature or secret' };
    }

    let stripeEvent: Stripe.Event;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body || '', sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    // Handle specific events
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        try {
            console.log(`[ORDER-START] Processing Order for Session: ${session.id}`);

            // Extract Customer Details
            const customerEmail = session.customer_details?.email;
            const customerName = session.customer_details?.name;
            const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
            const currency = session.currency;

            // Extract Sold Item Info from Metadata (Robustness)
            const soldItemSlug = session.client_reference_id || session.metadata?.product_id || 'unknown';
            const soldItemLabel = session.metadata?.product_label || 'Unknown Product';

            console.log(JSON.stringify({
                event: 'ORDER_RECEIVED',
                sessionId: session.id,
                email: customerEmail,
                amount: amountTotal,
                currency: currency,
                itemSlug: soldItemSlug,
                itemLabel: soldItemLabel
            }));

            // Extract Shipping Details (if available)
            const shippingAddress = session.shipping_details?.address;
            const formattedAddress = shippingAddress ?
                `${shippingAddress.line1 || ''} ${shippingAddress.line2 || ''}, ${shippingAddress.postal_code || ''} ${shippingAddress.city || ''}, ${shippingAddress.country || ''}`.trim()
                : 'N/A';

            // Insert into Supabase 'orders' table
            // Ensure you have an 'orders' table with these columns!
            const { error } = await supabase
                .from('orders')
                .insert({
                    stripe_session_id: session.id,
                    customer_email: customerEmail,
                    customer_name: customerName,
                    amount_total: amountTotal,
                    currency: currency,
                    status: session.payment_status, // usually 'paid'
                    shipping_address: formattedAddress,
                    created_at: new Date().toISOString(),
                    // Merge Stripe Metadata with essential top-level info like client_reference_id (The Slug)
                    metadata: {
                        ...session.metadata,
                        client_reference_id: session.client_reference_id,
                        payment_intent: session.payment_intent
                    }
                });

            if (error) {
                console.error('[DB-ERROR] Supabase Insert Error:', error);
                // We return 500 to tell Stripe to retry ONLY if we couldn't record the order
                return { statusCode: 500, body: 'Database Error - Order Not Recorded' };
            }

            console.log(`[ORDER-SAVED] Order successfully recorded in Supabase: ${session.id}`);

            // Increment Stock (Sold Count) if client_reference_id (slug) is present
            if (soldItemSlug && soldItemSlug !== 'unknown') {
                console.log(`[STOCK-UPDATE] Attempting to increment stock for slug: ${soldItemSlug}`);

                const { error: rpcError } = await supabase.rpc('increment_stock', {
                    stock_slug: soldItemSlug
                });

                if (rpcError) {
                    // CRITICAL: Log this deeply but DO NOT fail the webhook. The order is paid and recorded.
                    // Stock discrepancy can be fixed manually.
                    console.error(`[STOCK-ERROR] FAILED to increment stock for ${soldItemSlug}. Details:`, rpcError);
                } else {
                    console.log(`[STOCK-SUCCESS] Stock incremented for ${soldItemSlug}`);
                }
            } else {
                console.warn('[STOCK-WARN] No client_reference_id or product_id found, skipping stock update.');
            }

            // ==================================================================
            // LEGACY MAP: Generate & Assign Secret Code
            // ==================================================================
            try {
                const prefixes = ['ART', 'FILM', 'NOIR', 'KODAK', 'FUJI', 'LEICA', 'SILVER', 'GRAIN'];
                const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 1000-9999
                const secretCode = `${randomPrefix}-${randomSuffix}`;

                const { error: legacyError } = await supabase
                    .from('owners_legacy')
                    .insert({
                        stripe_session_id: session.id,
                        code_secret: secretCode,
                        art_slug: soldItemSlug !== 'unknown' ? soldItemSlug : null,
                        is_claimed: false
                    });

                if (legacyError) {
                    console.error('[LEGACY-ERROR] Failed to generate code:', legacyError);
                } else {
                    console.log(`[LEGACY-SUCCESS] Generated code ${secretCode} for session ${session.id}`);
                }

            } catch (legacyEx) {
                console.error('[LEGACY-CRASH] Error generating legacy code:', legacyEx);
            }
            // ==================================================================

        } catch (error: any) {
            console.error('[CRITICAL-ERROR] Order Processing Exception:', error);
            // If we crash here, it's likely bad. Stripe should probably retry.
            return { statusCode: 500, body: `Internal Server Error: ${error.message}` };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};
