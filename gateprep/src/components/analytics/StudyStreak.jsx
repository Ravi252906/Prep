import React from 'react';
import { Flame, Calendar } from 'lucide-react';

const StudyStreak = ({ currentStreak, longestStreak, lastStudyDate }) => {
  const getLastStudyText = () => {
    if (!lastStudyDate) return 'No study sessions yet';
    
    const lastDate = new Date(lastStudyDate);
    const today = new Date();
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Studied today';
    if (diffDays === 1) return 'Studied yesterday';
    if (diffDays < 7) return `Studied ${diffDays} days ago`;
    return `Studied ${lastDate.toLocaleDateString()}`;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Study Streak</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">{getLastStudyText()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{currentStreak}</p>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Current Streak</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{longestStreak}</p>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Best Streak</p>
        </div>
      </div>

      {/* Streak Calendar (Last 7 days) */}
      <div className="mt-4 flex items-center justify-between">
        <Calendar className="w-4 h-4 text-gray-400" />
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const isStudied = i < currentStreak;
            return (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  isStudied
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600'
                }`}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyStreak;
