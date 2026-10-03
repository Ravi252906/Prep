import React from 'react';
import * as Icons from 'lucide-react';

const ChallengeCard = ({ challenge, type, onUpdateProgress }) => {
  const isDaily = type === 'daily';
  const isCompleted = challenge.completed;

  const getProgress = () => {
    if (!challenge.tasks || challenge.tasks.length === 0) return 0;
    const completedTasks = challenge.tasks.filter(task => {
      const progress = challenge.progress?.[task.id] || 0;
      return progress >= task.target;
    }).length;
    return Math.round((completedTasks / challenge.tasks.length) * 100);
  };

  const handleStart = () => {
    // Start challenge logic would go here
  };

  const getIcon = () => {
    return isDaily ? 'Target' : 'Trophy';
  };

  const Icon = Icons[getIcon()];

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        transition-all
        hover:shadow-md
        ${
          isCompleted
            ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:border-emerald-900/30 dark:from-emerald-900/20 dark:to-emerald-900/10'
            : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`
            rounded-lg
            p-2
            ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                : 'bg-blue-100 dark:bg-blue-900/30'
            }
          `}
        >
          <Icon
            className={`
              h-6
              w-6
              ${
                isCompleted
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-blue-600 dark:text-blue-400'
              }
            `}
          />
        </div>
        {isCompleted && (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Completed
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {isDaily ? 'Daily Challenge' : 'Weekly Challenge'}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
        {isCompleted ? 'You have completed this challenge!' : 'Complete all tasks to earn XP'}
      </p>

      {/* Tasks */}
      {challenge.tasks && challenge.tasks.length > 0 && (
        <div className="space-y-2 mb-3">
          {challenge.tasks.map((task) => {
            const progress = challenge.progress?.[task.id] || 0;
            const taskCompleted = progress >= task.target;

            return (
              <div key={task.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  {task.label}
                </span>
                <span className={taskCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-500'}>
                  {progress}/{task.target}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={`
              h-full
              transition-all
              ${
                isCompleted
                  ? 'bg-emerald-600 dark:bg-emerald-500'
                  : 'bg-blue-600 dark:bg-blue-500'
              }
            `}
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* XP Reward */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Icons.Zap className="h-3 w-3" />
          <span>+{challenge.xpReward} XP</span>
        </div>
        {!isCompleted && (
          <button
            onClick={handleStart}
            className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {getProgress() > 0 ? 'Continue' : 'Start'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
