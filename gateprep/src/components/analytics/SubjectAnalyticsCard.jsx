import React from 'react';
import { BookOpen, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const SubjectAnalyticsCard = ({ 
  subject, 
  progress, 
  questionsAttempted, 
  correctAnswers, 
  accuracy, 
  pyqsCompleted, 
  studyTime,
  onClick 
}) => {
  const accuracyColor = accuracy >= 80 ? 'text-success-600' : accuracy >= 60 ? 'text-warning-600' : 'text-error-600';
  const accuracyBg = accuracy >= 80 ? 'bg-success-50 dark:bg-success-900/20' : accuracy >= 60 ? 'bg-warning-50 dark:bg-warning-900/20' : 'bg-error-50 dark:bg-error-900/20';

  return (
    <div 
      className={`card p-5 cursor-pointer transition-all hover:shadow-lg ${onClick ? 'hover:border-primary-300' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100">{subject}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {questionsAttempted} questions attempted
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${accuracyBg} ${accuracyColor}`}>
          {accuracy}% accuracy
        </div>
      </div>

      <ProgressBar progress={progress} className="mb-4" />

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-slate-400 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs">PYQs</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">{pyqsCompleted}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-slate-400 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Correct</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">{correctAnswers}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-slate-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Hours</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">{studyTime}h</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalyticsCard;
