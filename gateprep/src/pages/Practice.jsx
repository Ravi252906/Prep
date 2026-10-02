import React from 'react';
import { questions } from '../data/questions';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { BookOpen, Filter, Play, Clock } from 'lucide-react';

const Practice = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice Questions</h1>
          <p className="text-gray-500 mt-1">Test your knowledge with topic-wise questions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Filter} size="md">
            Filter by Subject
          </Button>
          <Button variant="primary" icon={Play} size="md">
            Start Random Quiz
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">847</p>
              <p className="text-sm text-gray-500">Questions Solved</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">42h</p>
              <p className="text-sm text-gray-500">Time Spent</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <Play className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-500">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Questions</h2>
        <div className="space-y-3">
          {questions.map((question) => (
            <div
              key={question.id}
              className={`card p-5 hover:shadow-md transition-shadow cursor-pointer ${
                question.solved ? 'border-l-4 border-l-success-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="primary" size="sm">{question.subject}</Badge>
                    <Badge variant="neutral" size="sm" className="bg-gray-100 text-gray-700">
                      {question.topic}
                    </Badge>
                    <Badge
                      variant={question.difficulty === 'Easy' ? 'success' : question.difficulty === 'Medium' ? 'warning' : 'error'}
                      size="sm"
                    >
                      {question.difficulty}
                    </Badge>
                    {question.solved && (
                      <Badge variant="success" size="sm">Solved</Badge>
                    )}
                  </div>
                  <p className="text-gray-900 font-medium mb-2">{question.question}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Attempts: {question.attempts}</span>
                    {question.solved && (
                      <span className="text-success-600">✓ Correct on first try</span>
                    )}
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  {question.solved ? 'Review' : 'Solve'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;
