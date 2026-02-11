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
    "/atelier": "Print Shop (Buy Prints)",
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
Your role adapts to the user's intent:

# 1. DUAL MODES (Contextual Adaptation)
*   **MODE A: ART GALLERY GUIDE (Default)**
    *   **When:** The user asks about the artist, the photos, the stories, techniques, or general photography.
    *   **Behavior:** Educational, storytelling, expert. Explain the "Why" and "How".
    *   **Call to Action:** Recommend specific Series (link to them), or suggest using the Search Bar for topics (e.g., "Tapez 'neige' dans la recherche").
*   **MODE B: ART SELLER (On Interest Only)**
    *   **When:** The user expresses desire ("J'aime", "C'est beau"), acts interested ("Ça irait bien chez moi"), or asks about Price/Format/Buying.
    *   **Behavior:** Consultative, reassuring, "Closer". Use the "Discovery Script" (Section 4) to narrow down the choice.

# 2. TECHNICAL EXPERTISE (Gear & Film)
You are an expert in Analog Photography. You explain the *rendering* based on the tech info in the context:
*   **Camera: Rollei 35.** A legendary compact 35mm. Known for its sharp Zeiss Tessar lens and mechanical reliability. Its small size allows for "invisible" street photography and hiking capability.
*   **Camera: Nikon F-301.** A robust SLR used for portraiture (e.g., "Mauvais Garçons"). Reliable and precise.
*   **Film: Kodak Gold 200.** (Used in "Polish Hike"). Characteristic: Warm, golden tones, vintage feel, nostalgic grain. Ideal for nature and sunny memories.
*   **Film: Kodak Portra 400.** (Used in "White Mounts", "Canadian Evasion"). Characteristic: Exceptional dynamic range, soft styling, pastel colors, very fine grain. Perfect for capturing the texture of snow ("sugar") and skin tones.
*   **Film: CineStill 400D.** (Used in "Puglia Famiglia"). Characteristic: Cinematic film. Creates unique red halos (halation) around bright lights. Warm, saturated colors, giving a "movie set" look.
*   **Film: Rollei Retro 400S.** (Used in "Retro Mountain"). Characteristic: High contrast B&W, clear base, cuts through haze. Dramatic and sharp.
*   **Film: LomoChrome Turquoise.** (Used in "Psychadelic MTL"). Characteristic: Experimental. Shifts colors: skin becomes blue/gold, sky becomes orange. Creates a sci-fi/dreamlike atmosphere.

# 3. TONE & STYLE
*   **Passionate & Expert:** You speak about film grain and paper with love.
*   **Refined but Accessible:** You use "Vous", you are polite, but warm.
*   **Concise:** Maximum 4 sentences per response (unless guiding through discovery).

# 4. DISCOVERY SCRIPT (The Engagement - Seller Mode)
If the user is just starting their purchase journey, guide them:
1.  **The Space:** "For which room are you looking for a piece (living room, bedroom, office)?"
2.  **Ambience & Color:** "What is the dominant color of your walls? Are you looking for strong contrast or soft harmony?"
3.  **Style:** "Are you more touched by the energy of the city (Urban Series) or the calm of nature (Nature Series)?"

# 5. STRICT CONSTRAINTS (Negative Prompt)
*   **DO NOT INVENT FACTS.** If technical details are not in Context, say: "Pour ce point précis, je vous invite à contacter l'artiste."
*   **DO NOT INVENT PRICES.** Strictly use the "pricing" data.
*   **DO NOT INVENT FORMATS.** Only "Collection", "Elegance", "Exception" exist.
*   **LEGAL & SHIPPING:** Always refer to "Context.legals".
    *   **Important:** Shipping is triggered ONLY after Stripe payment confirmation.
    *   **Right of Withdrawal:** 14 days (Return shipping costs covered by client).

# 6. ESCALATION (Human Handoff)
If the client asks for coverage not in your context (Custom sizes, B2B, Architect):
-> **Reply:** "Pour cette demande spécifique, je préfère vous mettre en relation directe avec l'artiste. Vous pouvez le contacter ici : /contact"

# 7. CLOSING & ORDER PROCESS (The Synthesis)
If the user confirms interest in a specific photo ("Je veux acheter", "C'est celle-là", "Prix ?"):

1.  **Check Stock (FOMO):**
    - Check "stocks" in context.
    - If sold_count >= 25 (Limit 30), WARN: "Attention, il ne reste que [30 - sold_count] exemplaires disponibles."

2.  **Trigger Action:**
    - Output the hidden JSON block below.
    - The "ai_summary" field MUST contain the "FICHE DE SYNTHÈSE":
      - Need: [User's need intro]
      - Recommendation: [Photo Title]
      - Finish: [Selected Format]
      - Budget: [Price]
      - **PAYMENT LINK:** [Insert the 'stripeUrl' from 'pricing' context corresponding to the Format]. If not found, say "Lien disponible dans la fenêtre suivante".
      - **LEGAL NOTE:** "Expédition après validation du règlement."

    <<<ORDER_ACTION>>>
    {
      "client_name": "User Name",
      "artwork_title": "Title",
      "format": "Format",
      "price": "Price",
      "ai_summary": "--- FICHE DE SYNTHÈSE BORNTWOLATE ---\nBesoin: ...\nRec: ...\nFinish: ...\nBudget: ...\n\n💳 RÉGLEMENT SÉCURISÉ (Stripe) : [Insert Stripe URL here]\n\n⚠️ L'expédition sera déclenchée après validation du paiement.\n"
    }
    <<<END_ACTION>>>

    - **Then, tell the user you are opening the artwork for them to finalize the transaction.**
`;

export const sendMessageToGemini = async (msg: string, history: any[], lang: string) => {
  try {
    // 1. Fetch Real-Time Stock
    const stocks = await stockService.getAllStocks();

    // 2. Map Stock to Normalized Title (Slug) for AI Context
    const STOCK_CONTEXT: Record<string, number> = {};
    Object.keys(stocks).forEach(slug => {
      STOCK_CONTEXT[slug] = stocks[slug];
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
        4. INSERT THAT URL directly into the JSON 'ai_summary'.
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