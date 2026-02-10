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
    if (!validHash) {
        console.error("CRITICAL: ADMIN_PASSWORD_HASH is not set in environment variables.");
        return { statusCode: 500, body: JSON.stringify({ success: false, message: "Configuration Error" }) };
    }

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
