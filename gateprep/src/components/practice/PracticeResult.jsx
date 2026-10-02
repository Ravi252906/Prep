import React from 'react';
import { CheckCircle, XCircle, Clock, TrendingUp, RotateCcw, BookOpen, Home } from 'lucide-react';
import Button from '../ui/Button';

const PracticeResult = ({ results, onRetry, onReview, onBack }) => {
  const {
    score,
    accuracy,
    attempted,
    correct,
    incorrect,
    skipped,
    timeUsed,
    marksObtained,
    totalMarks,
    topicPerformance,
  } = results;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
          <p className="text-primary-100 mb-6">Here's how you performed</p>

          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-primary-100 mt-1">Score</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                {marksObtained}/{totalMarks}
              </div>
              <div className="text-primary-100 mt-1">Marks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{attempted}</p>
              <p className="text-sm text-gray-500">Attempted</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{correct}</p>
              <p className="text-sm text-gray-500">Correct</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-error-50 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-error-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{incorrect}</p>
              <p className="text-sm text-gray-500">Incorrect</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{skipped}</p>
              <p className="text-sm text-gray-500">Skipped</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{accuracy}%</p>
              <p className="text-sm text-gray-500">Accuracy</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatTime(timeUsed)}</p>
              <p className="text-sm text-gray-500">Time Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic-wise Performance */}
      {topicPerformance && topicPerformance.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Topic-wise Performance</h3>
          <div className="space-y-3">
            {topicPerformance.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{topic.name}</span>
                  <span className="font-medium text-gray-900">{topic.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      topic.percentage >= 80
                        ? 'bg-success-500'
                        : topic.percentage >= 60
                        ? 'bg-warning-500'
                        : 'bg-error-500'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" icon={RotateCcw} onClick={onRetry} className="flex-1">
          Retry
        </Button>
        <Button variant="secondary" icon={BookOpen} onClick={onReview} className="flex-1">
          Review Answers
        </Button>
        <Button variant="outline" icon={Home} onClick={onBack} className="flex-1">
          Back to Practice
        </Button>
      </div>
    </div>
  );
};

export default PracticeResult;
