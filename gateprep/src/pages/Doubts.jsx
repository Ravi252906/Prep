import React, { useState } from 'react';
import { Plus, Search, CheckCircle, XCircle, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { useDoubts } from '../context/DoubtContext';
import { subjectsData } from '../data/subjects';

const Doubts = () => {
  const { doubts, addDoubt, updateDoubt, deleteDoubt, resolveDoubt, reopenDoubt, getDoubtsByStatus } = useDoubts();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newDoubt, setNewDoubt] = useState({
    title: '',
    subject: 'DBMS',
    topic: '',
    question: '',
    notes: '',
    priority: 'medium',
  });

  const subjects = subjectsData.map(s => s.name);
  const priorities = ['low', 'medium', 'high'];

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = searchQuery === '' ||
      doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.question.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || doubt.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDoubt.title) return;

    addDoubt(newDoubt);
    setShowForm(false);
    setNewDoubt({
      title: '',
      subject: 'DBMS',
      topic: '',
      question: '',
      notes: '',
      priority: 'medium',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Doubt Notebook
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Track and resolve your conceptual doubts
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Doubt
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Add New Doubt
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newDoubt.title}
                    onChange={(e) => setNewDoubt({ ...newDoubt, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's your doubt?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <select
                    value={newDoubt.subject}
                    onChange={(e) => setNewDoubt({ ...newDoubt, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newDoubt.topic}
                    onChange={(e) => setNewDoubt({ ...newDoubt, topic: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Related topic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={newDoubt.priority}
                    onChange={(e) => setNewDoubt({ ...newDoubt, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Question
                </label>
                <textarea
                  value={newDoubt.question}
                  onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your doubt in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newDoubt.notes}
                  onChange={(e) => setNewDoubt({ ...newDoubt, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Doubt
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {doubt.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{doubt.subject}</p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(doubt.status)}`}>
                  {doubt.status}
                </span>
              </div>

              {doubt.topic && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{doubt.topic}</p>
              )}

              <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 mb-3">
                {doubt.question}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(doubt.priority)}`}>
                  {doubt.priority}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(doubt.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                {doubt.status === 'open' ? (
                  <button
                    onClick={() => resolveDoubt(doubt.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Resolve
                  </button>
                ) : (
                  <button
                    onClick={() => reopenDoubt(doubt.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reopen
                  </button>
                )}
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Ask AI
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoubts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No doubts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doubts;
