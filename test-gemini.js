import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAWuGIWKHiXlyTpeKmET8ddp9p-TXLKhvQ";

async function testGemini() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Hello, are you working?";
        console.log("Testing Gemini API with key: " + API_KEY.substring(0, 10) + "...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Success! Response:", text);
    } catch (error) {
        console.error("Error testing Gemini:", error);
    }
}

testGemini();
