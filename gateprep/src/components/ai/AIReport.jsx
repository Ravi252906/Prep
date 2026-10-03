import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Target, BarChart3 } from 'lucide-react';

const AIReport = ({ report }) => {
  if (!report) return null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            What You're Doing Well
          </h3>
        </div>
        <ul className="space-y-2">
          {report.strengths?.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            What Needs Attention
          </h3>
        </div>
        <ul className="space-y-2">
          {report.weaknesses?.map((weakness, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
              {weakness}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            What Should You Study Next
          </h3>
        </div>
        <ul className="space-y-2">
          {report.nextSteps?.map((step, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 mt-1">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Suggested Weekly Focus
          </h3>
        </div>
        <ul className="space-y-2">
          {report.weeklyFocus?.map((focus, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
              {focus}
            </li>
          ))}
        </ul>
      </div>

      {report.recommendations && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Additional Recommendations
            </h3>
          </div>
          <ul className="space-y-2">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-slate-600 dark:text-slate-400 mt-1">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIReport;
