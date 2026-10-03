import React from 'react';
import { CheckCircle, Circle, ArrowRight, Target, BookOpen, FileText, TrendingUp, Award } from 'lucide-react';
import { subjectsData } from '../data/subjects';

const Roadmap = () => {
  const stages = [
    { id: 'learn', name: 'Learn', icon: BookOpen, description: 'Understand concepts' },
    { id: 'practice', name: 'Practice', icon: FileText, description: 'Solve questions' },
    { id: 'pyq', name: 'PYQ', icon: Target, description: 'Previous year questions' },
    { id: 'revise', name: 'Revise', icon: TrendingUp, description: 'Spaced revision' },
    { id: 'mock', name: 'Mock', icon: Award, description: 'Full tests' },
  ];

  const getStageProgress = (subject, stage) => {
    const progress = Math.random() * 100;
    return Math.floor(progress);
  };

  const getStageStatus = (progress) => {
    if (progress === 0) return 'not-started';
    if (progress < 100) return 'in-progress';
    return 'completed';
  };

  const getStageColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 dark:text-emerald-400';
      case 'in-progress': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-slate-400 dark:text-slate-600';
    }
  };

  const getStageBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/30';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            GATE Preparation Roadmap
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track your journey from foundation to final preparation
          </p>
        </div>

        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Your Learning Journey</h2>
          <p className="text-blue-100">
            Follow this structured path to maximize your GATE preparation efficiency
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Preparation Stages
          </h3>
          <div className="flex flex-wrap gap-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="flex items-center">
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${getStageBgColor('in-progress')}`}>
                    <Icon className={`w-6 h-6 ${getStageColor('in-progress')}`} />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{stage.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{stage.description}</p>
                    </div>
                  </div>
                  {index < stages.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-slate-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {subjectsData.map((subject) => (
            <div key={subject.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {subject.topics.length} topics
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(Math.random() * 30 + 40)}%
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</p>
                </div>
              </div>

              <div className="space-y-3">
                {stages.map((stage) => {
                  const Icon = stage.icon;
                  const progress = getStageProgress(subject.name, stage.id);
                  const status = getStageStatus(progress);

                  return (
                    <div key={stage.id} className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStageBgColor(status)}`}>
                        <Icon className={`w-5 h-5 ${getStageColor(status)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {stage.name}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              status === 'completed' ? 'bg-emerald-500' :
                              status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-400'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Tips for Following the Roadmap
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Complete each stage before moving to the next</li>
                <li>• Don't skip PYQs - they're crucial for understanding exam patterns</li>
                <li>• Regular mock tests help identify weak areas</li>
                <li>• Revision should be ongoing, not just at the end</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
