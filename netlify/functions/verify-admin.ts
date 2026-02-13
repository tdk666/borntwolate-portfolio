import { Handler } from "@netlify/functions";
import crypto from "crypto";

const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Security Check: Ensure environment variable is set
    // This prevents the function from running insecurely if the variable is missing
    const validHash = process.env.ADMIN_PASSWORD_HASH;
    const adminApiSecret = process.env.ADMIN_API_SECRET;

    if (!validHash || !adminApiSecret) {
        console.error("CRITICAL: ADMIN_PASSWORD_HASH or ADMIN_API_SECRET is not set.");
        return { statusCode: 500, body: JSON.stringify({ success: false, message: "Configuration Error" }) };
    }

    // LAYER 1: API Secret Header Check REMOVED for verify-admin (bootstrap problem)
    // We only rely on the password hash here to issue the token.

    try {
        const { password } = JSON.parse(event.body || "{}");

        if (!password) {
            return { statusCode: 400, body: JSON.stringify({ success: false, message: "Password required" }) };
        }

        // Server-side hashing (Node.js crypto)
        const hash = crypto.createHash('sha256').update(password).digest('hex');

        if (hash === validHash) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, token: adminApiSecret }),
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
