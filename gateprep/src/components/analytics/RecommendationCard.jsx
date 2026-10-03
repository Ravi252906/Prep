import React from 'react';
import { Lightbulb, AlertTriangle, BookOpen, PenTool, FileText, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const RecommendationCard = ({ recommendation, onAction }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'weak_subject':
        return AlertTriangle;
      case 'revision':
        return RotateCcw;
      case 'mock_test':
        return CheckCircle;
      case 'incomplete_topic':
        return BookOpen;
      default:
        return Lightbulb;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-error-300 dark:border-error-700 bg-error-50 dark:bg-error-900/20';
      case 'medium':
        return 'border-warning-300 dark:border-warning-700 bg-warning-50 dark:bg-warning-900/20';
      default:
        return 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20';
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'practice':
        return 'Practice';
      case 'revise':
        return 'Revise';
      case 'mock_test':
        return 'Take Test';
      case 'learn':
        return 'Learn';
      default:
        return 'View';
    }
  };

  const Icon = getIcon(recommendation.type);
  const priorityColor = getPriorityColor(recommendation.priority);

  return (
    <div className={`card p-4 border-2 ${priorityColor}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
          <Icon className="w-5 h-5 text-gray-700 dark:text-slate-300" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">
            {recommendation.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
            {recommendation.description}
          </p>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            onClick={() => onAction?.(recommendation)}
          >
            {getActionLabel(recommendation.action)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
