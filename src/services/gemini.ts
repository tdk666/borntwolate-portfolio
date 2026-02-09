import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRICING_CATALOG } from "../data/pricing";
import { stockService } from "./stock";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- 1. CONTEXTE ARTISTIQUE ---
const ARTISTIC_CONTEXT = `
TU ES : "Le Curator", expert art pour Borntwolate.com.
TON BUT : Vendre des tirages limités (30 exemplaires monde).

ARGUMENTS CLÉS :
- **Urgence** : Si un tirage est "bientôt épuisé", dis-le ! C'est ton meilleur argument.
- **Technique** : Papier Canson Infinity Platine 310g (Qualité Musée).
- **Finition** : Conseille toujours la Caisse Américaine.
`;

const PROMPT_TEMPLATE = `
${ARTISTIC_CONTEXT}

--- SITUATION DES STOCKS EN TEMPS RÉEL (CRITIQUE) ---
{{STOCK_INFO}}
-----------------------------------------------------

--- CATALOGUE & PRIX ---
${JSON.stringify(PRICING_CATALOG)}

PROTOCOLE :
1. Analyse le besoin (Déco ? Cadeau ?).
2. Vérifie le stock dans la liste ci-dessus.
3. Si stock < 5 : "Attention, il ne reste que X exemplaires de cette œuvre !".
4. Si stock = 0 : "Désolé, cette œuvre est définitivement épuisée (Sold Out)."
5. Donne le lien : https://borntwolate.com/series/[slug-serie]
`;

// --- INITIALISATION ---
// Initialize lazily or check for key
const getGenAI = () => {
  if (!API_KEY) return null;
  return new GoogleGenerativeAI(API_KEY);
}

export const debugModels = async () => {
  const genAI = getGenAI();
  if (!genAI) {
    console.log("Chatbot: No API Key for debug");
    return;
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to get client
    // Actually we need the model-agnostic client to list models? 
    // The SDK doesn't expose listModels directly on the instance easily without complex setup usually?
    // Wait, genAI.getGenerativeModel is for a specific model.
    // We can try to use the REST API for debugging if SDK fails?
    // Or just try a simple generateContent to see if it works with *any* model?

    // Let's just log that we are trying gemini-1.5-flash
    console.log("Chatbot: Attempting to use model 'gemini-1.5-flash'...");
  } catch (e) {
    console.error("Chatbot Debug Error:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], _lang: 'fr' | 'en' = 'fr') => {
  // Unused 'lang' kept for signature compatibility but ignored for now as user simplified prompt

  if (!API_KEY) {
    console.warn("⚠️ Chatbot: Clé API manquante");
    return "Le Curator est en pause café (Clé API manquante).";
  }

  const genAI = getGenAI();
  if (!genAI) return "Erreur configuration IA.";

  try {
    // 1. On récupère les stocks frais depuis Supabase
    let stockMessage = "Stocks disponibles (30/30) sauf indication contraire.";
    try {
      const stocks = await stockService.getAllStocks();
      // stocks is Record<string, number> (slug -> sold_count)

      const lines = Object.entries(stocks).map(([slug, soldCount]) => {
        const remaining = 30 - soldCount;
        if (remaining === 0) return `- ${slug} : ÉPUISÉ (Sold Out)`;
        if (remaining < 10) return `- ${slug} : URGENCE (${remaining} restants)`;
        return null;
      }).filter(Boolean);

      if (lines.length > 0) stockMessage = lines.join("\n");
    } catch (e) {
      console.error("Erreur Stock IA:", e);
    }

    // 2. On injecte les stocks dans le prompt système
    const finalSystemPrompt = PROMPT_TEMPLATE.replace('{{STOCK_INFO}}', stockMessage);

    // 3. On lance le chat avec le nouveau contexte
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Revert to standard correct model
      systemInstruction: finalSystemPrompt
    });

    const chat = model.startChat({
      history: history.map(h => ({ role: h.role, parts: h.parts })),
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini Error:", error);
    // Temporary Debugging: Show exact error to user
    return `Erreur Technique Détail : ${error.message || JSON.stringify(error)}`;
  }
};