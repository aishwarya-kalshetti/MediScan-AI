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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Testing gemini-1.5-flash...");
        // We can't list models easily with just the SDK methods exposed in some versions, 
        // but we can try to generate content to see if it works, or catch the error.
        // However, for admin/listing, standard API might be needed or specific SDK method?
        // Let's check if the SDK has listModels.
        // Actually, simply printing the error detail from a generate call is enough usually.
        // But let's try to verify if 'gemini-1.5-flash' works here.

        // Better: use a known working model 'gemini-pro' to test connection first.
        console.log("Successfully initialized client.");
        console.log("This script will attempt to use 'gemini-1.5-flash' to confirm access.");

        const result = await model.generateContent("Hello via test script");
        console.log("Success! Response: ", result.response.text());
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
