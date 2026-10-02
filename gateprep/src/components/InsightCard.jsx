import React from 'react';
import * as Icons from 'lucide-react';

const InsightCard = ({ title, value, icon, color, bgColor }) => {
  const Icon = Icons[icon];

  return (
    <div className="card p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <div className={`${bgColor} p-2.5 rounded-xl`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-0.5">{title}</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
