const fetch = require('node-fetch');

async function testPurchase() {
  console.log("Generating fake Stripe webhook event to create a Legacy code...");
  
  // Fake Stripe Checkout Session Completed event
  const fakeEvent = {
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_' + Math.random().toString(36).substring(7),
        customer_details: {
          name: 'Test Collector',
          email: 'test@borntoolate.com'
        },
        metadata: {
          slug: 'retro-mountain-01',
          format: 'Galerie',
          frame: 'Noir'
        },
        amount_total: 15000 // 150e
      }
    }
  };

  try {
    const res = await fetch('http://localhost:8888/.netlify/functions/stripe-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: The webhook usually verifies the Stripe signature. 
        // For local testing without valid signature, we might need a workaround if the webhook strictly enforces it.
        // Let's assume for now we can bypass it or we'll need to inject the code directly via supabase.
      },
      body: JSON.stringify(fakeEvent)
    });
    
    console.log("Webhook response status:", res.status);
    const text = await res.text();
    console.log("Webhook response body:", text);
    
  } catch(e) {
    console.error("Error calling webhook:", e);
  }
}

testPurchase();
