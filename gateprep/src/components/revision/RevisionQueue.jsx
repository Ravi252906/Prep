import React from 'react';
import * as Icons from 'lucide-react';

const RevisionQueue = ({ items, onStartRevision, onViewTopic, onMarkRevised }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      due: {
        label: 'Due',
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      },
      'due today': {
        label: 'Due Today',
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      },
      upcoming: {
        label: 'Upcoming',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      },
      completed: {
        label: 'Completed',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      },
      weak: {
        label: 'Weak',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.due;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 py-12">
        <Icons.Clock className="h-12 w-12 text-slate-400 dark:text-slate-600" />
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
          No revisions scheduled
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          Add topics to start tracking your revisions
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Topic
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Subject
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Progress
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Accuracy
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Last Revised
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Next Revision
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {items.map((item) => (
            <tr
              key={item.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {item.topicName}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {item.subject}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500"
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {item.progress || 0}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {item.accuracy || 0}%
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {formatDate(item.lastRevised)}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {formatDate(item.nextRevision)}
                </div>
              </td>
              <td className="px-4 py-4">
                {getPriorityBadge(item.priority)}
              </td>
              <td className="px-4 py-4">
                {getStatusBadge(item.status)}
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onStartRevision && onStartRevision(item)}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <Icons.Play className="mr-1 h-3 w-3" />
                    Start
                  </button>
                  <button
                    onClick={() => onViewTopic && onViewTopic(item)}
                    className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Icons.Eye className="mr-1 h-3 w-3" />
                    View
                  </button>
                  {item.status !== 'completed' && (
                    <button
                      onClick={() => onMarkRevised && onMarkRevised(item.id)}
                      className="inline-flex items-center rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                    >
                      <Icons.Check className="mr-1 h-3 w-3" />
                      Done
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevisionQueue;
