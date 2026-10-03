import React from 'react';
import { assistantKnowledgeData } from '../../data/assistantKnowledge';

const AIModeSelector = ({ currentMode, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {assistantKnowledgeData.aiModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            currentMode === mode.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          title={mode.description}
        >
          {mode.name}
        </button>
      ))}
    </div>
  );
};

export default AIModeSelector;
