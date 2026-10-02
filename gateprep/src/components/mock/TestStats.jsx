import React from 'react';
import { FileText, Target, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

const TestStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Tests',
      value: stats.totalTests || 0,
      icon: FileText,
      color: 'primary',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600'
    },
    {
      label: 'Attempted',
      value: stats.attemptedTests || 0,
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600'
    },
    {
      label: 'Avg Score',
      value: stats.averageScore || 0,
      icon: Target,
      color: 'primary',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
      suffix: '%'
    },
    {
      label: 'Best Score',
      value: stats.bestScore || 0,
      icon: TrendingUp,
      color: 'warning',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-600',
      suffix: '%'
    },
    {
      label: 'Accuracy',
      value: stats.accuracy || 0,
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600',
      suffix: '%'
    },
    {
      label: 'Total Time',
      value: stats.totalTime || 0,
      icon: Clock,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      suffix: 'h'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-center gap-3">
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}{stat.suffix || ''}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestStats;
