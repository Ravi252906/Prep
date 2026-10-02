import React from 'react';

const SectionTabs = ({ sections, activeSection, onSectionChange, sectionProgress }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {sections.map((section, index) => {
        const progress = sectionProgress?.[index] || { answered: 0, total: section.questions };
        const percentage = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;

        return (
          <button
            key={index}
            onClick={() => onSectionChange(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all ${
              activeSection === index
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-medium mb-1">{section.name}</div>
            <div className="text-xs text-gray-500">
              {progress.answered}/{progress.total} answered
            </div>
            {activeSection === index && (
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SectionTabs;
