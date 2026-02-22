
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const handler: Handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const adminApiSecret = process.env.ADMIN_API_SECRET;

    if (!GEMINI_API_KEY || !adminApiSecret) {
        console.error('Missing GEMINI_API_KEY or ADMIN_API_SECRET');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server Configuration Error' }),
        };
    }

    // Security Check: Verify Admin Secret Header
    const providedSecret = event.headers['x-admin-secret'] || event.headers['X-Admin-Secret'];
    if (providedSecret !== adminApiSecret) {
        console.warn("AI Curator: Invalid x-admin-secret header");
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { prompt, history, systemInstruction } = body;

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing prompt' }),
            };
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

        // Default to a model, can be made configurable if needed
        const modelName = 'gemini-2.5-flash';
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction || undefined
        });

        let result;
        if (history && Array.isArray(history)) {
            const chat = model.startChat({ history });
            result = await chat.sendMessage(prompt);
        } else {
            result = await model.generateContent(prompt);
        }

        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        };

    } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate content', details: error.message }),
        };
    }
};
