const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Attempting to list models...");
        // Note: listModels is not directly on genAI instance in all versions, 
        // usually it's on a specific manager or we just test generation.
        // But let's try a safe generation with 'gemini-pro' which is the most standard.
        // If this fails, the API key might be invalid or has no access.

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro is working. Response: ", result.response.text());
    } catch (error) {
        console.error("gemini-pro failed:", error.message);
    }

    try {
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultFlash = await modelFlash.generateContent("Hello");
        console.log("gemini-1.5-flash is working. Response: ", resultFlash.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash failed:", error.message);
    }
}

listModels();
