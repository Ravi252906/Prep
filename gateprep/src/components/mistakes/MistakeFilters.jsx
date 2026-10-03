import React from 'react';
import * as Icons from 'lucide-react';

const MistakeFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const subjects = ['DBMS', 'Operating Systems', 'Data Structures', 'Algorithms', 'Computer Networks', 'Digital Logic', 'Computer Organization', 'Theory of Computation', 'Compiler Design', 'General Aptitude'];
  
  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const reviewStatuses = ['all', true, false];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icons.Filter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Filters
          </h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Subject Filter */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            Subject
          </label>
          <select
            value={filters.subject || 'all'}
            onChange={(e) => onFilterChange('subject', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            Topic
          </label>
          <input
            type="text"
            value={filters.topic || ''}
            onChange={(e) => onFilterChange('topic', e.target.value)}
            placeholder="Filter by topic..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          />
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            Difficulty
          </label>
          <select
            value={filters.difficulty || 'all'}
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          >
            <option value="all">All Difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Reviewed Filter */}
        <div>
          <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            Review Status
          </label>
          <select
            value={filters.reviewed !== undefined ? String(filters.reviewed) : 'all'}
            onChange={(e) => onFilterChange('reviewed', e.target.value === 'all' ? undefined : e.target.value === 'true')}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          >
            <option value="all">All</option>
            <option value="true">Reviewed</option>
            <option value="false">Unreviewed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MistakeFilters;
