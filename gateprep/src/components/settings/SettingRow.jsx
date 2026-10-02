import React from 'react';

const SettingRow = ({ 
  label, 
  description, 
  children, 
  divider = true,
  className = '' 
}) => {
  return (
    <div className={`
      py-4
      ${divider ? 'border-b border-gray-100 dark:border-slate-700 last:border-0' : ''}
      ${className}
    `}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-slate-100">{label}</p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingRow;
