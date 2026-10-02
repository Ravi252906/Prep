import React from 'react';
import * as Icons from 'lucide-react';

const StatCard = ({ label, value, unit, icon, color, trend, trendDirection }) => {
  const Icon = Icons[icon];
  const TrendIcon = trendDirection === 'up' ? Icons.TrendingUp : Icons.TrendingDown;
  const trendColor = trendDirection === 'up' ? 'text-success-600' : 'text-error-600';
  const trendBgColor = trendDirection === 'up' ? 'bg-success-50' : 'bg-error-50';

  return (
    <div className="card card-hover p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
              <div className={`p-1 rounded ${trendBgColor}`}>
                <TrendIcon className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium">{trend}</span>
              <span className="text-xs text-gray-400">vs last week</span>
            </div>
          )}
        </div>
        <div className={`${color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
