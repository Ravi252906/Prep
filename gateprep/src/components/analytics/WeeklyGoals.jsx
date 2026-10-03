import React from 'react';
import { Target, BookOpen, FileText, CheckCircle, TrendingUp } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const WeeklyGoals = ({ goals, progress }) => {
  const goalItems = [
    {
      label: 'Study Hours',
      icon: Target,
      goal: goals.studyHours,
      current: progress.studyHours,
      unit: 'h',
      color: 'primary',
    },
    {
      label: 'Questions Solved',
      icon: BookOpen,
      goal: goals.questionsSolved,
      current: progress.questionsSolved,
      unit: '',
      color: 'success',
    },
    {
      label: 'PYQs Completed',
      icon: FileText,
      goal: goals.pyqsCompleted,
      current: progress.pyqsCompleted,
      unit: '',
      color: 'warning',
    },
    {
      label: 'Mock Tests',
      icon: CheckCircle,
      goal: goals.mockTestsCompleted,
      current: progress.mockTestsCompleted,
      unit: '',
      color: 'error',
    },
    {
      label: 'Topics Completed',
      icon: TrendingUp,
      goal: goals.topicsCompleted,
      current: progress.topicsCompleted,
      unit: '',
      color: 'primary',
    },
  ];

  const getProgressPercentage = (current, goal) => {
    if (goal === 0) return 0;
    return Math.min(100, Math.round((current / goal) * 100));
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Weekly Goals</h3>
      <div className="space-y-4">
        {goalItems.map((item, index) => {
          const Icon = item.icon;
          const percentage = getProgressPercentage(item.current, item.goal);
          const isComplete = percentage >= 100;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${isComplete ? 'bg-success-50 dark:bg-success-900/20' : 'bg-gray-50 dark:bg-slate-800'}`}>
                <Icon className={`w-5 h-5 ${isComplete ? 'text-success-600' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    {item.current}/{item.goal}{item.unit}
                  </p>
                </div>
                <ProgressBar progress={percentage} size="sm" color={item.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyGoals;
