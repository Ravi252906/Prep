import React from 'react';
import * as Icons from 'lucide-react';

const QuickRevisionCard = ({ card, onOpen }) => {
  const iconMap = {
    formulas: 'FileText',
    concepts: 'Lightbulb',
    notes: 'StickyNote',
    mistakes: 'AlertTriangle',
    pyq: 'BookOpen',
    topics: 'List',
  };

  const Icon = Icons[iconMap[card.type]] || Icons.FileText;

  const colorMap = {
    formulas: 'blue',
    concepts: 'amber',
    notes: 'emerald',
    mistakes: 'red',
    pyq: 'indigo',
    topics: 'purple',
  };

  const color = colorMap[card.type] || 'blue';

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={() => onOpen && onOpen(card.type)}
      className={`
        ${colors.bg}
        w-full
        rounded-xl
        border
        border-slate-200
        p-4
        text-left
        transition-all
        hover:shadow-md
        dark:border-slate-700
      `}
    >
      <div className="flex items-start justify-between">
        <div className={`
          ${colors.iconBg}
          rounded-lg
          p-2
        `}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
        <span className={`text-sm font-semibold ${colors.text}`}>
          {card.count}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {card.title}
      </h3>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        {card.description}
      </p>

      <div className={`mt-3 text-xs font-medium ${colors.text}`}>
        Open →
      </div>
    </button>
  );
};

export default QuickRevisionCard;
