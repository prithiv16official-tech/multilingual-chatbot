import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_ASSISTANT_ID = process.env.IBM_ASSISTANT_ID;
const IBM_ASSISTANT_URL = process.env.IBM_ASSISTANT_URL;
const API_VERSION = process.env.IBM_API_VERSION || '2023-06-15';

let sessionId = null;

async function initSession() {
  try {
    console.log('🔄 Initializing IBM Bob session...');
    
    const response = await axios.post(
      `${IBM_ASSISTANT_URL}/assistants/${IBM_ASSISTANT_ID}/sessions`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${IBM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: { 'version': API_VERSION }
      }
    );
    
    sessionId = response.data.session_id;
    console.log('✅ Session initialized');
    return sessionId;
    
  } catch (error) {
    console.error('❌ Session init failed:', error.message);
    throw error;
  }
}

export async function callIBMBob(message) {
  try {
    if (!sessionId) {
      await initSession();
    }

    console.log(`🤖 IBM Bob: processing...`);

    const response = await axios.post(
      `${IBM_ASSISTANT_URL}/assistants/${IBM_ASSISTANT_ID}/sessions/${sessionId}/message`,
      {
        input: {
          message_type: 'text',
          text: message
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${IBM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: { 'version': API_VERSION }
      }
    );

    if (response.data.output.generic && response.data.output.generic.length > 0) {
      const answer = response.data.output.generic[0].text;
      console.log('✅ Got response');
      return answer;
    }

    return 'No response generated.';

  } catch (error) {
    console.error('❌ IBM Bob error:', error.message);
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

  return await callIBMBob(simplifyPrompt);
}

export { initSession };
