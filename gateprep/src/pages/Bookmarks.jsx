import React, { useState } from 'react';
import { Search, Filter, Star, Trash2, ExternalLink } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { bookmarks, removeBookmark, searchBookmarks, getBookmarksByType } = useBookmarks();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', 'concept', 'formula', 'ai-response', 'question', 'topic', 'note'];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchQuery === '' ||
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.subject && bookmark.subject.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || bookmark.type === selectedType;

    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'concept': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'formula': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'ai-response': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'question': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'topic': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      case 'note': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const handleNavigate = (url) => {
    if (url.startsWith('/')) {
      navigate(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Smart Bookmarks
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Your saved concepts, formulas, and resources
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(bookmark.type)}`}>
                    {bookmark.type.replace('-', ' ')}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-2">
                    {bookmark.title}
                  </h3>
                  {bookmark.subject && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{bookmark.subject}</p>
                  )}
                </div>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {bookmark.topic && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{bookmark.topic}</p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleNavigate(bookmark.url)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No bookmarks yet. Start bookmarking useful content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
