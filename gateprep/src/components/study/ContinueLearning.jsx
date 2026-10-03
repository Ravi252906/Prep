import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useStudySession } from '../../context/StudySessionContext';

const ContinueLearning = () => {
  const navigate = useNavigate();
  const { getContinueLearning } = useStudySession();

  const continueLearning = getContinueLearning();

  if (!continueLearning) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <Icons.BookOpen className="h-8 w-8 text-slate-400" />
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              No unfinished activities
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Start a practice session or revision to continue later
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getRouteForType = (type) => {
    switch (type) {
      case 'practice':
        return '/practice/session';
      case 'revision':
        return `/revision/${continueLearning.id}`;
      case 'mock_test':
        return `/mock-tests/${continueLearning.id}`;
      case 'subject':
        return `/subjects/${continueLearning.subject?.toLowerCase().replace(/\s+/g, '-')}`;
      default:
        return '/practice';
    }
  };

  const handleContinue = () => {
    navigate(getRouteForType(continueLearning.type));
  };

  const getIconForType = (type) => {
    const iconMap = {
      practice: 'PenTool',
      revision: 'RotateCcw',
      mock_test: 'FileText',
      subject: 'BookOpen',
    };
    return iconMap[type] || 'Play';
  };

  const Icon = Icons[getIconForType(continueLearning.type)];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Continue Learning
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {continueLearning.title}
            </p>
            {continueLearning.subject && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                {continueLearning.subject}
              </p>
            )}
            {continueLearning.progress && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-slate-900 dark:text-slate-100">
                    {continueLearning.progress}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500"
                    style={{ width: `${parseInt(continueLearning.progress) || 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleContinue}
          className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Icons.Play className="mr-2 h-4 w-4" />
          Continue
        </button>
      </div>
    </div>
  );
};

export default ContinueLearning;
