import React, { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import AIChat from './AIChat';
import { useAI } from '../../context/AIContext';
import { initializeBrowserAI } from '../../services/browserAI';

const AIAssistant = () => {
  const { browserAIAvailable, setBrowserAIAvailable, browserAILoading, setBrowserAILoading } = useAI();
  const [initAttempted, setInitAttempted] = useState(false);

  useEffect(() => {
    const initBrowserAI = async () => {
      if (!initAttempted) {
        setInitAttempted(true);
        setBrowserAILoading(true);

        const result = await initializeBrowserAI();
        setBrowserAIAvailable(result.available);
        setBrowserAILoading(false);
      }
    };

    initBrowserAI();
  }, [initAttempted, setBrowserAIAvailable, setBrowserAILoading]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                GATEPrep AI Study Copilot
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your intelligent GATE preparation assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {browserAILoading
                ? 'Initializing Browser AI...'
                : browserAIAvailable
                ? 'Browser AI is active and ready to help'
                : 'Smart Study Mode is active (Browser AI unavailable on this device)'}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <AIChat />
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
