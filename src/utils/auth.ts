export const verifyAdminCode = async (input: string): Promise<boolean> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Hash of "THEOrugby2001!!"
    // WARNING: This hash is hardcoded for client-side legacy reasons or fallback.
    // Ideally, this should be managed via environment variables in a future V2 refactor.
    const VALID_HASH = "41b76dc4aea7baba298aab2cbe705629ccbf0c6b6124b7448f3c14c77ed63903";

    return hashHex === VALID_HASH;
};
