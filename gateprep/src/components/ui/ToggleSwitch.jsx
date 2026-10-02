import React from 'react';

const ToggleSwitch = ({ 
  checked, 
  onChange, 
  disabled = false, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-8',
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const thumbPositionClasses = checked 
    ? 'translate-x-full' 
    : 'translate-x-0.5';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex flex-shrink-0
        ${sizeClasses[size]}
        rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${checked ? 'bg-primary-600' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block
          ${thumbSizeClasses[size]}
          rounded-full
          bg-white
          shadow-sm
          transition-transform duration-200 ease-in-out
          ${thumbPositionClasses}
        `}
      />
    </button>
  );
};

export default ToggleSwitch;
