import { Handler } from '@netlify/functions';

const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

export const handler: Handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    // Security Check: Validate Admin Secret
    const providedSecret = event.headers['x-admin-secret'] || event.headers['X-Admin-Secret'];
    if (!ADMIN_API_SECRET || providedSecret !== ADMIN_API_SECRET) {
        console.warn('Unauthorized access attempt to admin-sheets-proxy');
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
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
        // We can use the body for specific sheet queries if needed in the future
        // const { orderId } = body; 

        // Fetch "Suivi commandes" full sheet for client-side processing
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
                'Cache-Control': 'no-cache, no-store, must-revalidate', // Never cache admin data
            },
            body: JSON.stringify(data),
        };

    } catch (error: any) {
        console.error('Error proxying to Google Sheets:', error.message); // Log only message to avoid leaking data
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch order data' }),
        };
    }
};
