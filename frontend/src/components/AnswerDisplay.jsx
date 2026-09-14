import React, { useState } from 'react';

export default function AnswerDisplay({ answer }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageNames = {
    'en': '🇬🇧 English',
    'hi': '🇮🇳 हिंदी',
    'ta': '🇮🇳 தமிழ்',
    'te': '🇮🇳 తెలుగు',
    'kn': '🇮🇳 ಕನ್ನಡ'
  };

  return (
    <div className="space-y-4">
      {/* Original Question */}
      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
        <h3 className="font-semibold text-gray-700 mb-2">📌 Your Question</h3>
        <p className="text-gray-800">{answer.original_question}</p>
        <p className="text-sm text-gray-500 mt-2">
          Language: {languageNames[answer.input_language]}
        </p>
      </div>

      {/* English Version */}
      <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
        <h3 className="font-semibold text-gray-700 mb-2">🔤 English Explanation</h3>
        <p className="text-gray-800 leading-relaxed">{answer.english_answer}</p>
      </div>

      {/* Final Answer */}
      <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              ✨ Answer in {languageNames[answer.target_language]}
            </h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              {answer.final_answer}
            </p>
          </div>
          <button
            onClick={() => handleCopy(answer.final_answer)}
            className="ml-4 p-2 bg-green-200 hover:bg-green-300 rounded-lg transition-all"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center pt-2">
        Generated on {new Date(answer.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
