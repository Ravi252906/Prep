import React from 'react';
import { RotateCcw, Clock, AlertTriangle, CheckCircle, Play, BookOpen, PenTool } from 'lucide-react';
import Button from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';

const RevisionTracker = () => {
  const { planner, updateRevision, deleteRevision } = useAnalytics();
  const { revisionTracker } = planner;

  const getRevisionStatus = (revision) => {
    if (revision.completed) return { status: 'completed', color: 'success' };
    if (!revision.dueDate) return { status: 'scheduled', color: 'primary' };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(revision.dueDate);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'overdue', color: 'error' };
    if (diffDays === 0) return { status: 'due today', color: 'warning' };
    if (diffDays <= 3) return { status: 'upcoming', color: 'warning' };
    return { status: 'scheduled', color: 'primary' };
  };

  const getStatusColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 border-success-200 dark:border-success-800';
      case 'warning':
        return 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 border-warning-200 dark:border-warning-800';
      case 'error':
        return 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400 border-error-200 dark:border-error-800';
      default:
        return 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-800';
    }
  };

  const handleComplete = (revisionId) => {
    updateRevision(revisionId, { completed: true, completedAt: new Date().toISOString() });
  };

  const handleDelete = (revisionId) => {
    deleteRevision(revisionId);
  };

  if (revisionTracker.length === 0) {
    return (
      <div className="card p-6 text-center">
        <RotateCcw className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">No Revisions Scheduled</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Mark topics for revision to track them here
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Revision Tracker</h3>
        <span className="text-sm text-gray-500 dark:text-slate-400">
          {revisionTracker.filter(r => !r.completed).length} pending
        </span>
      </div>

      <div className="space-y-3">
        {revisionTracker.map((revision) => {
          const { status, color } = getRevisionStatus(revision);
          const statusColor = getStatusColor(color);

          return (
            <div
              key={revision.id}
              className={`p-4 rounded-lg border ${statusColor} ${revision.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <RotateCcw className="w-5 h-5" />
                    <h4 className="font-medium">{revision.topic}</h4>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{revision.subject}</p>
                  {revision.dueDate && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(revision.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {!revision.completed && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Play}
                      onClick={() => handleComplete(revision.id)}
                    >
                      Revise
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={BookOpen}
                    >
                      Learn
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={PenTool}
                    >
                      Practice
                    </Button>
                  </div>
                )}
              </div>

              {revision.completed && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed on {new Date(revision.completedAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(revision.id)}
                    className="ml-auto text-sm opacity-60 hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevisionTracker;
