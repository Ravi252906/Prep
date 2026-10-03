import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useMistakes } from '../context/MistakesContext';
import MistakeCard from '../components/mistakes/MistakeCard';
import MistakeFilters from '../components/mistakes/MistakeFilters';

const Mistakes = () => {
  const { mistakes, getMistakeStatistics, markAsReviewed, markAsLearned, deleteMistake, filterMistakes } = useMistakes();

  const [filters, setFilters] = useState({
    subject: 'all',
    topic: '',
    difficulty: 'all',
    reviewed: undefined,
  });

  const [filteredMistakes, setFilteredMistakes] = useState(mistakes);
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    unreviewed: 0,
    learned: 0,
    unlearned: 0,
  });

  useEffect(() => {
    setFilteredMistakes(filterMistakes(filters));
  }, [mistakes, filters, filterMistakes]);

  useEffect(() => {
    setStats(getMistakeStatistics());
  }, [mistakes, getMistakeStatistics]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      subject: 'all',
      topic: '',
      difficulty: 'all',
      reviewed: undefined,
    });
  };

  const handleReview = (mistakeId) => {
    markAsReviewed(mistakeId);
  };

  const handleMarkLearned = (mistakeId) => {
    markAsLearned(mistakeId);
  };

  const handleRemove = (mistakeId) => {
    if (confirm('Are you sure you want to remove this mistake?')) {
      deleteMistake(mistakeId);
    }
  };

  const statCards = [
    {
      label: 'Total Mistakes',
      value: stats.total,
      icon: 'AlertTriangle',
      color: 'red',
    },
    {
      label: 'Reviewed',
      value: stats.reviewed,
      icon: 'CheckCircle',
      color: 'emerald',
    },
    {
      label: 'Unreviewed',
      value: stats.unreviewed,
      icon: 'Clock',
      color: 'amber',
    },
    {
      label: 'Learned',
      value: stats.learned,
      icon: 'Brain',
      color: 'blue',
    },
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    },
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Mistake Book
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Track and learn from your mistakes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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

      {/* Filters */}
      <MistakeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Mistakes List */}
      <div className="mt-6">
        {filteredMistakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredMistakes.map((mistake) => (
              <MistakeCard
                key={mistake.id}
                mistake={mistake}
                onReview={handleReview}
                onMarkLearned={handleMarkLearned}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
            <Icons.CheckCircle className="h-12 w-12 text-emerald-500" />
            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              {mistakes.length === 0 ? 'No mistakes recorded yet' : 'No mistakes match your filters'}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              {mistakes.length === 0
                ? 'Mistakes will be added when you answer questions incorrectly'
                : 'Try adjusting your filters to see more mistakes'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mistakes;
