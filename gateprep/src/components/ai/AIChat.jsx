import React, { useState, useRef, useEffect } from 'react';
import { Plus, MessageSquare, Trash2, Search } from 'lucide-react';
import AIMessage from './AIMessage';
import AIInput from './AIInput';
import AIQuickActions from './AIQuickActions';
import AILoading from './AILoading';
import AIError from './AIError';
import AIModeSelector from './AIModeSelector';
import AIResponseActions from './AIResponseActions';
import { useAI } from '../../context/AIContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { generateAIResponse } from '../../services/browserAI';
import { generateSmartResponse as smartEngineResponse } from '../../services/smartStudyEngine';

const AIChat = () => {
  const {
    browserAIAvailable,
    browserAILoading,
    aiMode,
    currentConversation,
    setCurrentConversation,
    createConversation,
    addMessage,
    chatHistory,
    deleteConversation,
    renameConversation,
    searchConversations,
  } = useAI();

  const { addBookmark } = useBookmarks();
  const [mode, setMode] = useState('explain');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = async (content) => {
    if (!currentConversation) {
      const newConv = createConversation('New Conversation');
      setCurrentConversation(newConv);
    }

    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    addMessage(currentConversation.id, userMessage);
    setIsLoading(true);
    setError(null);

    try {
      let response;

      if (browserAIAvailable && (aiMode === 'auto' || aiMode === 'browser-ai')) {
        const aiResult = await generateAIResponse(content, { mode });
        if (aiResult.success) {
          response = aiResult.response;
        } else {
          response = smartEngineResponse(content, { mode }).response;
        }
      } else {
        const smartResult = smartEngineResponse(content, { mode });
        response = smartResult.response;
      }

      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        source: browserAIAvailable ? 'browser-ai' : 'smart-study',
      };

      addMessage(currentConversation.id, aiMessage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleNewChat = () => {
    setCurrentConversation(null);
    setShowHistory(false);
  };

  const handleDeleteConversation = (id) => {
    deleteConversation(id);
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  };

  const handleCopy = () => {
  };

  const handleRegenerate = async () => {
    if (currentConversation && currentConversation.messages.length >= 2) {
      const lastUserMessage = currentConversation.messages[currentConversation.messages.length - 2];
      if (lastUserMessage.role === 'user') {
        await handleSendMessage(lastUserMessage.content);
      }
    }
  };

  const handleSaveToNotes = () => {
  };

  const handleBookmark = () => {
    if (currentConversation && currentConversation.messages.length > 0) {
      const lastAIMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastAIMessage.role === 'assistant') {
        addBookmark({
          type: 'ai-response',
          title: currentConversation.title,
          url: `/assistant`,
          data: { content: lastAIMessage.content },
        });
      }
    }
  };

  const handleSimplify = () => {
    if (currentConversation && currentConversation.messages.length > 0) {
      const lastAIMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastAIMessage.role === 'assistant') {
        handleSendMessage(`Simplify this explanation: ${lastAIMessage.content.substring(0, 200)}...`);
      }
    }
  };

  const handleExplainInHinglish = () => {
    if (currentConversation && currentConversation.messages.length > 0) {
      const lastAIMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastAIMessage.role === 'assistant') {
        handleSendMessage(`Explain this in Hinglish: ${lastAIMessage.content.substring(0, 200)}...`);
      }
    }
  };

  const filteredHistory = searchQuery
    ? searchConversations(searchQuery)
    : chatHistory;

  return (
    <div className="flex h-[calc(100vh-73px)]">
      <div className={`${showHistory ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredHistory.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setCurrentConversation(conv);
                  setShowHistory(false);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentConversation?.id === conv.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{conv.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conv.id);
                    }}
                    className="text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  AI Study Copilot
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  {browserAILoading ? (
                    <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      Loading Browser AI...
                    </span>
                  ) : browserAIAvailable ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Browser AI Active
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      Smart Study Mode
                    </span>
                  )}
                </div>
              </div>
            </div>
            <AIModeSelector currentMode={mode} onChange={setMode} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentConversation && (
            <div className="max-w-2xl mx-auto py-8">
              <AIQuickActions onSelect={handleQuickAction} />
            </div>
          )}

          {currentConversation && (
            <>
              {currentConversation.messages.map((message, index) => (
                <AIMessage
                  key={index}
                  message={message}
                  onCopy={handleCopy}
                  onRegenerate={handleRegenerate}
                  onSaveToNotes={handleSaveToNotes}
                  onBookmark={handleBookmark}
                />
              ))}

              {isLoading && <AILoading message="Thinking..." />}

              {error && (
                <AIError
                  message={error}
                  onRetry={() => {
                    const lastUserMessage = currentConversation.messages[currentConversation.messages.length - 1];
                    if (lastUserMessage.role === 'user') {
                      handleSendMessage(lastUserMessage.content);
                    }
                  }}
                />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <AIInput
            onSend={handleSendMessage}
            disabled={isLoading}
            placeholder="Ask anything about GATE preparation..."
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
