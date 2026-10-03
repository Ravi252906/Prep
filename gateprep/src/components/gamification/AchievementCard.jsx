import React from 'react';
import * as Icons from 'lucide-react';

const AchievementCard = ({ achievement, isUnlocked, unlockDate }) => {
  const Icon = Icons[achievement.icon] || Icons.Award;

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        transition-all
        hover:shadow-md
        ${
          isUnlocked
            ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 dark:border-amber-900/30 dark:from-amber-900/20 dark:to-amber-900/10'
            : 'border-slate-200 bg-slate-50 opacity-60 dark:border-slate-700 dark:bg-slate-900/50'
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`
            rounded-lg
            p-2
            ${
              isUnlocked
                ? 'bg-amber-100 dark:bg-amber-900/30'
                : 'bg-slate-200 dark:bg-slate-800'
            }
          `}
        >
          <Icon
            className={`
              h-6
              w-6
              ${
                isUnlocked
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-400 dark:text-slate-600'
              }
            `}
          />
        </div>
        {isUnlocked && (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Unlocked
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {achievement.name}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
        {achievement.description}
      </p>

      {isUnlocked && unlockDate && (
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
          <Icons.Calendar className="h-3 w-3" />
          <span>
            Unlocked on {new Date(unlockDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      )}

      {!isUnlocked && (
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
          <Icons.Lock className="h-3 w-3" />
          <span>Locked</span>
        </div>
      )}

      {achievement.xpReward && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Icons.Zap className="h-3 w-3" />
          <span>+{achievement.xpReward} XP</span>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
