import { GoogleGenerativeAI } from "@google/generative-ai";
import { photos } from "../data/photos";
import { PRICING_CATALOG } from "../data/pricing";

// SAFETY CHECK: Access key safely (Support both variable names)
const API_KEY = import.meta.env.VITE_GEMINI_SEARCH_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Initialize only if key exists
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// --- 1. SEARCH LOGIC (NUCLEAR FIX) ---

const cleanJsonOutput = (text: string): string => {
  let clean = text.replace(/```json/g, "").replace(/```/g, "");
  return clean.trim();
};

export const getSemanticTags = async (query: string): Promise<string[]> => {
  if (!genAI) {
    console.warn("⚠️ SEARCH DISABLED: Missing API Key");
    return [];
  }
  if (!query || query.trim().length < 2) return [];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      Analyze the user search query: "${query}".
      Return ONLY a JSON array of 3 to 5 visual photography keywords (in French) relating to mood, lighting, color, or subject.
      Example input: "triste" -> Output: ["mélancolie", "sombre", "solitude", "noir et blanc"]
      Do NOT write any text outside the JSON array.
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const tags = JSON.parse(cleanJsonOutput(text));
    return Array.isArray(tags) ? tags.map(t => String(t).toLowerCase()) : [];
  } catch (error) {
    console.error("❌ Gemini Search Failed:", error);
    return [];
  }
};

// --- 2. CHATBOT LOGIC (RESTORED) ---

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
      model: "gemini-2.0-flash",
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