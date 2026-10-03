import React from 'react';
import * as Icons from 'lucide-react';

const WeakTopicCard = ({ topic, onRevise }) => {
  const getAccuracyColor = (accuracy) => {
    if (accuracy < 40) return 'text-red-600 dark:text-red-400';
    if (accuracy < 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: {
        label: 'High',
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      },
      medium: {
        label: 'Medium',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      },
      low: {
        label: 'Low',
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
      },
    };

    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.medium;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {topic.topicName}
            </h3>
            {getPriorityBadge(topic.priority)}
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            {topic.subject}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${getAccuracyColor(topic.accuracy)}`}>
            {topic.accuracy}%
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">Accuracy</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-500">Progress</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
            {topic.progress}%
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-500">Questions</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
            {topic.questionsAttempted || 0}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-500">Last Revised</p>
          <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
            {topic.lastRevised
              ? new Date(topic.lastRevised).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : 'Never'}
          </p>
        </div>
      </div>

      <button
        onClick={() => onRevise && onRevise(topic)}
        className="mt-4 w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <Icons.RefreshCw className="mr-2 h-4 w-4" />
        Revise Now
      </button>
    </div>
  );
};

export default WeakTopicCard;
