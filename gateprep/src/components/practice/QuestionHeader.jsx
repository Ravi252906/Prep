import React from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const QuestionHeader = ({
  question,
  currentIndex,
  totalQuestions,
  onBack,
  onPrevious,
  onNext,
  onMarkReview,
  isMarked,
  canGoBack,
  canGoForward,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Left - Back and Question Info */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={onBack}>
          Back
        </Button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Question {currentIndex + 1}</Badge>
            <span className="text-gray-500 text-sm">of {totalQuestions}</span>
          </div>
          <div className="text-sm text-gray-600">
            {question.subject} • {question.topic}
          </div>
        </div>
      </div>

      {/* Right - Navigation and Mark */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={isMarked ? BookmarkCheck : Bookmark}
          onClick={onMarkReview}
          className={isMarked ? 'text-warning-600' : ''}
        >
          {isMarked ? 'Marked' : 'Mark for Review'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrevious}
          disabled={!canGoBack}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onNext}
          disabled={!canGoForward}
        >
          {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionHeader;
