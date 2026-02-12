// import { GoogleGenerativeAI } from "@google/generative-ai";
import { photos, seriesData } from "../data/photos";
import { PRICING_CATALOG } from "../data/pricing";
import { aboutData } from "../data/about";
import { stockService } from "./stock"; // Import stock service

// SAFETY CHECK: Access key safely (Support both variable names)
// const API_KEY = import.meta.env.VITE_GEMINI_SEARCH_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// 1. Initialization - No longer needed client-side
// const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Log once on load (Safety Check) - No longer needed as we use backend proxy
console.log("✅ Search Service: Using Netlify Proxy.");

const cleanJsonOutput = (text: string): string => {
  if (!text) return "[]"; // Safety for empty strings
  let clean = text.replace(/```json/g, "").replace(/```/g, "");
  return clean.trim();
};

export const getSemanticTags = async (query: string): Promise<string[]> => {
  if (!query || query.trim().length < 2) return [];

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

    const response = await fetch('/.netlify/functions/ai-curator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error('Proxy error');

    const data = await response.json();
    const text = data.text;

    console.log("🤖 Gemini Proxy Response:", text);

    const cleanedText = cleanJsonOutput(text);
    const tags = JSON.parse(cleanedText);

    if (Array.isArray(tags)) {
      return tags.map(t => String(t).toLowerCase());
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
    desc: s.description
  })),
  photos: photos.map(p => ({
    id: p.id,
    title: p.title,
    series: p.seriesId,
    tags: p.tags,
    desc: p.caption_artistic
  }))
};

const SYSTEM_INSTRUCTION = `
You are **"Le Curator"**, the Intelligent Guide and Art Expert for **Borntwolate.com**.
Your tone is **WARM, NATURAL, AND CONCISE**. You are NOT a robot reading a script.

# 1. CORE BEHAVIOR
*   **Plain Text Only:** DO NOT use Markdown bolding (**text**) or italics (*text*). Use simple text.
*   **Adaptive Flow:**
    *   If the user asks about a general topic -> Be the "Gallery Guide" (Storytelling).
    *   If the user likes a SPECIFIC photo -> SKIP general questions. Jump to "Seller Mode" but be subtle.
    *   **CRITICAL:** If the user already identified the photo ("I love this Vespa"), DO NOT ask "What style do you like?". It's redundant. Ask directly about the Room/Space or the Format.

# 2. SELLING SCRIPT (FLEXIBLE)
Use this ONLY if the user is undecided.
*   "Where will it hang?" (Room)
*   "What color are the walls?" (Contrast vs Harmony)
*   "Collection (Print), Elegance (Frame), or Exception (Shadow Box)?"

# 3. TECHNICAL EXPERTISE (The "Why")
Explain the look based on the film:
*   **Kodak Gold:** Warm, vintage, nostalgic (Polish Hike).
*   **Portra 400:** Soft, pastel, fine grain, perfect for snow (White Mounts).
*   **CineStill 400D:** Cinematic, red halos, saturated (Puglia).
*   **Rollei Retro:** High contrast B&W, dramatic (Retro Mountain).

# 4. STRICT CONSTRAINTS (Negative Prompt)
*   **NO MARKDOWN:** No ** or * characters.
*   **NO FAKE INVENTORY:** Stock is real. Trust the context.
*   **NO PAYMENT CONFIRMATION:** You CANNOT verify if they paid.
    *   *Correct:* "The link will open. Detailed confirmation follows via email."
    *   *Wrong:* "Payment confirmed!" (You are lying).
*   **NO INVENTED FACTS:** If context is missing, suggest /contact.

# 5. CLOSING (The Synthesis)
If user confirms "I want to buy X in Format Y":
1.  **Check Stock:** If < 5 left, say "Only [X] left". Be honest.
2.  **Output JSON:**
    <<<ORDER_ACTION>>>
    {
      "client_name": "User Name",
      "artwork_title": "Title",
      "format": "Format",
      "price": "Price",
      "ai_summary": "--- FICHE SYNTHESE ---\nOeuvre: ...\nFinition: ...\nPrix: ...\n\nlien stripe: [Insert URL]\n\n"
    }
    <<<END_ACTION>>>
3.  **Final Message:** "I am opening the secure payment page for you. Follow the instructions on the screen to finalize."
`;

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

    const response = await fetch('/.netlify/functions/ai-curator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: msg,
        history: history,
        systemInstruction: SYSTEM_INSTRUCTION + `\n
        CONTEXT DATA:
        ${JSON.stringify(DYNAMIC_CONTEXT)}
        
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
      })
    });

    if (!response.ok) throw new Error('Proxy chat error');

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const debugModels = () => console.log("Debug: Gemini Service & Chatbot Ready");