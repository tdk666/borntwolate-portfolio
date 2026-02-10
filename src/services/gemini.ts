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
    console.warn("⚠️ Search disabled: VITE_GEMINI_SEARCH_KEY missing.");
    return [];
  }
  if (!query || query.trim().length < 2) return [];

  try {
    // 🚀 SWITCH TO GEMINI 2.0 FLASH (User Confirmed Working Model)
    // If 2.0 fails, we add a fallback to 1.5-pro (more stable than flash)
    const modelName = "gemini-2.0-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`🔍 Gemini Search: Asking '${modelName}'...`);

    const prompt = `
      Analyze this search query for a photography portfolio: "${query}".
      Extract 3 to 5 visual tags (mood, color, subject) in French.
      Return ONLY a JSON array of strings.
      Example: "triste" -> ["mélancolie", "sombre", "solitude", "noir et blanc"]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("🤖 Gemini 2.0 Response:", text);

    const cleanedText = cleanJsonOutput(text);
    const tags = JSON.parse(cleanedText);

    if (Array.isArray(tags)) {
      return tags.map(t => String(t).toLowerCase());
    }
    return [];

  } catch (error: any) {
    // Detailed Error Logging
    console.error(`❌ Gemini 2.0 Search Failed:`, error);

    // Attempt Fallback to Pro model if Flash 2.0 fails (e.g. 404 or Overloaded)
    if (error.message?.includes("404") || error.toString().includes("404")) {
      console.warn("⚠️ Retrying with gemini-1.5-pro as fallback...");
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const fallbackResult = await fallbackModel.generateContent(`Return JSON array of 3 keywords for photo search: "${query}"`);
        const fallbackText = fallbackResult.response.text();
        const clean = cleanJsonOutput(fallbackText);
        const tags = JSON.parse(clean);
        return Array.isArray(tags) ? tags : [];
      } catch (fallbackError) {
        console.error("❌ Fallback (1.5-pro) also failed.", fallbackError);
      }
    }

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
    // Attempt 2.0-Flash (Confirmed working by user for Chatbot)
    // We update this to match the Search model for consistency.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // UPDATED to match search
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