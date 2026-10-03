import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const TopicPerformanceTable = ({ topics }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'partial':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'weak':
        return <AlertTriangle className="w-5 h-5 text-error-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400';
      case 'partial':
        return 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400';
      case 'weak':
        return 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-400';
      default:
        return 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-400';
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Topic Performance</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Topic</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Progress</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Accuracy</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-slate-400">Questions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900 dark:text-slate-100">{topic.name}</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{topic.subject}</p>
                </td>
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(topic.status)}`}>
                    {getStatusIcon(topic.status)}
                    <span className="capitalize">{topic.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <ProgressBar progress={topic.progress} size="sm" />
                </td>
                <td className="py-3 px-4">
                  <span className={`font-medium ${topic.accuracy >= 80 ? 'text-success-600' : topic.accuracy >= 60 ? 'text-warning-600' : 'text-error-600'}`}>
                    {topic.accuracy}%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-slate-400">
                  {topic.questionsAttempted}/{topic.totalQuestions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicPerformanceTable;
