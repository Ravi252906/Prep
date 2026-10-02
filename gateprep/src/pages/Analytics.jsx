import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ChartCard from '../components/ChartCard';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

const Analytics = () => {
  const monthlyData = [
    { month: 'Jun', score: 65, rank: 250 },
    { month: 'Jul', score: 68, rank: 220 },
    { month: 'Aug', score: 72, rank: 190 },
    { month: 'Sep', score: 76, rank: 160 },
    { month: 'Oct', score: 78, rank: 145 },
  ];

  const subjectPerformance = [
    { name: 'DS', value: 85, color: '#4f46e5' },
    { name: 'Algo', value: 72, color: '#6366f1' },
    { name: 'DBMS', value: 68, color: '#818cf8' },
    { name: 'OS', value: 75, color: '#a5b4fc' },
    { name: 'CN', value: 62, color: '#c7d2fe' },
    { name: 'COA', value: 58, color: '#e0e7ff' },
  ];

  const weeklyStudyTime = [
    { week: 'W1', hours: 32 },
    { week: 'W2', hours: 38 },
    { week: 'W3', hours: 35 },
    { week: 'W4', hours: 42 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Track your performance and identify areas for improvement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <span className="text-sm text-gray-500">Current Score</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">78/100</p>
          <p className="text-sm text-success-600 mt-1">+12 from last month</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm text-gray-500">Target Score</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">85/100</p>
          <p className="text-sm text-gray-500 mt-1">7 points to go</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <TrendingDown className="w-5 h-5 text-warning-600" />
            </div>
            <span className="text-sm text-gray-500">Current Rank</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">#145</p>
          <p className="text-sm text-success-600 mt-1">+105 from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Progress */}
        <ChartCard title="Score Progress (Last 5 Months)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Subject Performance */}
        <ChartCard title="Subject-wise Performance">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={subjectPerformance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {subjectPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {subjectPerformance.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Weekly Study Time */}
        <ChartCard title="Weekly Study Time (Hours)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyStudyTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="hours"
                fill="url(#gradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Rank Progress */}
        <ChartCard title="Rank Progress (Lower is Better)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="rank"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analytics;
