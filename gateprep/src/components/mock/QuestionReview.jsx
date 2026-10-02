import React, { useState } from 'react';
import Badge from '../ui/Badge';
import DifficultyBadge from '../subjects/DifficultyBadge';
import { CheckCircle, XCircle, Bookmark, Eye } from 'lucide-react';

const QuestionReview = ({ questions, userAnswers }) => {
  const [filter, setFilter] = useState('all');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const filteredQuestions = questions.filter((q, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer?.isCorrect;
    const isAnswered = userAnswer?.answered;
    const isMarked = userAnswer?.marked;

    switch (filter) {
      case 'correct':
        return isAnswered && isCorrect;
      case 'incorrect':
        return isAnswered && !isCorrect;
      case 'unanswered':
        return !isAnswered;
      case 'marked':
        return isMarked;
      default:
        return true;
    }
  });

  const getAnswerStatus = (question, userAnswer) => {
    if (!userAnswer?.answered) {
      return { status: 'unanswered', icon: Eye, color: 'warning', label: 'Unanswered' };
    }
    if (userAnswer.isCorrect) {
      return { status: 'correct', icon: CheckCircle, color: 'success', label: 'Correct' };
    }
    return { status: 'incorrect', icon: XCircle, color: 'error', label: 'Incorrect' };
  };

  const renderNATAnswer = (question, userAnswer) => {
    const correct = question.correctAnswer;
    const user = userAnswer?.answer;
    const isCorrect = userAnswer?.isCorrect ?? false;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Your Answer:</span>
          <span className={`font-mono font-semibold ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
            {user || 'Not answered'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Correct Answer:</span>
          <span className="font-mono font-semibold text-primary-600">{correct}</span>
        </div>
      </div>
    );
  };

  const renderMSQAnswer = (question, userAnswer) => {
    const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
    const user = userAnswer?.answer || [];
    const isCorrect = userAnswer?.isCorrect ?? false;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Your Answer:</span>
          <span className={`font-semibold ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
            {user.length > 0 ? user.map(i => question.options[i]).join(', ') : 'Not answered'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Correct Answer:</span>
          <span className="font-semibold text-primary-600">
            {correct.map(i => question.options[i]).join(', ')}
          </span>
        </div>
      </div>
    );
  };

  const renderMCQAnswer = (question, userAnswer) => {
    const correct = question.correctAnswer;
    const user = userAnswer?.answer;
    const isCorrect = userAnswer?.isCorrect ?? false;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Your Answer:</span>
          <span className={`font-semibold ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
            {user !== undefined ? question.options[user] : 'Not answered'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Correct Answer:</span>
          <span className="font-semibold text-primary-600">{question.options[correct]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All', count: questions.length },
          { key: 'correct', label: 'Correct', count: questions.filter((q, i) => userAnswers[i]?.answered && userAnswers[i]?.isCorrect).length },
          { key: 'incorrect', label: 'Incorrect', count: questions.filter((q, i) => userAnswers[i]?.answered && !userAnswers[i]?.isCorrect).length },
          { key: 'unanswered', label: 'Unanswered', count: questions.filter((q, i) => !userAnswers[i]?.answered).length },
          { key: 'marked', label: 'Marked', count: questions.filter((q, i) => userAnswers[i]?.marked).length }
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-primary-500'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => {
          const originalIndex = questions.indexOf(question);
          const userAnswer = userAnswers[originalIndex];
          const answerStatus = getAnswerStatus(question, userAnswer);
          const StatusIcon = answerStatus.icon;
          const isExpanded = expandedQuestion === originalIndex;

          return (
            <div key={question.id} className="card p-5">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900">Q{originalIndex + 1}</span>
                  <Badge variant="primary" size="sm">{question.type}</Badge>
                  <Badge variant="neutral" size="sm" className="bg-gray-100 text-gray-700">
                    {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
                  </Badge>
                  <DifficultyBadge difficulty={question.difficulty} />
                  <Badge
                    variant={answerStatus.color}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <StatusIcon className="w-3 h-3" />
                    {answerStatus.label}
                  </Badge>
                  {userAnswer?.marked && (
                    <Badge variant="warning" size="sm" className="flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      Marked
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : originalIndex)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {isExpanded ? 'Hide' : 'Show'} Details
                </button>
              </div>

              {/* Question Text */}
              <p className="text-gray-900 mb-3">{question.question}</p>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Answer */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    {question.type === 'NAT' && renderNATAnswer(question, userAnswer)}
                    {question.type === 'MSQ' && renderMSQAnswer(question, userAnswer)}
                    {question.type === 'MCQ' && renderMCQAnswer(question, userAnswer)}
                  </div>

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-900 mb-2">Explanation</h4>
                      <p className="text-sm text-primary-800">{question.explanation}</p>
                    </div>
                  )}

                  {/* Subject & Topic */}
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{question.subject}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{question.topic}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionReview;
