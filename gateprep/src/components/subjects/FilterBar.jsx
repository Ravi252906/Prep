import React from 'react';

const FilterBar = ({ activeFilter, onFilterChange, filterOptions }) => {
  const defaultFilters = [
    { id: 'all', label: 'All' },
    { id: 'core-cs', label: 'Core CS' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'aptitude', label: 'Aptitude' },
  ];

  const filters = filterOptions || defaultFilters;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
