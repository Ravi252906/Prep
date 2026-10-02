import React from 'react';

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'bg-success-100 text-success-700',
    Medium: 'bg-warning-100 text-warning-700',
    Hard: 'bg-error-100 text-error-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[difficulty] || colors.Medium}`}>
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
