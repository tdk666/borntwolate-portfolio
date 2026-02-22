import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CORE_SYSTEM_INSTRUCTION = `
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
      "ai_summary": "--- FICHE SYNTHESE ---\\nOeuvre: ...\\nFinition: ...\\nPrix: ...\\n\\nlien stripe: [Insert URL]\\n\\n"
    }
    <<<END_ACTION>>>
3.  **Final Message:** "I am opening the secure payment page for you. Follow the instructions on the screen to finalize."
`;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!GEMINI_API_KEY) {
        console.error('Missing GEMINI_API_KEY environment variable');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server Configuration Error' }),
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { message, history, systemInstruction } = body;

        // Rate Limiting / Abuse Prevention
        if (!message || typeof message !== 'string') {
            return { statusCode: 400, body: JSON.stringify({ error: 'Message required' }) };
        }

        if (message.length > 500) {
            console.warn(`Request rejected: Message length ${message.length} > 500`);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Message too long (max 500 characters).' }),
            };
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        // CRITICAL: process.env.GEMINI_MODEL must be "gemini-2.5-flash" 
        // to match the validated configuration format.
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: CORE_SYSTEM_INSTRUCTION + (body.context ? `\nCONTEXT DATA:\n${JSON.stringify(body.context)}` : "")
        });



        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const text = result.response.text();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        };

    } catch (error: any) {
        console.error('Gemini API Error:', error);
        // Safe logging of key presence
        console.log('DEBUG: API Key present?', !!GEMINI_API_KEY);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process chat request',
                details: error.message || error.toString()
            }),
        };
    }
};
