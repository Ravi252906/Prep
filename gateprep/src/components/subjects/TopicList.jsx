import React from 'react';
import TopicCard from './TopicCard';

const TopicList = ({ topics, onToggleComplete }) => {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No topics available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TopicList;
