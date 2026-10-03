import React from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, AlertCircle, CheckCircle, Clock, BookOpen, Target, Sparkles, BarChart3 } from 'lucide-react';

const TopicIntelligence = () => {
  const { topicId } = useParams();

  const topicData = {
    id: topicId,
    name: 'Normalization',
    subject: 'DBMS',
    progress: 72,
    accuracy: 68,
    questionsAttempted: 45,
    pyqsCompleted: 32,
    revisionLevel: 3,
    lastRevision: '2024-01-15',
    nextRevision: '2024-01-22',
    difficulty: 'medium',
    mistakes: 8,
    bookmarks: 3,
    relatedConcepts: ['Functional Dependencies', 'BCNF', 'Database Design'],
  };

  const nextAction = {
    type: 'practice',
    title: 'Practice More Questions',
    reason: 'Accuracy is below 75%. Practice 10 more questions to improve.',
    estimatedTime: '30 minutes',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{topicData.subject}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {topicData.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Topic Intelligence Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{topicData.progress}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Topic completion</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{topicData.accuracy}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{topicData.questionsAttempted} questions</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">PYQs</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{topicData.pyqsCompleted}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completed</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Revision</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">Level {topicData.revisionLevel}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Spaced repetition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Revision Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Last Revision</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(topicData.lastRevision).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Next Revision</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(topicData.nextRevision).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Due Soon</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Mistakes Analysis
            </h3>
            <div className="text-center py-6">
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">{topicData.mistakes}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Mistakes recorded</p>
              <button className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors">
                View in Mistake Book
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Related Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {topicData.relatedConcepts.map((concept, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Bookmarks & Resources
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-700 dark:text-slate-300">{topicData.bookmarks} bookmarks</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Recommended Next Action
            </h3>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">{nextAction.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{nextAction.reason}</p>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {nextAction.estimatedTime}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                {nextAction.type === 'practice' ? 'Start Practice' : 'Begin Revision'}
              </button>
              <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                Ask AI
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">Explain with AI</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">AI Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicIntelligence;
