import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { weightageData } from '../data/weightage';

const Weightage = () => {
  const data = weightageData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Historical Weightage Analysis
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Subject and topic frequency from past GATE exams
          </p>
        </div>

        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              {data.disclaimer}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Subject-wise Weightage
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.subjectWeightage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="totalMarks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Year-wise Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.years.map(year => ({
                year,
                ...data.subjectWeightage.reduce((acc, subject) => {
                  acc[subject.subject] = subject.yearBreakdown.find(y => y.year === year)?.marks || 0;
                  return acc;
                }, {})
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                {data.subjectWeightage.slice(0, 3).map((subject, index) => (
                  <Line
                    key={subject.subject}
                    type="monotone"
                    dataKey={subject.subject}
                    stroke={['#3b82f6', '#10b981', '#f59e0b'][index]}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {data.topicWeightage.map((subjectData) => (
            <div key={subjectData.subject} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {subjectData.subject}
              </h3>
              <div className="space-y-3">
                {subjectData.topics.map((topic) => (
                  <div key={topic.topic} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{topic.topic}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Frequency: {topic.frequency} | Avg Marks: {topic.averageMarks}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        topic.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        topic.difficulty === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {topic.difficulty}
                      </span>
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Difficulty Distribution</h4>
            <div className="space-y-2">
              {Object.entries(data.difficultyDistribution).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 capitalize">{key}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{value.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Question Types</h4>
            <div className="space-y-2">
              {Object.entries(data.questionTypeDistribution).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 uppercase">{key}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{value.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Historical weightage is for reference only. It does not guarantee future exam patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weightage;
