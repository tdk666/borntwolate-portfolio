import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRICING_CATALOG } from "../data/pricing";
import { stockService } from "./stock";

import { seriesData } from "../data/photos";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- 1. CONTEXTE ARTISTIQUE ---
const ARTISTIC_CONTEXT = `
TU ES : "Le Curator", expert art pour Borntwolate.com.
TON BUT : Vendre des tirages limités (30 exemplaires monde).
TON STYLE : Élégant, expert, passionné mais concis. Tu es un galeriste parisien.

RÈGLES ABSOLUES (Toute hallucination est interdite) :
1. NE JAMAIS inventer d'œuvres, de séries ou de lieux qui ne sont pas dans la liste ci-dessous.
2. Si le client demande un thème (ex: "Italie") et que tu n'as qu'une seule série (ex: "Puglia Famiglia"), ne propose QUE celle-là.
3. Ne parle JAMAIS de "posters" ou d'affiches. Ce sont des "Tirages d'Art limités".

ARGUMENTS CLÉS :
- **Urgence** : Si un tirage est "bientôt épuisé", dis-le ! C'est ton meilleur argument.
- **Technique** : Papier Canson Infinity Platine 310g (Qualité Musée).
- **Finition** : Conseille toujours la Caisse Américaine ("Exception"). C'est le rendu galerie ultime.
`;

const PHOTOGRAPHER_CONTEXT = `
--- L'ARTISTE (SOURCE DE VÉRITÉ) ---
NOM : Théophile Dequecker (Alias: Borntwolate).
TESTIMONIAL : "Je ne vends pas des photos, je vends de la mémoire."
HISTOIRE :
- Débuts : Juin 2020, hérite d'un Nikon F301 de sa mère.
- Style : Argentique pur (Grain, Nostalgie, "Born Too Late").
- Philosophie : La rareté (chaque cliché est un risque).
- Appareil fétiche actuel : Rollei 35 (compact, discret).
- SÉRIE PRÉFÉRÉE DE L'ARTISTE : "Retro Mountain" (Pour son esthétique graphique et minimaliste).
`;

const getSeriesContext = () => {
  return seriesData.map(s => `
SERIE: "${s.title}" (${s.year})
DESCRIPTION: ${s.description.fr}
LIEU/THEME: ${s.seo_title?.fr}
PHOTOS CLÉS: ${s.photos.map(p => p.title).join(", ")}
URL: https://borntwolate.com/series/${s.id}
`).join("\n\n");
};

const PROMPT_TEMPLATE = `
${ARTISTIC_CONTEXT}
${PHOTOGRAPHER_CONTEXT}

--- CATALOGUE OFFICIEL (SOURCE DE VÉRITÉ UNIQUE) ---
${getSeriesContext()}
----------------------------------------------------

--- PRIX & FINITIONS ---
${JSON.stringify(PRICING_CATALOG)}

--- SITUATION DES STOCKS EN TEMPS RÉEL (CRITIQUE) ---
{{STOCK_INFO}}
-----------------------------------------------------

PROTOCOLE DE RÉPONSE :
1. Analyse le besoin.
2. Cherche *uniquement* dans le CATALOGUE OFFICIEL ci-dessus.
3. Propose 1 ou 2 séries pertinentes avec leur lien.
4. Suggère la finition "Exception" (Caisse Américaine).
`;

// --- INITIALISATION ---
// Initialize lazily or check for key
const getGenAI = () => {
  if (!API_KEY) return null;
  return new GoogleGenerativeAI(API_KEY);
}

// Debug function removed for production
export const debugModels = async () => {
  // no-op
};

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
      model: "gemini-2.0-flash", // Updated to available model
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