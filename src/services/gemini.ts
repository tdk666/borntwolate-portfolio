import { GoogleGenerativeAI } from "@google/generative-ai";
import { photos } from "../data/photos";
import { PRICING_CATALOG } from "../data/pricing";

// SAFETY CHECK: Access key safely (Support both variable names)
const API_KEY = import.meta.env.VITE_GEMINI_SEARCH_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// 1. Initialization Safety
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Log once on load (Safety Check)
if (!API_KEY) {
  console.error("🚨 CRITICAL: VITE_GEMINI_SEARCH_KEY is missing. Search will NOT work.");
} else {
  console.log("✅ Search Service: API Key detected.");
}

const cleanJsonOutput = (text: string): string => {
  if (!text) return "[]"; // Safety for empty strings
  let clean = text.replace(/```json/g, "").replace(/```/g, "");
  return clean.trim();
};

export const getSemanticTags = async (query: string): Promise<string[]> => {
  // Gatekeeping
  if (!genAI) {
    console.warn("⚠️ Search skipped: No API Key provided.");
    return [];
  }
  if (!query || query.trim().length < 2) return [];

  try {
    // Try the latest efficient model
    // Note: If this fails with 404, it usually means the 'Generative Language API' is not enabled in Google Cloud.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this search query for a photography website: "${query}".
      Return ONLY a JSON array of 3 to 5 visual French keywords (mood, color, subject).
      Example: "triste" -> ["mélancolie", "sombre", "solitude", "noir et blanc"]
      Output format: JSON Array ONLY.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // 2. Response Integrity Check
    if (!response) {
      throw new Error("No response object received from Gemini.");
    }

    const text = response.text();

    // 3. Content Safety Check
    if (!text) {
      console.warn("⚠️ Gemini returned empty text.");
      return [];
    }

    const cleanedText = cleanJsonOutput(text);
    const tags = JSON.parse(cleanedText);

    if (Array.isArray(tags)) {
      return tags.map(t => String(t).toLowerCase());
    }
    return [];

  } catch (error: any) {
    // 4. Specific Error Handling (No Crash)
    if (error.message?.includes("404") || error.toString().includes("404")) {
      console.error("🚨 GEMINI API ERROR (404): Model not found. Please enable 'Generative Language API' in your Google Cloud Console.");
    } else {
      console.error("❌ Search Error (Handled):", error);
    }

    // Graceful fallback: return empty array so the UI continues working
    return [];
  }
};

// --- CHATBOT LOGIC (PRESERVED) ---

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
    // Attempt 1.5-Flash (if it works for Chat)
    // If user has 404 for search, they might have it here too. 
    // But Chatbot errors are handled in Chatbot.tsx component UI.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION + `\nCURRENT USER LANGUAGE: ${lang}`
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(msg);
    return result.response.text();
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

export const debugModels = () => console.log("Debug: Gemini Service & Chatbot Ready");