
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
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
            console.log(`Processing Order for Session: ${session.id}`);

            // Extract Customer Details
            const customerEmail = session.customer_details?.email;
            const customerName = session.customer_details?.name;
            const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
            const currency = session.currency;

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
                    metadata: session.metadata // Custom metadata (e.g. photo_id, artwork_title) passed from checkout
                });

            if (error) {
                console.error('Supabase Insert Error:', error);
                // We return 500 to tell Stripe to retry
                return { statusCode: 500, body: 'Database Error' };
            }

            console.log(`Order successfully recorded in Supabase: ${session.id}`);

        } catch (error) {
            console.error('Order Processing Error:', error);
            return { statusCode: 500, body: 'Internal Server Error' };
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};
