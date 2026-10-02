import React from 'react';
import { useNavigate } from 'react-router-dom';
import { practiceQuestions } from '../data/practiceQuestions';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { BookOpen, Filter, Play, Clock, Zap, Target, Calendar, Shuffle } from 'lucide-react';
import { practiceModes } from '../data/practiceModes';

const Practice = () => {
  const navigate = useNavigate();

  const handleStartQuickPractice = () => {
    navigate('/practice/setup');
  };

  const handleModeSelect = (modeId) => {
    navigate('/practice/setup');
  };

  const totalQuestions = practiceQuestions.length;
  const subjects = [...new Set(practiceQuestions.map(q => q.subject))].length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice Questions</h1>
          <p className="text-gray-500 mt-1">Test your knowledge with topic-wise questions</p>
        </div>
        <Button variant="primary" icon={Play} size="md" onClick={handleStartQuickPractice}>
          Start Practice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
              <p className="text-sm text-gray-500">Total Questions</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{subjects}</p>
              <p className="text-sm text-gray-500">Subjects Covered</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <Play className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">48</p>
              <p className="text-sm text-gray-500">Topics Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Modes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice Modes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceModes.slice(0, 5).map((mode) => {
            const icons = {
              'Zap': Zap,
              'Target': Target,
              'Calendar': Calendar,
              'Shuffle': Shuffle,
              'TrendingDown': Play,
            };
            const Icon = icons[mode.icon] || Play;

            return (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className="card p-5 text-left hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary-50 p-2 rounded-lg group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GATE PYQ Section */}
      <div className="card p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">GATE Previous Year Questions</h3>
            <p className="text-primary-100">Practice actual GATE questions from 2017-2024</p>
          </div>
          <Button
            variant="secondary"
            icon={Calendar}
            onClick={() => handleModeSelect('gate-pyq')}
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            Start PYQ Practice
          </Button>
        </div>
      </div>

      {/* Quick Stats by Subject */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions by Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(
            practiceQuestions.reduce((acc, q) => {
              acc[q.subject] = (acc[q.subject] || 0) + 1;
              return acc;
            }, {})
          ).map(([subject, count]) => (
            <div key={subject} className="card p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{subject}</p>
                  <p className="text-sm text-gray-500">{count} questions</p>
                </div>
                <Badge variant="primary" size="sm">{count}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;
