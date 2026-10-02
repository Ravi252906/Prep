import React from 'react';
import Button from '../ui/Button';
import { AlertTriangle, CheckCircle, XCircle, Bookmark } from 'lucide-react';

const SubmitTestModal = ({ isOpen, onClose, onSubmit, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-warning-100 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-warning-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Submit Test?</h2>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success-600" />
              <span className="text-sm text-gray-700">Answered</span>
            </div>
            <span className="font-semibold text-success-700">{stats.answered}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-error-50 rounded-lg">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-error-600" />
              <span className="text-sm text-gray-700">Not Answered</span>
            </div>
            <span className="font-semibold text-error-700">{stats.notAnswered}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">Marked for Review</span>
            </div>
            <span className="font-semibold text-purple-700">{stats.marked}</span>
          </div>
        </div>

        {/* Warning */}
        {stats.notAnswered > 0 && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-warning-700">
              You have {stats.notAnswered} unanswered question{stats.notAnswered > 1 ? 's' : ''}. 
              Are you sure you want to submit?
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            className="flex-1"
          >
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitTestModal;
