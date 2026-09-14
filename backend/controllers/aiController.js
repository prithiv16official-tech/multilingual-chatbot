import { translateText, detectLanguage } from '../utils/translator.js';
import { callGemini, simplifyContent } from '../utils/gemini.js';

export const askQuestion = async (req, res) => {
  try {
    const { question, targetLanguage } = req.body;

    // Validation
    if (!question || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing required fields: question, targetLanguage'
      });
    }

    console.log(`\n📝 Incoming Question: ${question}`);
    console.log(`🌍 Target Language: ${targetLanguage}`);

    // Step 1: Detect input language
    const inputLanguage = detectLanguage(question);
    console.log(`🔍 Detected Language: ${inputLanguage}`);

    // Step 2: Translate to English if needed
    let englishQuestion = question;
    if (inputLanguage !== 'en') {
      englishQuestion = await translateText(question, inputLanguage, 'en');
      console.log(`🔄 Translated to English: ${englishQuestion}`);
    }

    // Step 3: Call Gemini for answer
    console.log(`🤖 Calling Gemini...`);
    let answer = await callGemini(englishQuestion);

    // Step 4: Simplify answer
    console.log(`✨ Simplifying content...`);
    const simplifiedAnswer = await simplifyContent(answer);

    // Step 5: Translate to target language
    console.log(`🌐 Translating to ${targetLanguage}...`);
    const finalAnswer = await translateText(simplifiedAnswer, 'en', targetLanguage);

    console.log(`✅ Process complete!\n`);

    res.json({
      success: true,
      original_question: question,
      input_language: inputLanguage,
      target_language: targetLanguage,
      english_question: englishQuestion,
      english_answer: simplifiedAnswer,
      final_answer: finalAnswer,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      error: 'Failed to process question',
      message: error.message
    });
  }
};

export const explainConcept = async (req, res) => {
  try {
    const { concept, targetLanguage } = req.body;

    if (!concept || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing fields: concept, targetLanguage'
      });
    }

    const prompt = `Explain "${concept}" simply for a beginner student in 2-3 sentences. Include:
1. Simple definition
2. How it works
3. One real-world example`;

    const explanation = await callGemini(prompt);
    const simplified = await simplifyContent(explanation);
    const translated = await translateText(simplified, 'en', targetLanguage);

    res.json({
      success: true,
      concept: concept,
      target_language: targetLanguage,
      explanation: translated,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to explain concept',
      message: error.message
    });
  }
};
