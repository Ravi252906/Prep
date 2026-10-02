import React from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FileText, Clock, Target, TrendingUp, Play } from 'lucide-react';

const MockTests = () => {
  const mockTests = [
    {
      id: 1,
      name: 'Full Length Mock Test #12',
      date: '2024-10-01',
      duration: '3 hours',
      questions: 65,
      score: 78,
      status: 'completed',
      rank: 145,
    },
    {
      id: 2,
      name: 'Full Length Mock Test #13',
      date: '2024-10-07',
      duration: '3 hours',
      questions: 65,
      score: null,
      status: 'upcoming',
      rank: null,
    },
    {
      id: 3,
      name: 'Subject-wise Test: DSA',
      date: '2024-10-03',
      duration: '1 hour',
      questions: 25,
      score: 85,
      status: 'completed',
      rank: 89,
    },
    {
      id: 4,
      name: 'Subject-wise Test: DBMS',
      date: '2024-10-05',
      duration: '1 hour',
      questions: 25,
      score: null,
      status: 'upcoming',
      rank: null,
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mock Tests</h1>
          <p className="text-gray-500 mt-1">Simulate the real GATE exam experience</p>
        </div>
        <Button variant="primary" icon={Play} size="md">
          Create Custom Test
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Tests Taken</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">76.5</p>
              <p className="text-sm text-gray-500">Avg Score</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">+8.2</p>
              <p className="text-sm text-gray-500">Improvement</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">36h</p>
              <p className="text-sm text-gray-500">Total Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Tests List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTests.map((test) => (
            <div key={test.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{test.name}</h3>
                    <Badge
                      variant={test.status === 'completed' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {test.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {test.duration}
                    </span>
                    <span>{test.questions} questions</span>
                    <span>{test.date}</span>
                  </div>
                </div>
              </div>

              {test.status === 'completed' ? (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Score</p>
                    <p className="text-2xl font-bold text-primary-600">{test.score}/100</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rank</p>
                    <p className="text-2xl font-bold text-gray-900">#{test.rank}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    View Analysis
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="primary" size="md" className="w-full" icon={Play}>
                    Start Test
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTests;
