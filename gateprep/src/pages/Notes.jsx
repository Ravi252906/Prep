import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    subject: '',
    topic: '',
    content: '',
    tags: [],
    isPinned: false,
  });

  const subjects = ['DBMS', 'Operating Systems', 'Data Structures', 'Algorithms', 'Computer Networks', 'Digital Logic', 'Computer Organization', 'Theory of Computation', 'Compiler Design', 'General Aptitude'];

  // Load notes from LocalStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('gateprep_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  // Save notes to LocalStorage
  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem('gateprep_notes', JSON.stringify(updatedNotes));
  };

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note = {
      id: Date.now(),
      ...newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveNotes([...notes, note]);
    setNewNote({
      title: '',
      subject: '',
      topic: '',
      content: '',
      tags: [],
      isPinned: false,
    });
    setShowCreateModal(false);
  };

  const handleUpdateNote = () => {
    if (!editingNote) return;

    const updatedNotes = notes.map(note =>
      note.id === editingNote.id
        ? { ...note, ...newNote, updatedAt: new Date().toISOString() }
        : note
    );

    saveNotes(updatedNotes);
    setEditingNote(null);
    setNewNote({
      title: '',
      subject: '',
      topic: '',
      content: '',
      tags: [],
      isPinned: false,
    });
  };

  const handleDeleteNote = (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      saveNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleTogglePin = (noteId) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    );
    saveNotes(updatedNotes);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      subject: note.subject,
      topic: note.topic || '',
      content: note.content,
      tags: note.tags || [],
      isPinned: note.isPinned,
    });
    setShowCreateModal(true);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const otherNotes = filteredNotes.filter(note => !note.isPinned);

  const subjectColors = {
    'DBMS': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Operating Systems': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Data Structures': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Algorithms': 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Computer Networks': 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'Digital Logic': 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    'Computer Organization': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Theory of Computation': 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    'Compiler Design': 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    'General Aptitude': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Notes
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Create and manage your revision notes
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 sm:w-64"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setEditingNote(null);
            setNewNote({
              title: '',
              subject: '',
              topic: '',
              content: '',
              tags: [],
              isPinned: false,
            });
            setShowCreateModal(true);
          }}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Note
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <Icons.StickyNote className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {notes.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total Notes
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
              <Icons.Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {notes.filter(n => n.isPinned).length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pinned Notes
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
              <Icons.BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {new Set(notes.map(n => n.subject)).size}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Subjects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div>
        {pinnedNotes.length > 0 && (
          <>
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Pinned Notes
            </h2>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  subjectColors={subjectColors}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={handleTogglePin}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </>
        )}

        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {pinnedNotes.length > 0 ? 'Other Notes' : 'All Notes'}
        </h2>
        {otherNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                subjectColors={subjectColors}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
            <Icons.StickyNote className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              No notes found
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Create your first note to get started
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingNote(null);
                  setNewNote({
                    title: '',
                    subject: '',
                    topic: '',
                    content: '',
                    tags: [],
                    isPinned: false,
                  });
                }}
                className="rounded-lg p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Icons.X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-400">
                  Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Subject
                  </label>
                  <select
                    value={newNote.subject}
                    onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-400">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={newNote.topic}
                    onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })}
                    placeholder="Topic..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-400">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note content here..."
                  rows={6}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pin"
                  checked={newNote.isPinned}
                  onChange={(e) => setNewNote({ ...newNote, isPinned: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900"
                />
                <label htmlFor="pin" className="text-sm text-slate-600 dark:text-slate-400">
                  Pin this note
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingNote(null);
                  setNewNote({
                    title: '',
                    subject: '',
                    topic: '',
                    content: '',
                    tags: [],
                    isPinned: false,
                  });
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={editingNote ? handleUpdateNote : handleCreateNote}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {editingNote ? 'Update Note' : 'Create Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Note Card Component
const NoteCard = ({ note, subjectColors, onEdit, onDelete, onTogglePin, formatDate }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-start justify-between">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${subjectColors[note.subject] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
          {note.subject}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTogglePin(note.id)}
            className="rounded p-1 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <Icons.Star className={`h-4 w-4 ${note.isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="rounded p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit"
          >
            <Icons.Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete"
          >
            <Icons.Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        {note.title}
      </h3>

      {note.topic && (
        <p className="mb-2 text-xs text-slate-600 dark:text-slate-400">
          {note.topic}
        </p>
      )}

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
        {note.content}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        <div className="flex items-center gap-1">
          <Icons.Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(note.updatedAt || note.createdAt)}</span>
        </div>
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1">
            {note.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
