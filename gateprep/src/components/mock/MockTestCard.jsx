import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import DifficultyBadge from '../subjects/DifficultyBadge';
import { Clock, FileText, Target, Play, BarChart2 } from 'lucide-react';

const MockTestCard = ({ test, onStartTest, onViewAnalysis }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'full-length':
        return 'bg-primary-100 text-primary-700';
      case 'mini':
        return 'bg-purple-100 text-purple-700';
      case 'subject':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'full-length':
        return 'Full Length';
      case 'mini':
        return 'Mini Test';
      case 'subject':
        return 'Subject-wise';
      default:
        return type;
    }
  };

  return (
    <div className="card p-5 hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="primary" size="sm" className={getTypeColor(test.type)}>
              {getTypeLabel(test.type)}
            </Badge>
            <DifficultyBadge difficulty={test.difficulty} />
            {test.attemptStatus === 'completed' && (
              <Badge variant="success" size="sm">Completed</Badge>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{test.name}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">{test.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{test.questions} Qs</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{test.duration} min</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{test.totalMarks} marks</span>
        </div>
      </div>

      {/* Sections */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Sections:</p>
        <div className="flex flex-wrap gap-1">
          {test.sections.map((section, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {section.name} ({section.questions})
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      {test.attemptStatus === 'completed' ? (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Best Score</p>
            <p className="text-xl font-bold text-primary-600">{test.bestScore}/{test.totalMarks}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Attempted</p>
            <p className="text-sm text-gray-700">{test.lastAttempted}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={BarChart2}
            onClick={() => onViewAnalysis(test.id)}
          >
            Analysis
          </Button>
        </div>
      ) : (
        <div className="pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            icon={Play}
            onClick={() => onStartTest(test.id)}
          >
            Start Test
          </Button>
        </div>
      )}
    </div>
  );
};

export default MockTestCard;
