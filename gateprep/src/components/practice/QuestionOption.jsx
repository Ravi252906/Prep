import React from 'react';
import { Check, X } from 'lucide-react';

const QuestionOption = ({ option, index, isSelected, isCorrect, showCorrect, onClick, className }) => {
  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D, etc.

  return (
    <button
      onClick={onClick}
      disabled={showCorrect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
        className || ''
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-start gap-3">
        {/* Option Label */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          isSelected
            ? 'bg-primary-600 text-white'
            : isCorrect && showCorrect
            ? 'bg-success-600 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {optionLabel}
        </div>

        {/* Option Text */}
        <div className="flex-1 pt-1">
          <span className={`text-gray-900 ${isSelected ? 'font-medium' : ''}`}>
            {option}
          </span>
        </div>

        {/* Feedback Icons */}
        {showCorrect && (
          <div className="flex-shrink-0">
            {isCorrect ? (
              <div className="w-6 h-6 rounded-full bg-success-600 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : isSelected && !isCorrect ? (
              <div className="w-6 h-6 rounded-full bg-error-600 flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </button>
  );
};

export default QuestionOption;
