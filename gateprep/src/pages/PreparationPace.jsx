import React from 'react';
import { TrendingUp, Clock, Target, AlertCircle, Calendar, BarChart3 } from 'lucide-react';

const PreparationPace = () => {
  const syllabusCompletion = 65;
  const remainingTopics = 45;
  const topicsPerDay = 2;
  const questionsPerDay = 25;
  const pyqCompletion = 63;
  const revisionPace = 70;
  const mockCompletion = 40;
  const studyConsistency = 75;

  const daysUntilExam = 120;
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + Math.ceil(remainingTopics / topicsPerDay));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Preparation Pace
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track your study speed and progress
          </p>
        </div>

        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Completion dates are estimates based on current pace. Actual completion may vary based on effort and focus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Syllabus</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{syllabusCompletion}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{remainingTopics} topics left</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Topics/Day</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{topicsPerDay}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Current pace</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Questions/Day</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{questionsPerDay}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Practice volume</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Consistency</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{studyConsistency}%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Good</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Completion Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Syllabus Completion</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{syllabusCompletion}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${syllabusCompletion}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">PYQ Completion</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{pyqCompletion}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${pyqCompletion}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Revision Pace</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{revisionPace}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all"
                    style={{ width: `${revisionPace}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Mock Tests</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{mockCompletion}%</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all"
                    style={{ width: `${mockCompletion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Estimated Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Days Until Exam</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{daysUntilExam}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Est. Syllabus Completion</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    {estimatedCompletionDate.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Required Pace</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    {Math.ceil(remainingTopics / daysUntilExam)} topics/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Pace Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <p className="font-medium text-emerald-800 dark:text-emerald-300 mb-2">On Track</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                Your current pace is good. Maintain consistency to complete on time.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">Increase PYQ Practice</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Aim for 30+ PYQs per day to improve accuracy and speed.
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="font-medium text-amber-800 dark:text-amber-300 mb-2">Focus on Mock Tests</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Mock test completion is low. Take at least 2 mocks per week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationPace;
