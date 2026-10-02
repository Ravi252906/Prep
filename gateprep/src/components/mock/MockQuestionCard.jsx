import React from 'react';
import Badge from '../ui/Badge';
import DifficultyBadge from '../subjects/DifficultyBadge';

const MockQuestionCard = ({ question, selectedAnswer, onAnswerSelect, questionType }) => {
  const isMSQ = questionType === 'MSQ';
  const isNAT = questionType === 'NAT';

  const handleOptionClick = (index) => {
    if (isMSQ) {
      // For MSQ, toggle the option
      const newSelection = selectedAnswer?.includes(index)
        ? selectedAnswer.filter(i => i !== index)
        : [...(selectedAnswer || []), index];
      onAnswerSelect(newSelection);
    } else {
      // For MCQ, single selection
      onAnswerSelect(index);
    }
  };

  const handleNATChange = (value) => {
    onAnswerSelect(value);
  };

  return (
    <div className="card p-6 space-y-6">
      {/* Question Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="primary" size="sm">{question.type}</Badge>
        <Badge variant="neutral" size="sm" className="bg-gray-100 text-gray-700">
          {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
        </Badge>
        {question.negativeMarks && (
          <Badge variant="error" size="sm" className="bg-error-50 text-error-700">
            -{question.negativeMarks}
          </Badge>
        )}
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Question Text */}
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-900 font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* Options or NAT Input */}
      {!isNAT && question.options && question.options.length > 0 ? (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = isMSQ
              ? selectedAnswer?.includes(index)
              : selectedAnswer === index;

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {isMSQ ? (
                      <div className={`w-3 h-3 rounded-sm ${isSelected ? 'bg-white' : 'bg-transparent'}`} />
                    ) : (
                      <span className="text-xs font-medium">{String.fromCharCode(65 + index)}</span>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : isNAT ? (
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your answer:
          </label>
          <input
            type="text"
            value={selectedAnswer || ''}
            onChange={(e) => handleNATChange(e.target.value)}
            placeholder="Enter numerical answer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter a numerical value. Decimal points are allowed.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MockQuestionCard;
