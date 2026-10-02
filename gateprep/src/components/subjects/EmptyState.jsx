import React from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';

const EmptyState = ({ type = 'default', message }) => {
  const emptyStates = {
    search: {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search terms',
    },
    filter: {
      icon: Filter,
      title: 'No subjects match your filter',
      description: 'Try selecting a different category',
    },
    default: {
      icon: BookOpen,
      title: 'No subjects available',
      description: 'Check back later for new content',
    },
  };

  const { icon: Icon, title, description } = emptyStates[type] || emptyStates.default;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-sm">{message || description}</p>
    </div>
  );
};

export default EmptyState;
