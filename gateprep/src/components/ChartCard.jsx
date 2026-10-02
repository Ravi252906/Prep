import React from 'react';

const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ChartCard;
