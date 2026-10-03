import React from 'react';
import { Target, TrendingUp, CheckCircle, Clock, Award, BookOpen } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const PreparationOverview = ({ analytics }) => {
  const { overallProgress, subjectPerformance } = analytics;

  // Calculate readiness indicators
  const syllabusCompletion = overallProgress.syllabusCompletion || 0;
  const practiceConsistency = overallProgress.currentStreak >= 7 ? 85 : overallProgress.currentStreak >= 3 ? 60 : 30;
  const mockTestConsistency = overallProgress.mockTestsCompleted >= 5 ? 80 : overallProgress.mockTestsCompleted >= 2 ? 50 : 20;
  const averageAccuracy = overallProgress.accuracy || 0;
  const studyConsistency = overallProgress.currentStreak >= 14 ? 90 : overallProgress.currentStreak >= 7 ? 70 : 40;

  const overallReadiness = Math.round(
    (syllabusCompletion * 0.3 +
    practiceConsistency * 0.2 +
    mockTestConsistency * 0.2 +
    averageAccuracy * 0.2 +
    studyConsistency * 0.1)
  );

  const getReadinessColor = (value) => {
    if (value >= 80) return 'text-success-600 dark:text-success-400';
    if (value >= 60) return 'text-warning-600 dark:text-warning-400';
    return 'text-error-600 dark:text-error-400';
  };

  const getReadinessLabel = (value) => {
    if (value >= 80) return 'Well Prepared';
    if (value >= 60) return 'On Track';
    if (value >= 40) return 'Needs Improvement';
    return 'Behind Schedule';
  };

  const indicators = [
    {
      label: 'Syllabus Completion',
      value: syllabusCompletion,
      icon: BookOpen,
      description: 'Topics covered across all subjects',
    },
    {
      label: 'Practice Consistency',
      value: practiceConsistency,
      icon: TrendingUp,
      description: 'Based on your study streak',
    },
    {
      label: 'Mock Test Consistency',
      value: mockTestConsistency,
      icon: CheckCircle,
      description: 'Mock tests completed regularly',
    },
    {
      label: 'Average Accuracy',
      value: averageAccuracy,
      icon: Target,
      description: 'Overall accuracy across all attempts',
    },
    {
      label: 'Study Consistency',
      value: studyConsistency,
      icon: Clock,
      description: 'Long-term study consistency',
    },
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Preparation Overview</h3>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-slate-400">Overall Readiness</p>
          <p className={`text-2xl font-bold ${getReadinessColor(overallReadiness)}`}>
            {overallReadiness}%
          </p>
          <p className={`text-sm font-medium ${getReadinessColor(overallReadiness)}`}>
            {getReadinessLabel(overallReadiness)}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <ProgressBar progress={overallReadiness} size="lg" color="primary" showLabel />
      </div>

      <div className="space-y-4">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800">
                <Icon className="w-5 h-5 text-gray-600 dark:text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                    {indicator.label}
                  </p>
                  <p className={`text-sm font-semibold ${getReadinessColor(indicator.value)}`}>
                    {indicator.value}%
                  </p>
                </div>
                <ProgressBar progress={indicator.value} size="sm" color="primary" />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  {indicator.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
              Internal Preparation Indicator
            </p>
            <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
              This is an internal preparation indicator based on your study data. 
              It does not predict actual GATE rank or results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationOverview;
