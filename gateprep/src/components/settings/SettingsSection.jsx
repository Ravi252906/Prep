import React from 'react';

const SettingsSection = ({ title, description, children, className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default SettingsSection;
