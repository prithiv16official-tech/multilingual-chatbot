import React from 'react';

export default function QuestionInput({ question, setQuestion, onSubmit, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        ❓ Ask a Technical Question
      </label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask in English or your regional language...
Example: What is a microcontroller?
Example: Microcontroller என்றால் என்ன? (Tamil)
Example: Microcontroller क्या है? (Hindi)"
        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-28 text-gray-800 placeholder-gray-400"
        disabled={loading}
      />
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Tip: Press Ctrl+Enter to submit
        </p>
        <button
          onClick={onSubmit}
          disabled={loading || !question.trim()}
          className={`px-6 py-2 font-semibold rounded-lg transition-all ${
            loading || !question.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          {loading ? '⏳ Processing...' : '🚀 Get Explanation'}
        </button>
      </div>
    </div>
  );
}
