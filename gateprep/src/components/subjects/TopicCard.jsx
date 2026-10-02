import React from 'react';
import { Check, Clock, Play, RotateCcw } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';
import Button from '../ui/Button';

const TopicCard = ({ topic, onToggleComplete }) => {
  const getActionButton = () => {
    if (topic.completed) {
      return (
        <Button variant="secondary" size="sm" icon={RotateCcw}>
          Review
        </Button>
      );
    } else if (topic.progress > 0) {
      return (
        <Button variant="primary" size="sm" icon={Play}>
          Continue
        </Button>
      );
    } else {
      return (
        <Button variant="primary" size="sm" icon={Play}>
          Start
        </Button>
      );
    }
  };

  return (
    <div
      className={`card p-5 hover:shadow-md transition-all duration-200 ${
        topic.completed ? 'border-l-4 border-l-success-500 bg-success-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Completion toggle */}
        <button
          onClick={() => onToggleComplete(topic.id)}
          className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            topic.completed
              ? 'bg-success-500 border-success-500'
              : 'border-gray-300 hover:border-primary-500'
          }`}
        >
          {topic.completed && <Check className="w-3.5 h-3.5 text-white animate-scale-in" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className={`font-semibold text-base mb-1 ${topic.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {topic.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{topic.description}</p>
            </div>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>

          {/* Progress bar */}
          {topic.progress > 0 && !topic.completed && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium text-gray-900">{topic.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedTime}</span>
            </div>
            {getActionButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
