import React from 'react';
import * as Icons from 'lucide-react';

const XPProgress = ({ currentXP, totalXP, xpToNextLevel, levelProgress, currentLevelInfo }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-2">
            <Icons.Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {currentLevelInfo?.name || 'Beginner'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Level {currentLevelInfo ? currentLevelInfo.minXP === 0 ? 1 : currentLevelInfo.minXP : 1}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {totalXP}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Total XP
          </p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Progress to next level
          </span>
          <span className="text-xs font-medium text-slate-900 dark:text-slate-100">
            {xpToNextLevel > 0 ? `${xpToNextLevel} XP remaining` : 'Max Level'}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all"
            style={{ width: `${Math.min(levelProgress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        <span>{currentXP} XP</span>
        <span>{xpToNextLevel > 0 ? totalXP + xpToNextLevel : '∞'} XP</span>
      </div>
    </div>
  );
};

export default XPProgress;
