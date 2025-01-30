import dotenv from 'dotenv';
dotenv.config({ path: './util/.env' }); // Correct path!

import { GoogleGenerativeAI } from '@google/generative-ai';

// ... rest of your code (API key access, model setup, etc.)

const apiKey = process.env.GEMINI_API_KEY; // Accessing from environment variable

console.log("API Key in geminiApi.js:", apiKey); // Check if the key is loaded

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Or the latest model name
});

// ... (rest of your Gemini API interaction code)

export async function runGemini() { // Make runGemini available for import
  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
    history: [],
  });

  try {
    const result = await chatSession.sendMessage("who is MS Dhoni?");
    console.log("Gemini API Result:", result); // Log the entire result object
    console.log("Gemini Response Text:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error); // Log the full error object
    console.error("Gemini API Error Message:", error.message); // Log the error message
    console.error("Gemini API Error Stack:", error.stack); // Log the error stack
    return "Error communicating with Gemini API";
  }
}


// ... (rest of your geminiApi.js code)