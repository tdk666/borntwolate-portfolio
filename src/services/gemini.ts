import { GoogleGenerativeAI } from "@google/generative-ai";
import { photos } from "../data/photos";
import { PRICING_CATALOG } from "../data/pricing";

// SAFETY CHECK: Access key safely (Support both variable names)
const API_KEY = import.meta.env.VITE_GEMINI_SEARCH_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Log once on load to debug (Will show in Netlify function logs or Browser Console)
if (!API_KEY) {
  console.error("🚨 CRITICAL: VITE_GEMINI_SEARCH_KEY is missing. Search will NOT work.");
} else {
  console.log("✅ Search Service: API Key detected.");
}

// Initialize only if key exists
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// --- 1. SEARCH LOGIC (V3 FIX: Stable gemini-pro) ---

const cleanJsonOutput = (text: string): string => {
  let clean = text.replace(/```json/g, "").replace(/```/g, "");
  return clean.trim();
};

export const getSemanticTags = async (query: string): Promise<string[]> => {
  if (!genAI) return []; // Fail safe
  if (!query || query.trim().length < 2) return [];

  try {
    // FALLBACK TO STABLE MODEL: "gemini-pro"
    // "gemini-1.5-flash" was returning 404 for some keys/SDK versions.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Updated prompt for 1.0 Pro
    const prompt = `
      Tu es un assistant expert en photographie. Analyse cette recherche : "${query}".
      Sors UNIQUEMENT un tableau JSON de 3 à 5 mots-clés visuels (en français) liés à l'ambiance, la couleur ou le sujet.
      Exemple : "triste" -> ["mélancolie", "sombre", "solitude", "noir et blanc"]
      Réponds uniquement le tableau JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("🤖 Raw AI Response (gemini-pro):", text); // Debug log

    const cleanedText = cleanJsonOutput(text);
    const tags = JSON.parse(cleanedText);

    if (Array.isArray(tags)) {
      return tags.map(t => String(t).toLowerCase());
    }
    return [];

  } catch (error) {
    console.warn("⚠️ Search Error (Non-blocking):", error);
    return [];
  }
};

// --- 2. CHATBOT LOGIC (PRESERVED) ---

const CONTEXT_DATA = {
  photographer: "Théo DeQuecker (TDK)",
  brand: "BornTwoLate",
  pricing: PRICING_CATALOG,
  photos: photos.map(p => ({
    id: p.id,
    title: p.title,
    series: p.seriesId,
    tags: p.tags,
    desc: p.caption_artistic
  }))
};

const SYSTEM_INSTRUCTION = `
You are LARA, the AI Assistant for BornTwoLate (Théo DeQuecker's Analog Photography Portfolio).
Your role is to guide visitors, explain the artistic vision, and facilitate print acquisitions.

TONE: Elegant, knowledgeable, slightly artistic but accessible.
CONTEXT:
${JSON.stringify(CONTEXT_DATA)}

ORDER PROCESS:
If a user wants to order/buy:
1. Ask for details if needed (Which photo? Which format?).
2. When confirmed, output a JSON action block HIDDEN from the user:
   <<<ORDER_ACTION>>>
   {
     "client_name": "User Name",
     "client_email": "User Email (if given)",
     "artwork_title": "Title",
     "format": "Format",
     "price": "Price",
     "ai_summary": "Summary"
   }
   <<<END_ACTION>>>
   Add a polite confirmation message outside the block.
`;

export const sendMessageToGemini = async (msg: string, history: any[], lang: string) => {
  if (!genAI) throw new Error("API_KEY_MISSING");

  try {
    const model = genAI.getGenerativeModel({
      // Keep 2.0 Flash for Chatbot if it works, otherwise downgrade here too if needed.
      // But user only reported 404 on Search (which was explicitly using 1.5-flash).
      // Let's use gemini-pro here too for consistency and safety.
      model: "gemini-pro",
      // System instructions are supported in gemini-pro via API but SDK might differ.
      // Gemini 1.5 Flash supports systemInstruction. Gemini 1.0 Pro does NOT via this param (it's part of history).
      // CAUTION: "systemInstruction" param might be ignored by gemini-pro in older SDKs.
      // Let's stick to gemini-1.5-flash for Chatbot IF it works for the user (user logs only showed error for search).
      // ACTUALLY, if key doesn't work for 1.5-flash in search, it won't work here.
      // SAFE BET: Use "gemini-pro" but inject system prompt in history/message.
    });

    // WORKAROUND for Gemini Pro (add system prompt to history manually if needed, 
    // OR just try 1.5-flash and if it fails, fallback. 
    // Given the user wants stability, let's try 'gemini-1.5-flash' first (chatbot might use different endpoint?) 
    // NO, key is same. 
    // Let's assume the user's key/region doesn't support 1.5 Flash via API.
    // We will use 'gemini-pro' but we need to handle system prompt differently.
    // OR: Use 'gemini-1.5-flash-latest' which might resolve the alias.

    // DECISION: Use 'gemini-1.5-flash' but handle the error. 
    // Wait, the user's log said "404 models/gemini-1.5-flash is not found". 
    // We MUST use 'gemini-pro'.

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `SYSTEM INSTRUCTION:\n${SYSTEM_INSTRUCTION}\nCURRENT USER LANGUAGE: ${lang}\n\n(Acknowledge)` }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Lara." }]
        },
        ...history
      ]
    });

    const result = await chat.sendMessage(msg);
    return result.response.text();
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const debugModels = () => console.log("Debug: Gemini Service & Chatbot Ready");