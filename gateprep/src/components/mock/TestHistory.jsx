import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Calendar, Clock, Target, BarChart2, CheckCircle } from 'lucide-react';

const TestHistory = ({ history, onViewResult }) => {
  return (
    <div className="space-y-4">
      {history.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-500">No test history available yet.</p>
        </div>
      ) : (
        history.map((test) => (
          <div key={test.id} className="card p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {test.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {test.timeTaken}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {test.questions} Questions
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Score</p>
                <p className="text-xl font-bold text-primary-600">{test.score}/{test.totalMarks}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                <p className="text-xl font-bold text-success-600">{test.accuracy}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Correct</p>
                <p className="text-xl font-bold text-gray-900">{test.correct}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Percentile</p>
                <p className="text-xl font-bold text-purple-600">{test.percentile}%</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                icon={BarChart2}
                onClick={() => onViewResult(test.id)}
              >
                View Result
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TestHistory;
