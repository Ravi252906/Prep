import React from 'react';
import { Target, Clock, CheckCircle, XCircle, TrendingUp, Award } from 'lucide-react';

const ResultSummary = ({ result }) => {
  const stats = [
    {
      label: 'Score',
      value: `${result.score}/${result.totalMarks}`,
      icon: Target,
      color: 'primary',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600'
    },
    {
      label: 'Accuracy',
      value: `${result.accuracy}%`,
      icon: TrendingUp,
      color: 'success',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600'
    },
    {
      label: 'Correct',
      value: result.correct,
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success-50',
      textColor: 'text-success-600'
    },
    {
      label: 'Incorrect',
      value: result.incorrect,
      icon: XCircle,
      color: 'error',
      bgColor: 'bg-error-50',
      textColor: 'text-error-600'
    },
    {
      label: 'Unanswered',
      value: result.unanswered,
      icon: Clock,
      color: 'warning',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-600'
    },
    {
      label: 'Percentile',
      value: `${result.percentile}%`,
      icon: Award,
      color: 'primary',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-center gap-3">
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultSummary;
