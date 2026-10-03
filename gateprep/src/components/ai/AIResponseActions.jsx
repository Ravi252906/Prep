import React from 'react';
import { Copy, RefreshCw, Bookmark, BookOpen, Sparkles, MessageSquare } from 'lucide-react';

const AIResponseActions = ({ response, onCopy, onRegenerate, onSaveToNotes, onBookmark, onSimplify, onExplainInHinglish }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    onCopy?.();
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <Copy className="w-4 h-4" />
        Copy
      </button>
      <button
        onClick={onRegenerate}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Regenerate
      </button>
      <button
        onClick={onSimplify}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Simplify
      </button>
      <button
        onClick={onExplainInHinglish}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        Hinglish
      </button>
      <button
        onClick={onSaveToNotes}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        Save to Notes
      </button>
      <button
        onClick={onBookmark}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        <Bookmark className="w-4 h-4" />
        Bookmark
      </button>
    </div>
  );
};

export default AIResponseActions;
