export const verifyAdminCode = async (input: string): Promise<boolean> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Client-side verification is deprecated.
    // Please use the Netlify Function '/.netlify/functions/verify-admin' instead.
    const VALID_HASH = ""; // Removed for security

    return hashHex === VALID_HASH;
};
