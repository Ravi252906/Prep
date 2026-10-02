import React from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const AnswerFeedback = ({ isCorrect, explanation }) => {
  if (!explanation) return null;

  return (
    <div className={`card p-5 space-y-4 ${isCorrect ? 'border-l-4 border-l-success-500' : 'border-l-4 border-l-error-500'}`}>
      {/* Result */}
      <div className={`flex items-center gap-3 ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
        {isCorrect ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <XCircle className="w-6 h-6" />
        )}
        <span className="font-semibold text-lg">
          {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
        </span>
      </div>

      {/* Explanation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          <Lightbulb className="w-5 h-5 text-warning-500" />
          <span>Explanation</span>
        </div>
        <p className="text-gray-700 leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
};

export default AnswerFeedback;
