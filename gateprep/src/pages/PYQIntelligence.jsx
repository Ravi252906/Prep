import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { pyqAnalyticsData } from '../data/pyqAnalytics';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const PYQIntelligence = () => {
  const data = pyqAnalyticsData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            PYQ Intelligence
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Analyze your Previous Year Question performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Total PYQs</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.totalPYQs}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Across all years</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Attempted</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.attemptedPYQs}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{data.completionPercentage}% complete</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.accuracy}%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Good performance</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Avg Time</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.averageTime}m</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Per question</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              PYQs by Year
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.byYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="attempted" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Subject Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.bySubject}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="attempted"
                >
                  {data.bySubject.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data.bySubject.map((subject, index) => (
                <div key={subject.subject} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{subject.subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Accuracy Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Difficulty Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.byDifficulty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="difficulty" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="attempted" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Subject-wise Analysis
          </h3>
          <div className="space-y-4">
            {data.bySubject.map((subject) => (
              <div key={subject.subject} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">{subject.subject}</h4>
                  <div className="flex gap-4 text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      {subject.attempted}/{subject.total} attempted
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {subject.accuracy}% accuracy
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {subject.topics.map((topic) => (
                    <div key={topic.topic} className="text-center p-2 bg-white dark:bg-slate-900 rounded">
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{topic.topic}</p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{topic.accuracy}%</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Strongest Topic</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {data.strongestTopic.subject} - {data.strongestTopic.topic} ({data.strongestTopic.accuracy}%)
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Weakest Topic</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {data.weakestTopic.subject} - {data.weakestTopic.topic} ({data.weakestTopic.accuracy}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PYQIntelligence;
