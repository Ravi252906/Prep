import React from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { StickyNote, Calendar, Search, Plus, BookOpen, Star } from 'lucide-react';

const Notes = () => {
  const notes = [
    {
      id: 1,
      title: 'DBMS Normalization',
      subject: 'DBMS',
      excerpt: 'Understanding 1NF, 2NF, 3NF, and BCNF with examples...',
      date: '2024-09-28',
      isPinned: true,
    },
    {
      id: 2,
      title: 'Binary Search Trees',
      subject: 'Data Structures',
      excerpt: 'BST operations, time complexity, and balancing techniques...',
      date: '2024-09-25',
      isPinned: false,
    },
    {
      id: 3,
      title: 'Process Scheduling Algorithms',
      subject: 'Operating Systems',
      excerpt: 'FCFS, SJF, Round Robin, and Priority scheduling comparison...',
      date: '2024-09-22',
      isPinned: true,
    },
    {
      id: 4,
      title: 'Dynamic Programming Patterns',
      subject: 'Algorithms',
      excerpt: 'Common DP patterns: knapsack, LCS, matrix chain multiplication...',
      date: '2024-09-20',
      isPinned: false,
    },
    {
      id: 5,
      title: 'TCP/IP Protocol Suite',
      subject: 'Computer Networks',
      excerpt: 'OSI model layers, TCP vs UDP, and handshake mechanisms...',
      date: '2024-09-18',
      isPinned: false,
    },
    {
      id: 6,
      title: 'Pipelining in Computer Architecture',
      subject: 'COA',
      excerpt: 'Pipeline stages, hazards, and performance improvements...',
      date: '2024-09-15',
      isPinned: false,
    },
  ];

  const subjectColors = {
    'DBMS': 'bg-blue-50 text-blue-700',
    'Data Structures': 'bg-purple-50 text-purple-700',
    'Operating Systems': 'bg-green-50 text-green-700',
    'Algorithms': 'bg-orange-50 text-orange-700',
    'Computer Networks': 'bg-pink-50 text-pink-700',
    'COA': 'bg-indigo-50 text-indigo-700',
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-500 mt-1">Access and organize your study notes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            />
          </div>
          <Button variant="primary" icon={Plus} size="md">
            New Note
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <StickyNote className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
              <p className="text-sm text-gray-500">Total Notes</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-warning-50 p-2 rounded-lg">
              <Star className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{notes.filter(n => n.isPinned).length}</p>
              <p className="text-sm text-gray-500">Pinned Notes</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-gray-500">Subjects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="card card-hover p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge
                  variant="neutral"
                  size="sm"
                  className={subjectColors[note.subject] || 'bg-gray-100 text-gray-700'}
                >
                  {note.subject}
                </Badge>
                {note.isPinned && (
                  <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-primary-600 transition-colors">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{note.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
