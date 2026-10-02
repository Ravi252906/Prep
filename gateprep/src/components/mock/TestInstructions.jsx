import React, { useState } from 'react';
import Button from '../ui/Button';
import { Clock, FileText, AlertCircle, CheckCircle, Info, Target } from 'lucide-react';

const TestInstructions = ({ test, onStart, onCancel }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{test.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {test.questions} Questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {test.duration} Minutes
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {test.totalMarks} Marks
            </span>
          </div>
        </div>

        {/* General Instructions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            General Instructions
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
              <span>The test timer will start as soon as you click "Start Test". The timer cannot be paused.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
              <span>Navigate between questions using the question palette or Previous/Next buttons.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
              <span>You can mark questions for review and come back to them later.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
              <span>Make sure to submit your test before the timer expires. Auto-submit will occur at time expiry.</span>
            </li>
          </ul>
        </div>

        {/* Marking Scheme */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Marking Scheme
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">MCQ (1 Mark)</span>
              <span className="font-medium text-gray-900">+1 for correct, -0.33 for incorrect</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MCQ (2 Marks)</span>
              <span className="font-medium text-gray-900">+2 for correct, -0.66 for incorrect</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MSQ (Multiple Select)</span>
              <span className="font-medium text-gray-900">Full marks if all correct, no negative marking</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NAT (Numerical Answer Type)</span>
              <span className="font-medium text-gray-900">Full marks if correct, no negative marking</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Test Sections
          </h2>
          <div className="space-y-2">
            {test.sections.map((section, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                <span className="text-sm text-gray-600">{section.questions} Questions ({section.marks} Marks)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning-800 mb-1">Important Note</h3>
              <p className="text-sm text-warning-700">
                Once you start the test, you cannot refresh the page or navigate away without losing your progress.
                Ensure you have a stable internet connection and sufficient time before starting.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600">
              I have read and understood all the instructions. I am ready to start the test.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onStart}
            disabled={!agreed}
            className="flex-1"
          >
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;
