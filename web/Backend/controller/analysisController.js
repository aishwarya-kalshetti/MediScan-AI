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

exports.analyzeGeneral = catchAsyncError(async (req, res, next) => {
    const { image, problemDescription } = req.body;

    if (!image) {
        return next(new ErrorHander("Image data is required", 400));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const emergencyKeywords = ['severe', 'emergency', 'urgent', 'critical', 'acute', 'serious', 'life-threatening', 'extreme pain', 'unbearable', 'blood'];
        const hasEmergencyKeywords = problemDescription ? emergencyKeywords.some(keyword =>
            problemDescription.toLowerCase().includes(keyword.toLowerCase())
        ) : false;

        let prompt = `You are an experienced general medical practitioner. Analyze this medical image and provide a detailed assessment. 
        Focus on identifying any visible conditions, abnormalities, or concerns. 
        Structure your response in the following format:
        1. Emergency Level (1 for high emergency, 2 for moderate emergency, 3 for low emergency)
        2. Medical Condition Detected (if any)
        3. Confidence Score (as a percentage)
        4. Type of Condition (if detected)
        5. Affected Region
        6. Recommendation
        7. Additional Observations

        Emergency Level Guidelines:
        - Level 1 (High Emergency): Life-threatening conditions, severe injuries, or conditions requiring immediate medical attention
        - Level 2 (Moderate Emergency): Conditions requiring prompt medical attention but not immediately life-threatening
        - Level 3 (Low Emergency): Non-urgent conditions that can be managed with routine care

        ${hasEmergencyKeywords ? 'IMPORTANT: The patient has described their condition using emergency-related keywords. Please carefully consider this in your emergency level assessment and err on the side of caution.' : ''}

        Keep the response clear and concise, using medical terminology appropriately but explaining in user-friendly language.`;

        if (problemDescription) {
            prompt += `\n\nPatient's Description: ${problemDescription}\n\nPlease consider this additional context in your analysis.`;
        }

        let imagePart = {
            inlineData: {
                data: image.includes("base64,") ? image.split("base64,")[1] : image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([
            prompt,
            imagePart
        ]);

        const response = await result.response;
        const text = response.text();

        // Extract emergency level
        const emergencyLevelMatch = text.match(/Emergency Level:\s*(\d)/i);
        let emergencyLevel = emergencyLevelMatch ? parseInt(emergencyLevelMatch[1]) : 3;

        if (hasEmergencyKeywords && emergencyLevel > 1) {
            emergencyLevel = 1;
        }

        res.status(200).json({
            success: true,
            formattedResponse: text,
            emergencyLevel
        });

    } catch (error) {
        console.error("General Analysis Error:", error);
        return next(new ErrorHander("Failed to analyze image", 500));
    }
});

exports.analyzeXray = catchAsyncError(async (req, res, next) => {
    const { image } = req.body;

    if (!image) {
        return next(new ErrorHander("Image data is required", 400));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an expert Radiologist. Analyze this X-Ray image with high precision.
        Identify any abnormalities, fractures, infections, or other medical conditions visible in the X-Ray.
        
        Provide your analysis in the following structured format:
        1. Emergency Level (1: Immediate Attention, 2: Urients, 3: Routine)
        2. Findings: List detailed findings.
        3. Diagnosis: Potential diagnosis based on findings.
        4. Confidence: High/Medium/Low
        5. Recommendation: Next steps for the patient/doctor.

        If the image is not a clear X-Ray or is unreadable, please state that.`;

        let imagePart = {
            inlineData: {
                data: image.includes("base64,") ? image.split("base64,")[1] : image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([
            prompt,
            imagePart
        ]);

        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            prediction: text
        });

    } catch (error) {
        console.error("X-Ray Analysis Error:", error);
        return next(new ErrorHander("Failed to analyze X-Ray", 500));
    }
});

exports.analyzeRetinopathy = catchAsyncError(async (req, res, next) => {
    const { image } = req.body;

    if (!image) {
        return next(new ErrorHander("Image data is required", 400));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an expert ophthalmologist specializing in retinopathy detection. Analyze the provided retinal image and determine whether it indicates signs of retinopathy. 
        Provide a confidence score (in percentage) for your diagnosis. 
        If retinopathy is detected, also mention the type and severity with a probability score and in a user-friendly language.
        
        Structure your response in the following format:
        1. Emergency Level (1: Immediate Attention, 2: Urgent, 3: Routine)
        2. Diagnosis: (e.g., No Retinopathy, Mild NPDR, Severe NPDR, PDR)
        3. Confidence Score: (e.g., 95%)
        4. Detailed Findings
        5. Recommendation

        Emergency Level Guidelines:
        - Level 1: Proliferative Diabetic Retinopathy (PDR) or severe macular edema requiring immediate intervention.
        - Level 2: Severe Non-Proliferative Diabetic Retinopathy (NPDR).
        - Level 3: Mild/Moderate NPDR or No Retinopathy.`;

        let imagePart = {
            inlineData: {
                data: image.includes("base64,") ? image.split("base64,")[1] : image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([
            prompt,
            imagePart
        ]);

        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            analysis: text
        });

    } catch (error) {
        console.error("Retinopathy Analysis Error:", error);
        return next(new ErrorHander("Failed to analyze Retina image", 500));
    }
});

exports.analyzeSkin = catchAsyncError(async (req, res, next) => {
    const { image } = req.body;

    if (!image) {
        return next(new ErrorHander("Image data is required", 400));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are an expert dermatologist specializing in skin condition detection. 
        Analyze the provided skin image and determine whether it indicates any concerning conditions. 
        
        Structure your response as follows:
        EMERGENCY_LEVEL: [1, 2, or 3]
        
        1. Condition Detected: [Name of condition or "No abnormalities detected"]
        2. Confidence Score: [Percentage]
        3. Type/Category: [e.g., Bacterial, Fungal, Viral, Inflammatory, Benign, Malignant]
        4. Affected Region: [Describe region]
        5. Analysis: [Detailed observations]
        6. Recommendation: [Advice for patient]

        Emergency Level Guidelines:
        - Level 1: Potential Melanoma, severe infection (cellulitis), spreading rash with systemic symptoms.
        - Level 2: Suspicious moles, painful rashes, ringworm, acne requiring medication.
        - Level 3: Mild acne, dry skin, benign spots.`;

        let imagePart = {
            inlineData: {
                data: image.includes("base64,") ? image.split("base64,")[1] : image,
                mimeType: "image/jpeg"
            }
        };

        const result = await model.generateContent([
            prompt,
            imagePart
        ]);

        const response = await result.response;
        const text = response.text();

        // Extract emergency level for standard response param if needed, or just send full text
        const emergencyLevelMatch = text.match(/EMERGENCY_LEVEL:\s*(\d)/i);
        const emergencyLevel = emergencyLevelMatch ? parseInt(emergencyLevelMatch[1]) : 3;

        // Clean up text if needed (remove EMERGENCY_LEVEL line if frontend hides it, but frontend code seemed to parse it)
        // We will send the full text and let frontend parse, or formatted response.
        // Frontend expects `formattedResponse` and `emergencyLevel`.

        const cleanResponse = text.replace(/EMERGENCY_LEVEL:\s*\d\s*/, '').trim();

        res.status(200).json({
            success: true,
            formattedResponse: cleanResponse,
            emergencyLevel
        });

    } catch (error) {
        console.error("Skin Analysis Error:", error);
        return next(new ErrorHander("Failed to analyze Skin image", 500));
    }
});

exports.simplifyAnalysis = catchAsyncError(async (req, res, next) => {
    const { analysis } = req.body;

    if (!analysis) {
        return next(new ErrorHander("Analysis text is required", 400));
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are a medical translator who specializes in explaining complex medical terms in simple, easy-to-understand language. 
        Please convert this medical analysis into simple terms that someone without a medical background can understand.
        Keep the same structure but use everyday language. Here's the analysis:
        
        ${analysis}
        
        Please provide the simplified version while maintaining the key information.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            simplifiedAnalysis: text
        });

    } catch (error) {
        console.error("Simplification Error:", error);
        return next(new ErrorHander("Failed to simplify analysis", 500));
    }
});
