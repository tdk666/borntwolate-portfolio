// import { GoogleGenerativeAI } from "@google/generative-ai"; // REMOVED: Backend-First Architecture
import { photos, seriesData } from "../data/photos";
import { PRICING_CATALOG } from "../data/pricing";
import { aboutData } from "../data/about";
import { stockService } from "./stock"; // Import stock service

// Log once on load (Safety Check) - No longer needed as we use backend proxy
console.log("✅ Search Service: Using Netlify Proxy.");

const cleanJsonOutput = (text: string): string => {
  if (!text) return "[]"; // Safety for empty strings
  let clean = text.replace(/```json/g, "").replace(/```/g, "");
  return clean.trim();
};

export const getSemanticTags = async (query: string): Promise<string[]> => {
  if (!query || query.trim().length < 2) return [];

  const cacheKey = `gemini_tags_${query.trim().toLowerCase()}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* ignore */ }
  }

  try {
    console.log(`🔍 Gemini Search: Asking via Proxy...`);

    const prompt = `
      Analyze this search query for a photography portfolio: "${query}".
      
      Your goal is to be SURGICAL. Maximize precision, minimize noise.
      
      RULES:
      1. RETURN A JSON ARRAY of strings (valid JSON).
      2. SYNONYMS: Include close synonyms (e.g., "moto" -> "vespa", "scooter").
      3. TRANSLATION: Translate ONLY if the meaning is identical.
      4. ⛔ EXCLUSIONS (CRITICAL):
         - DO NOT include broad geographical terms like "Europe", "World", "Earth".
         - DO NOT include generic terms like "Travel", "Landscape", "Nature", "Photography", "Art".
         - DO NOT include colors UNLESS the query IS a color (e.g. "Red").
         - DO NOT split compound words (e.g. "New York" -> keep "New York", do NOT add "New" or "York").
      
      Example 1: "Italie" -> ["italie", "italy", "pouilles", "puglia", "apulia"] (NO "Europe", NO "Travel")
      Example 2: "Liberta Bianca" -> ["liberta bianca", "libertà", "white freedom", "vespa", "scooter"] (NO "White", NO "Snow")
      Example 3: "Neige" -> ["neige", "snow", "ski", "hiver", "winter", "montagne", "alpes"]
    `;

    // Re-use api-chat for search or keep ai-curator if it exists? 
    // The user instruction was specific about 'api-chat' for CHAT.
    // But 'getSemanticTags' also used 'ai-curator'. 
    // Using 'api-chat' here is safer as we control it.

    const response = await fetch('/.netlify/functions/api-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: prompt,
        systemInstruction: "You are a search query analyzer. Respond ONLY with a JSON array of strings."
      })
    });

    if (!response.ok) throw new Error('Proxy error');

    const data = await response.json();
    const text = data.text;

    console.log("🤖 Gemini Proxy Response:", text);

    const cleanedText = cleanJsonOutput(text);
    const tags = JSON.parse(cleanedText);

    if (Array.isArray(tags)) {
      const result = tags.map(t => String(t).toLowerCase());
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }
    return [];

  } catch (error: any) {
    console.error(`❌ Gemini Search Failed:`, error);
    return [];
  }
};

// --- CHATBOT LOGIC (PRESERVED) ---

const CONTEXT_DATA = {
  photographer: "Théophile Dequecker",
  bio: aboutData,
  brand: "Borntwolate",
  pricing: PRICING_CATALOG,
  routes: {
    "/portfolio": "Main Gallery",
    "/prints": "Print Shop (Buy Prints & Finitions)",
    "/about": "Artist Biography",
    "/contact": "Contact Form"
  },
  specs: {
    collection: "Fine Art Print on Canson Infinity Platine Fibre Rag 310g. Satin finish, deep blacks. Delivered rolled in a tube with a 5cm white margin for custom framing.",
    elegance: "Ready-to-Hang Framed Print. Nielsen Alpha Matte Black Aluminum Frame (Berlin design). Museum-grade Acid-Free White Passe-Partout. Mineral Glass. The timeless gallery look.",
    exception: "The Ultimate Finish. Print mounted on 1mm Aluminum, floating inside a Black Wood American Box (Caisse Américaine). No glass (Zero reflection). Depth: 40mm. Breathtaking immersion.",
    lab: "All prints are custom-made by PICTO Paris (Prestigious Fine Art Lab since 1950)."
  },
  legals: {
    shipping: "Expédition sous 7 à 10 jours ouvrés après réception du paiement. Livraison suivie.",
    returns: "Droit de rétractation : 14 jours à réception (frais de retour à la charge du client).",
    payment: "Paiement 100% sécurisé via Stripe. La commande n'est validée qu'après règlement.",
    editor: "Théophile Dequecker (Paris)",
    privacy: "Données traitées conformément au RGPD. Pas de partage tiers."
  },
  series: seriesData.map(s => ({
    id: s.id,
    title: s.title,
    desc: s.description?.fr?.slice(0, 150),
  })),
  photos: photos.map(p => ({
    id: p.id,
    title: p.title,
    series: p.seriesId,
    tags: p.tags,
    desc: {
      fr: p.caption_artistic?.fr?.slice(0, 120),
      en: p.caption_artistic?.en?.slice(0, 120),
    }
  }))
};



export const sendMessageToGemini = async (msg: string, history: any[], lang: string) => {
  try {
    // 1. Fetch Real-Time Stock
    const stocks = await stockService.getAllStocks();

    // 2. Map Stock to Normalized Title (Slug) for AI Context
    const STOCK_CONTEXT: Record<string, number> = {};

    Object.keys(stocks).forEach(slug => {
      const stock = stocks[slug];
      STOCK_CONTEXT[slug] = stock.total - stock.remaining;
    });

    // 3. Flatten Pricing Links for AI
    const PRICING_LINKS: Record<string, string> = {};
    Object.values(PRICING_CATALOG).forEach(range => {
      range.variants.forEach(variant => {
        const key = `${range.id}_${variant.id}`.toLowerCase();
        PRICING_LINKS[key] = variant.stripeUrl;
      });
    });

    // 4. Update Context with Stock & Links
    const DYNAMIC_CONTEXT = {
      ...CONTEXT_DATA,
      stocks: STOCK_CONTEXT, // Now uses standardized slugs from DB
      pricing_links: PRICING_LINKS
    };

    const contextPayload = {
      ...DYNAMIC_CONTEXT,
      instructions: `
        CURRENT USER LANGUAGE: ${lang}

        ⭐⭐ CRITICAL STOCK INSTRUCTION ⭐⭐
        1. The 'data.photos' list contains titles (e.g., "Le Gardien des Cimes").
        2. To check stock, convert title to slug: lowercase, remove accents, replace spaces with "-".
           Example: "Le Gardien des Cimes" -> "le-gardien-des-cimes".
        3. Look up this slug in 'stocks'. If missing -> Stock is FULL (0 sold).
        
        ⭐⭐ CRITICAL INSTRUCTION FOR PAYMENT LINKS ⭐⭐
        To find the Stripe URL:
        1. Identify the Range ID (collection, elegance, exception).
        2. Identify the Variant ID (20x30, 40x60, etc.).
        3. Look up the key "range_variant" in 'pricing_links' (e.g., "exception_40x60").
        4. YOU MUST APPEND THE SLUG TO THE URL as '?client_reference_id=[the_slug_you_checked]'.
           Example: "https://buy.stripe.com/xyz...Id" -> "https://buy.stripe.com/xyz...Id?client_reference_id=le-gardien-des-cimes"
        5. INSERT THIS FULL URL into the JSON 'ai_summary'.
        `
    };

    // CHANGED: Use Backend Proxy 'api-chat' instead of client-side SDK or 'ai-curator'
    const response = await fetch('/.netlify/functions/api-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
        history: history,
        context: contextPayload // Send context only, System Instruction is on server
      })
    });

    if (!response.ok) {
      let errorMsg = 'Proxy chat error';
      try {
        const errData = await response.json();
        if (errData.error) errorMsg = errData.error;
        if (errData.details) errorMsg += ` | Details: ${errData.details}`;
      } catch (e) {
        // ignore json parse error
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const debugModels = () => console.log("Debug: Gemini Service & Chatbot Ready (Backend Mode)");