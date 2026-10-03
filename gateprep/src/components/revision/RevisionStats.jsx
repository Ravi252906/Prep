import React from 'react';
import * as Icons from 'lucide-react';

const RevisionStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Due Today',
      value: stats.topicsDueToday || 0,
      icon: 'Clock',
      color: 'blue',
    },
    {
      label: 'Weak Topics',
      value: stats.weakTopics || 0,
      icon: 'AlertTriangle',
      color: 'amber',
    },
    {
      label: 'Revised This Week',
      value: stats.revisedThisWeek || 0,
      icon: 'CheckCircle',
      color: 'emerald',
    },
    {
      label: 'Revision Accuracy',
      value: `${stats.revisionAccuracy || 0}%`,
      icon: 'Target',
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = Icons[stat.icon];
        const colors = colorClasses[stat.color];

        return (
          <div
            key={index}
            className={`
              ${colors.bg}
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              p-4
              transition-all
              hover:shadow-md
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className={`mt-1 text-2xl font-bold ${colors.text}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`
                ${colors.iconBg}
                rounded-lg
                p-2
              `}>
                <Icon className={`h-5 w-5 ${colors.text}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RevisionStats;
