import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

const AIInput = ({ onSend, disabled, placeholder = 'Ask anything about GATE preparation...' }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50"
          disabled={disabled}
          title="Voice input (coming soon)"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Send className="w-5 h-5" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
};

export default AIInput;
