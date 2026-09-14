import React, { useState, useRef } from 'react';
import axios from 'axios';
import LanguageSelector from './components/LanguageSelector';
import QuestionInput from './components/QuestionInput';
import AnswerDisplay from './components/AnswerDisplay';
import SampleQuestions from './components/SampleQuestions';

function App() {
  const [targetLanguage, setTargetLanguage] = useState('ta');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const answerRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await axios.post(`${API_URL}/api/ask`, {
        question: question.trim(),
        targetLanguage: targetLanguage
      });

      setAnswer(response.data);
      setQuestion('');
      
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get answer. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleQuestion = (sampleQuestion) => {
    setQuestion(sampleQuestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌍 Multilingual AI Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Learn technology in your language • English → Hindi • Tamil • Telugu
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <LanguageSelector 
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
        />
        <QuestionInput 
          question={question}
          setQuestion={setQuestion}
          onSubmit={handleAsk}
          loading={loading}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold">⚠️ Error</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-6 p-8 text-center">
            <div className="inline-flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
            <p className="text-gray-600 mt-4">Processing your question...</p>
          </div>
        )}

        {answer && (
          <div ref={answerRef} className="mt-8">
            <AnswerDisplay answer={answer} />
          </div>
        )}

        {!answer && !loading && (
          <SampleQuestions onSelectQuestion={handleSampleQuestion} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            SkillUp Hackathon • IBM Watson Assistant • Inclusive AI + Localization
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 • Prithiv - V.S.B. Engineering College
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
