import React from 'react';
import * as Icons from 'lucide-react';

const MistakeCard = ({ mistake, onReview, onMarkLearned, onRemove }) => {
  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      easy: {
        label: 'Easy',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      },
      medium: {
        label: 'Medium',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      },
      hard: {
        label: 'Hard',
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      },
    };

    const config = difficultyConfig[difficulty.toLowerCase()] || difficultyConfig.medium;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getDifficultyBadge(mistake.difficulty)}
            {mistake.reviewed && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                Reviewed
              </span>
            )}
            {mistake.markedLearned && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Learned
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {mistake.subject} • {mistake.topic}
          </p>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-500">
          {formatDate(mistake.attemptDate)}
        </span>
      </div>

      <div className="mb-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-900/50">
        <p className="text-sm text-slate-900 dark:text-slate-100">
          {mistake.question}
        </p>
      </div>

      {mistake.reason && (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/30 dark:bg-red-900/10">
          <div className="flex items-center gap-2 mb-1">
            <Icons.AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-medium text-red-900 dark:text-red-400">
              Reason
            </span>
          </div>
          <p className="text-sm text-red-900 dark:text-red-400">
            {mistake.reason}
          </p>
        </div>
      )}

      {mistake.explanation && (
        <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/30 dark:bg-blue-900/10">
          <div className="flex items-center gap-2 mb-1">
            <Icons.Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-900 dark:text-blue-400">
              Explanation
            </span>
          </div>
          <p className="text-sm text-blue-900 dark:text-blue-400">
            {mistake.explanation}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {!mistake.reviewed && (
            <button
              onClick={() => onReview && onReview(mistake.id)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Icons.Eye className="mr-1 h-3 w-3" />
              Review
            </button>
          )}
          {!mistake.markedLearned && (
            <button
              onClick={() => onMarkLearned && onMarkLearned(mistake.id)}
              className="inline-flex items-center rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              <Icons.Check className="mr-1 h-3 w-3" />
              Mark Learned
            </button>
          )}
        </div>
        <button
          onClick={() => onRemove && onRemove(mistake.id)}
          className="inline-flex items-center rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Icons.Trash2 className="mr-1 h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default MistakeCard;
