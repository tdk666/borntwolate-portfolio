
import { Handler } from '@netlify/functions';

const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

export const handler: Handler = async (event, context) => {
    // Only allow GET
    if (event.httpMethod !== 'GET') {
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
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Tarifieur!A:E?key=${GOOGLE_SHEETS_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Google Sheets API Error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // Optional: Cache for 1 hour to reduce API calls
                'Cache-Control': 'public, max-age=3600',
            },
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('Error fetching prices:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch prices' }),
        };
    }
};
