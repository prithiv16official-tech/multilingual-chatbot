import React from 'react';

const SAMPLES = [
  {
    category: "📱 Basics",
    questions: [
      "What is a microcontroller?",
      "What does IoT mean?",
      "What is embedded systems?"
    ]
  },
  {
    category: "⚙️ Arduino & Components",
    questions: [
      "What is Arduino and how does it work?",
      "How does an LED work?",
      "What is a sensor in IoT?"
    ]
  },
  {
    category: "💡 Real-world Applications",
    questions: [
      "How do smart home systems work?",
      "What is an automated greenhouse?",
      "How do wearable devices collect data?"
    ]
  }
];

export default function SampleQuestions({ onSelectQuestion }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        💡 Explore Sample Topics
      </h2>
      <div className="space-y-6">
        {SAMPLES.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              {section.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {section.questions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSelectQuestion(q)}
                  className="p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <p className="text-gray-800 font-medium">{q}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
