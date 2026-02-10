import { Handler } from "@netlify/functions";
import crypto from "crypto";

const VALID_HASH = "41b76dc4aea7baba298aab2cbe705629ccbf0c6b6124b7448f3c14c77ed63903";

const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { password } = JSON.parse(event.body || "{}");

        if (!password) {
            return { statusCode: 400, body: JSON.stringify({ success: false, message: "Password required" }) };
        }

        // Server-side hashing (Node.js crypto)
        const hash = crypto.createHash('sha256').update(password).digest('hex');

        if (hash === VALID_HASH) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            // Intentionally generic error for security
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: "Invalid credentials" }),
            };
        }
    } catch (error) {
        console.error("Auth Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server error" }),
        };
    }
};

export { handler };
