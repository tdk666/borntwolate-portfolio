import { Handler } from '@netlify/functions';

const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

export const handler: Handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    if (!GOOGLE_SHEETS_ID || !GOOGLE_SHEETS_API_KEY) {
        console.error('Missing Google Sheets Credentials');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server Configuration Error' }),
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { orderId } = body;

        // Basic validation
        // We could add auth checks here if we passed the token/hash

        // Fetch "Suivi commandes"
        // Note: The logic in the frontend was to fetch A:Z to find headers.
        // We will replicate that behavior: fetch the whole sheet and let the frontend parse it,
        // OR we could parse it here.
        // To keep the change minimal on the frontend logic (which does the fuzzy matching of headers),
        // we will return the raw data, just like the direct fetch did.

        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Suivi%20commandes!A:Z?key=${GOOGLE_SHEETS_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Google Sheets API Error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // No cache for admin data, or very short
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data),
        };

    } catch (error: any) {
        console.error('Error proxying to Google Sheets:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch order data', details: error.message }),
        };
    }
};
