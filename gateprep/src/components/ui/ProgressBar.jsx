import React from 'react';

const ProgressBar = ({ 
  progress, 
  size = 'md', 
  color = 'primary', 
  showLabel = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  };

  const bgColor = {
    primary: 'bg-primary-100 dark:bg-primary-900/30',
    success: 'bg-success-100 dark:bg-success-900/30',
    warning: 'bg-warning-100 dark:bg-warning-900/30',
    error: 'bg-error-100 dark:bg-error-900/30',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative ${sizeClasses[size]} ${bgColor[color]} rounded-full overflow-hidden`}>
        <div
          className={`absolute top-0 left-0 h-full ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{progress}%</p>
      )}
    </div>
  );
};

export default ProgressBar;
