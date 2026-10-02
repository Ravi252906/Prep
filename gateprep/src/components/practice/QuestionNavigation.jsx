import React from 'react';
import { Bookmark } from 'lucide-react';

const QuestionNavigation = ({ questions, currentQuestionIndex, answers, markedForReview, onQuestionSelect }) => {
  const getQuestionStatus = (index) => {
    if (index === currentQuestionIndex) return 'current';
    if (markedForReview.includes(index)) return 'marked';
    if (answers[index] !== undefined) return 'answered';
    return 'unanswered';
  };

  const getStatusStyles = (status) => {
    const styles = {
      current: 'bg-primary-600 text-white border-primary-600',
      answered: 'bg-success-100 text-success-700 border-success-500',
      marked: 'bg-warning-100 text-warning-700 border-warning-500',
      unanswered: 'bg-white text-gray-600 border-gray-300 hover:border-primary-400',
    };
    return styles[status];
  };

  const getStatusLabel = (status) => {
    const labels = {
      current: 'Current',
      answered: 'Answered',
      marked: 'Marked',
      unanswered: 'Not Visited',
    };
    return labels[status];
  };

  const answeredCount = questions.filter((_, i) => answers[i] !== undefined).length;
  const markedCount = markedForReview.length;
  const unansweredCount = questions.length - answeredCount - (currentQuestionIndex !== undefined && answers[currentQuestionIndex] === undefined ? 0 : 0);

  return (
    <div className="card p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Question Navigation</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success-100 border-2 border-success-500"></div>
            <span className="text-gray-600">Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning-100 border-2 border-warning-500"></div>
            <span className="text-gray-600">Marked ({markedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border-2 border-gray-300"></div>
            <span className="text-gray-600">Not Visited ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-600 border-2 border-primary-600"></div>
            <span className="text-gray-600">Current</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
        {questions.map((_, index) => {
          const status = getQuestionStatus(index);
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`w-10 h-10 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${getStatusStyles(status)}`}
              title={`Question ${index + 1} - ${getStatusLabel(status)}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Bookmark className="w-3 h-3" />
          <span>Click on a number to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
