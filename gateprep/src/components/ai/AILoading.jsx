import React from 'react';
import { Loader2 } from 'lucide-react';

const AILoading = ({ message = 'Thinking...' }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
      <span className="text-sm text-slate-600 dark:text-slate-300">{message}</span>
    </div>
  );
};

export default AILoading;
