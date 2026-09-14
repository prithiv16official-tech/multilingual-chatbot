import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

export async function callGemini(message) {
  try {
    console.log('🤖 Gemini: processing...');
    const result = await model.generateContent(message);
    const text = result.response.text();
    console.log('✅ Got response');
    return text;
  } catch (error) {
    console.error('❌ Gemini error:', error.message);
    throw error;
  }
}

export async function simplifyContent(technicalText) {
  const simplifyPrompt = `Simplify this technical explanation for a beginner student (class 9-12 level):

"${technicalText}"

Make it:
1. Use simple, everyday words
2. No technical jargon
3. Add a relatable example
4. Keep it short (2-3 sentences)`;

  return await callGemini(simplifyPrompt);
}
