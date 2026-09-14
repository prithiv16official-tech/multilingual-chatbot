import React from 'react';

const languages = [
  { code: 'en', name: '🇬🇧 English', label: 'English' },
  { code: 'hi', name: '🇮🇳 हिंदी', label: 'Hindi' },
  { code: 'ta', name: '🇮🇳 தமிழ்', label: 'Tamil' },
  { code: 'te', name: '🇮🇳 తెలుగు', label: 'Telugu' },
  { code: 'kn', name: '🇮🇳 ಕನ್ನಡ', label: 'Kannada' }
];

export default function LanguageSelector({ targetLanguage, setTargetLanguage }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        🌐 Select Language for Answer
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setTargetLanguage(lang.code)}
            className={`p-3 rounded-lg font-medium transition-all ${
              targetLanguage === lang.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
