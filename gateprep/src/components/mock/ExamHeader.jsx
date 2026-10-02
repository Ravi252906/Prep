import React from 'react';
import { Menu, X } from 'lucide-react';

const ExamHeader = ({ testName, currentQuestion, totalQuestions, onToggleSidebar, sidebarOpen }) => {
  return (
    <div className="bg-navy-900 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-navy-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div>
          <h1 className="font-semibold text-lg">{testName}</h1>
          <p className="text-sm text-navy-300">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
      </div>
      <div className="hidden sm:block">
        <span className="text-sm text-navy-300">GATE CS 2025 Pattern</span>
      </div>
    </div>
  );
};

export default ExamHeader;
