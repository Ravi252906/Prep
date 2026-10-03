import React from 'react';
import { assistantKnowledgeData } from '../../data/assistantKnowledge';

const AIQuickActions = ({ onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Suggested Prompts</h3>
      <div className="flex flex-wrap gap-2">
        {assistantKnowledgeData.suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
            className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIQuickActions;
