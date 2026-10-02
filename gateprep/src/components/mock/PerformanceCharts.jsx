import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const PerformanceCharts = ({ performanceData }) => {
  const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Subject-wise performance data
  const subjectData = performanceData?.subjectWise || [
    { subject: 'Aptitude', score: 80, total: 100 },
    { subject: 'Math', score: 75, total: 100 },
    { subject: 'DSA', score: 85, total: 100 },
    { subject: 'DBMS', score: 70, total: 100 },
    { subject: 'OS', score: 65, total: 100 },
    { subject: 'CN', score: 72, total: 100 },
    { subject: 'COA', score: 68, total: 100 },
    { subject: 'DL', score: 78, total: 100 }
  ];

  // Difficulty-wise performance
  const difficultyData = performanceData?.difficultyWise || [
    { difficulty: 'Easy', correct: 15, total: 15 },
    { difficulty: 'Medium', correct: 20, total: 25 },
    { difficulty: 'Hard', correct: 8, total: 15 }
  ];

  // Accuracy distribution
  const accuracyData = performanceData?.accuracy || [
    { name: 'Correct', value: 43, color: '#22c55e' },
    { name: 'Incorrect', value: 12, color: '#ef4444' },
    { name: 'Unanswered', value: 10, color: '#f59e0b' }
  ];

  // Time per subject
  const timeData = performanceData?.timePerSubject || [
    { subject: 'Aptitude', time: 25 },
    { subject: 'Math', time: 35 },
    { subject: 'DSA', time: 40 },
    { subject: 'DBMS', time: 30 },
    { subject: 'OS', time: 28 },
    { subject: 'CN', time: 22 }
  ];

  return (
    <div className="space-y-6">
      {/* Subject-wise Performance */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#4f46e5" name="Score Obtained" />
            <Bar dataKey="total" fill="#e5e7eb" name="Total Marks" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty-wise Performance */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty-wise Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="correct" fill="#22c55e" name="Correct" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={accuracyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {accuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time per Subject */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Spent per Subject (minutes)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="time" stroke="#4f46e5" strokeWidth={2} name="Time (min)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceCharts;
