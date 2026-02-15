const { GoogleGenerativeAI } = require("@google/generative-ai");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorHander");
require('dotenv').config();

// Initialize Gemini API
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
    console.warn("GOOGLE_AI_API_KEY is not set in .env");
}
const genAI = new GoogleGenerativeAI(apiKey);

exports.processChat = catchAsyncError(async (req, res, next) => {
    const { prompt, user_data, language } = req.body;

    if (!prompt) {
        return next(new ErrorHander("Prompt is required", 400));
    }

    try {
        // Use gemini-pro or gemini-1.5-flash as available
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Construct a context-aware prompt
        const systemPrompt = `
        You are Arogya AI, a helpful and empathetic health assistant. 
        Language: ${language || 'en'}.
        User Context:
        - Name: ${user_data?.name || 'Guest'}
        - Age: ${user_data?.age || 'Unknown'}
        - Conditions: ${user_data?.conditions?.join(', ') || 'None'}
        - Medications: ${user_data?.medications?.join(', ') || 'None'}
        
        Please provide a helpful response to the user's query. 
        Important: If the query is about a serious medical emergency, advise them to seek immediate professional help.
        Do not provide definitive medical diagnoses, but offer guidance based on general medical knowledge.
        
        User Query: ${prompt}
        `;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();

        res.status(200).json({
            success: true,
            response: responseText
        });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return next(new ErrorHander("Failed to generate AI response", 500));
    }
});
