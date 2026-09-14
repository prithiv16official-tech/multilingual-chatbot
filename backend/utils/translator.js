import { translate } from 'google-translate-api-x';

const LANGUAGE_CODES = {
  'en': 'en',
  'hi': 'hi',
  'ta': 'ta',
  'te': 'te',
  'kn': 'kn',
  'hindi': 'hi',
  'tamil': 'ta',
  'telugu': 'te',
  'kannada': 'kn'
};

export function detectLanguage(text) {
  // Tamil script (U+0B80 - U+0BFF)
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
  
  // Hindi script (U+0900 - U+097F)
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  
  // Telugu script (U+0C00 - U+0C7F)
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
  
  // Kannada script (U+0C80 - U+0CFF)
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
  
  return 'en';
}

export async function translateText(text, sourceLang, targetLang) {
  try {
    const source = LANGUAGE_CODES[sourceLang] || 'en';
    const target = LANGUAGE_CODES[targetLang] || 'en';

    if (source === target) {
      return text;
    }

    console.log(`🔄 Translating ${source} → ${target}...`);

    const result = await translate(text, {
      from: source,
      to: target
    });

    return result.text;

  } catch (error) {
    console.error('⚠️ Translation warning:', error.message);
    return text;
  }
}

export function normalizeLanguageCode(code) {
  return LANGUAGE_CODES[code.toLowerCase()] || 'en';
}
