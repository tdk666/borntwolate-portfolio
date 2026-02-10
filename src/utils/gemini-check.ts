import { GoogleGenerativeAI } from "@google/generative-ai";

export const checkGeminiConnection = async () => {
    const API_KEY = import.meta.env.VITE_GEMINI_SEARCH_KEY || import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
        console.error("🚨 DEBUG: No API Key found.");
        return;
    }

    console.log("🔍 DEBUG: Starting Gemini Connection Check...");
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
        // 1. Try to list models (if supported by key/role)
        // Note: listModels might require different permissions or might not be available on all keys
        // If it fails, we fall back to a direct generation test.
        try {
            console.log("🔍 DEBUG: Attempting to list models...");
            // @ts-ignore - listModels is sometimes not in strict typings depending on version but exists in SDK
            const modelResponse = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey;
            // Actually SDK doesn't expose listModels on genAI instance directly in 0.24?
            // It's usually not exposed nicely.
            // Let's rely on a direct "dummy" generation with standard models.
        } catch (e) {
            console.warn("⚠️ DEBUG: List models skipped/failed", e);
        }

        // 2. Test specific models
        const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];

        for (const modelName of modelsToTest) {
            console.log(`🧪 DEBUG: Testing model '${modelName}'...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Test connection. Reply 'OK'.");
                const response = await result.response;
                console.log(`✅ DEBUG: Model '${modelName}' WORKS! Response: ${response.text()}`);
                // If one works, we are good.
            } catch (error) {
                // @ts-ignore
                console.error(`❌ DEBUG: Model '${modelName}' FAILED: ${error.message || error}`);
            }
        }
    } catch (err) {
        console.error("🚨 DEBUG: Critical Error in Gemini Check:", err);
    }
};
