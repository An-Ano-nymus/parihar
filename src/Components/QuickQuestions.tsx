import React from 'react';

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

export function QuickQuestions({ onSelect }: QuickQuestionsProps) {
  const questions = [
    { id: 'material', text: 'What are your products made of?' },
    { id: 'use', text: 'How do I use the product?' },
    { id: 'environment', text: 'Are products eco-friendly?' },
    { id: 'locator', text: 'How does restroom locator work?' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.text)}
          className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          {q.text}
        </button>
      ))}
    </div>
  );
}