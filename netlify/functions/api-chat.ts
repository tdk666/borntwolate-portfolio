import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
        // CRITICAL: process.env.GEMINI_MODEL must be "gemini-2.0-flash" 
        // "gemini-1.5-flash" returns 404 Not Found on this endpoint.
        // DO NOT DOWNGRADE without testing.
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction
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
