import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, RefreshCw, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';
import AIReport from '../components/ai/AIReport';
import { useAnalytics } from '../context/AnalyticsContext';
import { generateSmartPerformanceReport } from '../services/smartStudyEngine';
import { useAI } from '../context/AIContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AIReportPage = () => {
  const { analyticsData } = useAnalytics();
  const { browserAIAvailable } = useAI();
  const [report, setReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    setIsGenerating(true);

    const mockAnalytics = {
      strongSubjects: ['DBMS', 'Discrete Mathematics'],
      weakSubjects: ['Algorithms', 'Operating Systems'],
      practiceAccuracy: 68,
      mockScores: [65, 68, 72, 70, 75],
      studyConsistency: 70,
    };

    const result = generateSmartPerformanceReport(mockAnalytics);
    setReport(result);

    setIsGenerating(false);
  };

  const subjectData = [
    { subject: 'DBMS', accuracy: 72, progress: 75 },
    { subject: 'OS', accuracy: 65, progress: 60 },
    { subject: 'Algorithms', accuracy: 62, progress: 55 },
    { subject: 'CN', accuracy: 68, progress: 65 },
    { subject: 'COA', accuracy: 70, progress: 70 },
    { subject: 'Discrete', accuracy: 72, progress: 68 },
  ];

  const accuracyTrend = [
    { month: 'Jan', accuracy: 60 },
    { month: 'Feb', accuracy: 62 },
    { month: 'Mar', accuracy: 65 },
    { month: 'Apr', accuracy: 64 },
    { month: 'May', accuracy: 68 },
    { month: 'Jun', accuracy: 70 },
  ];

  const difficultyDistribution = [
    { name: 'Easy', value: 35, color: '#10b981' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Hard', value: 20, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              AI Performance Report
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Comprehensive analysis of your GATE preparation
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Overall Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">68%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+8% from last month</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Strong Subjects</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">2</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">DBMS, Discrete Math</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Weak Subjects</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">2</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Algorithms, OS</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Study Consistency</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">70%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Good consistency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Subject-wise Accuracy
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Accuracy Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Difficulty Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {difficultyDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Recent Mock Performance
            </h3>
            <div className="space-y-3">
              {[65, 68, 72, 70, 75].map((score, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400 w-20">Mock {index + 1}</span>
                  <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 w-12">{score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isGenerating ? (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
              <span className="text-slate-600 dark:text-slate-400">Generating AI insights...</span>
            </div>
          </div>
        ) : (
          <AIReport report={report} />
        )}
      </div>
    </div>
  );
};

export default AIReportPage;
