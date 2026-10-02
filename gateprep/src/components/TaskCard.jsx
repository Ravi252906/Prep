import React from 'react';
import { Check, Clock } from 'lucide-react';
import Badge from './ui/Badge';

const TaskCard = ({ task, onToggle }) => {
  const priorityColors = {
    high: 'bg-error-100 text-error-700',
    medium: 'bg-warning-100 text-warning-700',
    low: 'bg-success-100 text-success-700',
  };

  const categoryColors = {
    DBMS: 'bg-blue-50 text-blue-700',
    DSA: 'bg-purple-50 text-purple-700',
    OS: 'bg-green-50 text-green-700',
    Practice: 'bg-orange-50 text-orange-700',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-white rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'border-gray-100 bg-gray-50'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          task.completed
            ? 'bg-success-500 border-success-500'
            : 'border-gray-300 hover:border-primary-500'
        }`}
      >
        {task.completed && (
          <Check className="w-3 h-3 text-white animate-scale-in" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <Badge variant="neutral" size="sm" className={categoryColors[task.category] || 'bg-gray-100 text-gray-700'}>
            {task.category}
          </Badge>
          {task.priority && (
            <Badge variant="neutral" size="sm" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          )}
        </div>

        <p
          className={`text-sm font-medium transition-all duration-200 ${
            task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
          }`}
        >
          {task.text}
        </p>

        {task.estimatedTime && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{task.estimatedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
