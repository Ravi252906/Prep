import React from 'react';
import QuestionOption from './QuestionOption';
import DifficultyBadge from '../subjects/DifficultyBadge';
import Badge from '../ui/Badge';

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, showFeedback, isReview }) => {
  return (
    <div className="card p-6 space-y-6">
      {/* Question Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="primary" size="sm">{question.type}</Badge>
        <Badge variant="neutral" size="sm" className="bg-gray-100 text-gray-700">
          {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
        </Badge>
        <DifficultyBadge difficulty={question.difficulty} />
        {question.year && (
          <Badge variant="neutral" size="sm" className="bg-purple-100 text-purple-700">
            GATE {question.year}
          </Badge>
        )}
      </div>

      {/* Question Text */}
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-900 font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;
          const showCorrect = showFeedback || isReview;

          let optionClass = 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/50';
          if (showCorrect) {
            if (isCorrect) {
              optionClass = 'border-success-500 bg-success-50';
            } else if (isSelected && !isCorrect) {
              optionClass = 'border-error-500 bg-error-50';
            }
          } else if (isSelected) {
            optionClass = 'border-primary-500 bg-primary-50';
          }

          return (
            <QuestionOption
              key={index}
              option={option}
              index={index}
              isSelected={isSelected}
              isCorrect={isCorrect}
              showCorrect={showCorrect}
              onClick={() => !showFeedback && !isReview && onAnswerSelect(index)}
              className={optionClass}
            />
          );
        })}
      </div>

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
