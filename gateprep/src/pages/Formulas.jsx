import React, { useState, useEffect } from 'react';
import { Search, Filter, Copy, Star, Sparkles } from 'lucide-react';
import { formulasData, getFormulasBySubject, searchFormulas } from '../data/formulas';
import { useBookmarks } from '../context/BookmarkContext';

const Formulas = () => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('gateprep_formula_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  const subjects = ['All', 'DBMS', 'Operating Systems', 'Algorithms', 'Computer Networks', 'Computer Organization', 'Discrete Mathematics'];
  const topics = ['All', 'Cache Memory', 'Pipelining', 'CPU Scheduling', 'Query Optimization', 'Performance Metrics', 'Complexity Analysis', 'Combinatorics'];

  const filteredFormulas = formulasData.filter(formula => {
    const matchesSearch = searchQuery === '' ||
      formula.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.formula.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubject === 'All' || formula.subject === selectedSubject;
    const matchesTopic = selectedTopic === 'All' || formula.topic === selectedTopic;

    return matchesSearch && matchesSubject && matchesTopic;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleToggleFavorite = (formulaId) => {
    const newFavorites = favorites.includes(formulaId)
      ? favorites.filter(id => id !== formulaId)
      : [...favorites, formulaId];

    setFavorites(newFavorites);
    localStorage.setItem('gateprep_formula_favorites', JSON.stringify(newFavorites));
  };

  const handleBookmark = (formula) => {
    if (isBookmarked(`/formulas#${formula.id}`)) {
      removeBookmark(`/formulas#${formula.id}`);
    } else {
      addBookmark({
        type: 'formula',
        title: formula.topic,
        subject: formula.subject,
        topic: formula.topic,
        url: `/formulas#${formula.id}`,
        data: { formulaId: formula.id },
      });
    }
  };

  const getWeightageColor = (weightage) => {
    switch (weightage) {
      case 'very-high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Formula Book
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Important GATE formulas with explanations and examples
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Filters:</span>
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            <button
              onClick={() => setSelectedTopic('All')}
              className="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFormulas.map((formula) => (
            <div
              key={formula.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{formula.subject}</span>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {formula.topic}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggleFavorite(formula.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(formula.id)
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBookmark(formula)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked(`/formulas#${formula.id}`)
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
                <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  {formula.formula}
                </code>
              </div>

              <div className="space-y-2 mb-3">
                {Object.entries(formula.variables).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getWeightageColor(formula.gateWeightage)}`}>
                  {formula.gateWeightage.replace('-', ' ')} weightage
                </span>
                <button
                  onClick={() => handleCopy(formula.formula)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFormulas.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No formulas found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulas;
