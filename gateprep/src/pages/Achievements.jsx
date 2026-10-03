import React, { useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import AchievementCard from '../components/gamification/AchievementCard';
import XPProgress from '../components/gamification/XPProgress';

const Achievements = () => {
  const { gamification, getCurrentLevelInfo, getXPToNextLevel, getLevelProgress, checkAchievements } = useGamification();

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  const currentLevelInfo = getCurrentLevelInfo();
  const xpToNextLevel = getXPToNextLevel();
  const levelProgress = getLevelProgress();

  const unlockedCount = gamification.achievements.length;
  const totalCount = gamification.ACHIEVEMENT_DEFINITIONS.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Achievements
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Track your accomplishments and earn rewards
        </p>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <XPProgress
          currentXP={gamification.currentXP}
          totalXP={gamification.totalXP}
          xpToNextLevel={xpToNextLevel}
          levelProgress={levelProgress}
          currentLevelInfo={currentLevelInfo}
        />
      </div>

      {/* Achievement Progress */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Achievement Progress
            </h3>
          </div>
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {unlockedCount}/{totalCount}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          {progressPercentage}% of achievements unlocked
        </p>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          All Achievements
        </h2>
        
        {gamification.ACHIEVEMENT_DEFINITIONS.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gamification.ACHIEVEMENT_DEFINITIONS.map((achievement) => {
              const isUnlocked = gamification.achievements.includes(achievement.id);
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={isUnlocked}
                  unlockDate={isUnlocked ? new Date().toISOString() : null}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
            <Icons.Trophy className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              No achievements available yet
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Start practicing to unlock achievements
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
