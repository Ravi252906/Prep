import React from 'react';
import Badge from '../ui/Badge';

const QuestionPalette = ({ questions, currentQuestion, onQuestionSelect, onClose, isMobile = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-success-500 text-white border-success-500';
      case 'not-answered':
        return 'bg-red-500 text-white border-red-500';
      case 'marked':
        return 'bg-purple-500 text-white border-purple-500';
      case 'answered-marked':
        return 'bg-purple-600 text-white border-purple-600';
      case 'visited':
        return 'bg-navy-500 text-white border-navy-500';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:border-primary-500';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'answered':
        return 'Answered';
      case 'not-answered':
        return 'Not Answered';
      case 'marked':
        return 'Marked for Review';
      case 'answered-marked':
        return 'Answered & Marked';
      case 'visited':
        return 'Visited';
      default:
        return 'Not Visited';
    }
  };

  const paletteContent = (
    <div className="space-y-4">
      {/* Header - only for mobile */}
      {isMobile && (
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Question Palette</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success-500"></div>
          <span className="text-xs text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span className="text-xs text-gray-600">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500"></div>
          <span className="text-xs text-gray-600">Marked for Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-600"></div>
          <span className="text-xs text-gray-600">Answered & Marked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-navy-500"></div>
          <span className="text-xs text-gray-600">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border border-gray-300"></div>
          <span className="text-xs text-gray-600">Not Visited</span>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => onQuestionSelect(index)}
            className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
              currentQuestion === index
                ? 'ring-2 ring-primary-500 ring-offset-2'
                : ''
            } ${getStatusColor(q.status)}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
          {paletteContent}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 space-y-4">
      <h2 className="font-semibold text-gray-900">Question Palette</h2>
      {paletteContent}
    </div>
  );
};

export default QuestionPalette;
