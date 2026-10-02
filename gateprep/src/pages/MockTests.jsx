import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import MockTestCard from '../components/mock/MockTestCard';
import TestStats from '../components/mock/TestStats';
import { mockTests } from '../data/mockTests';
import { Play, Filter } from 'lucide-react';

const MockTests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    totalTests: mockTests.length,
    attemptedTests: 0,
    averageScore: 0,
    bestScore: 0,
    accuracy: 0,
    totalTime: 0
  });

  useEffect(() => {
    // Calculate stats from mockTests data
    const attempted = mockTests.filter(t => t.attemptStatus === 'completed');
    const completedTests = attempted;
    
    const avgScore = completedTests.length > 0
      ? Math.round(completedTests.reduce((sum, t) => sum + (t.bestScore || 0), 0) / completedTests.length)
      : 0;
    
    const bestScore = completedTests.length > 0
      ? Math.max(...completedTests.map(t => t.bestScore || 0))
      : 0;
    
    // Mock accuracy calculation
    const accuracy = completedTests.length > 0 ? Math.round(avgScore * 0.75) : 0;
    
    // Mock total time (assuming 3 hours per completed test)
    const totalTime = completedTests.length * 3;

    setStats({
      totalTests: mockTests.length,
      attemptedTests: completedTests.length,
      averageScore: avgScore,
      bestScore,
      accuracy,
      totalTime
    });
  }, []);

  const filteredTests = mockTests.filter(test => {
    switch (filter) {
      case 'full-length':
        return test.type === 'full-length';
      case 'mini':
        return test.type === 'mini';
      case 'subject':
        return test.type === 'subject';
      case 'completed':
        return test.attemptStatus === 'completed';
      case 'not-attempted':
        return test.attemptStatus === 'not-attempted';
      default:
        return true;
    }
  });

  const handleStartTest = (testId) => {
    navigate(`/mock-tests/${testId}/instructions`);
  };

  const handleViewAnalysis = (testId) => {
    navigate(`/mock-tests/${testId}/result`);
  };

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
      <TestStats stats={stats} />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Tests
        </Button>
        <Button
          variant={filter === 'full-length' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('full-length')}
        >
          Full Length
        </Button>
        <Button
          variant={filter === 'mini' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('mini')}
        >
          Mini Tests
        </Button>
        <Button
          variant={filter === 'subject' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('subject')}
        >
          Subject-wise
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'not-attempted' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('not-attempted')}
        >
          Not Attempted
        </Button>
      </div>

      {/* Test Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {filter === 'all' ? 'All Tests' : filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')} 
          <span className="text-gray-400 font-normal ml-2">({filteredTests.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((test) => (
            <MockTestCard
              key={test.id}
              test={test}
              onStartTest={handleStartTest}
              onViewAnalysis={handleViewAnalysis}
            />
          ))}
        </div>
      </div>

      {filteredTests.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-500">No tests found matching the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default MockTests;
