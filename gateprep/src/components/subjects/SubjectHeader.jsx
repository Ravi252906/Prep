import React from 'react';
import { Clock, BookOpen, TrendingUp, Play } from 'lucide-react';
import ProgressRing from './ProgressRing';
import Button from '../ui/Button';

const SubjectHeader = ({ subject, progress, completedTopics, totalTopics }) => {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-primary-200 uppercase tracking-wider">
              {subject.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
          <p className="text-primary-100 text-base mb-4">{subject.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-200" />
              <span className="text-sm text-primary-100">
                {completedTopics}/{totalTopics} topics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-200" />
              <span className="text-sm text-primary-100">
                Last studied {subject.lastStudied}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-200" />
              <span className="text-sm text-primary-100">
                {progress}% complete
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Progress ring and CTA */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="relative inline-block">
              <ProgressRing progress={progress} size={100} strokeWidth={8} color="#ffffff" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{progress}%</span>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            icon={Play}
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
