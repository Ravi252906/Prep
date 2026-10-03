import React from 'react';
import { BookOpen, Clock, Target, TrendingUp, AlertCircle } from 'lucide-react';

const AIStudyRecommendation = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          What Should You Study Now?
        </h3>
      </div>

      <div className="space-y-4">
        {recommendation.priority && (
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Priority Focus</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{recommendation.priority}</p>
            </div>
          </div>
        )}

        {recommendation.subject && (
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Subject</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{recommendation.subject}</p>
            </div>
          </div>
        )}

        {recommendation.topic && (
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Topic</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{recommendation.topic}</p>
            </div>
          </div>
        )}

        {recommendation.estimatedTime && (
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Estimated Time</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{recommendation.estimatedTime}</p>
            </div>
          </div>
        )}

        {recommendation.reason && (
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Why This Recommendation?</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{recommendation.reason}</p>
            </div>
          </div>
        )}

        {recommendation.actions && recommendation.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {recommendation.actions.map((action, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudyRecommendation;
