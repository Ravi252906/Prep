import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Star, Copy, Sparkles, Bookmark, Clock } from 'lucide-react';
import { conceptsData, getConceptsBySubject } from '../data/concepts';
import { useConcepts } from '../context/ConceptContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useAI } from '../context/AIContext';
import { generateSmartRevisionNotes } from '../services/smartStudyEngine';

const ConceptDetail = () => {
  const { subject, topic } = useParams();
  const navigate = useNavigate();
  const { isConceptComplete, markConceptComplete, markConceptIncomplete, addRecentConcept } = useConcepts();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { browserAIAvailable } = useAI();
  const [concept, setConcept] = useState(null);
  const [showRevisionSheet, setShowRevisionSheet] = useState(false);
  const [revisionSheet, setRevisionSheet] = useState(null);
  const [isGeneratingRevision, setIsGeneratingRevision] = useState(false);

  useEffect(() => {
    const foundConcept = conceptsData.find(
      c => c.subject === subject && c.topic === topic
    );
    setConcept(foundConcept || null);

    if (foundConcept) {
      addRecentConcept(foundConcept.id, foundConcept.subject, foundConcept.topic, foundConcept.topic);
    }
  }, [subject, topic, addRecentConcept]);

  const handleToggleComplete = () => {
    if (!concept) return;

    if (isConceptComplete(concept.id)) {
      markConceptIncomplete(concept.id);
    } else {
      markConceptComplete(concept.id, concept.subject, concept.topic);
    }
  };

  const handleBookmark = () => {
    if (!concept) return;

    if (isBookmarked(`/concepts/${concept.subject}/${concept.topic}`)) {
      removeBookmark(`/concepts/${concept.subject}/${concept.topic}`);
    } else {
      addBookmark({
        type: 'concept',
        title: concept.topic,
        subject: concept.subject,
        topic: concept.topic,
        url: `/concepts/${concept.subject}/${concept.topic}`,
        data: { conceptId: concept.id },
      });
    }
  };

  const handleGenerateRevisionSheet = async () => {
    if (!concept) return;

    setIsGeneratingRevision(true);
    const result = generateSmartRevisionNotes(concept.topic);
    setRevisionSheet(result.response);
    setShowRevisionSheet(true);
    setIsGeneratingRevision(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!concept) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Concept not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/concepts')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Concepts
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{concept.subject}</span>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                {concept.topic}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{concept.subtopic}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleComplete}
                className={`p-2 rounded-lg transition-colors ${
                  isConceptComplete(concept.id)
                    ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }`}
                title={isConceptComplete(concept.id) ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <CheckCircle className="w-6 h-6" />
              </button>
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked(`/concepts/${concept.subject}/${concept.topic}`)
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
                title="Bookmark"
              >
                <Star className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {concept.pyqCount} PYQs
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {concept.practiceQuestions} Practice Questions
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={handleGenerateRevisionSheet}
              disabled={isGeneratingRevision}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isGeneratingRevision ? 'Generating...' : 'Generate Revision Sheet'}
            </button>
            <button
              onClick={() => navigate(`/practice?subject=${concept.subject}&topic=${concept.topic}`)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Practice Questions
            </button>
          </div>
        </div>

        {showRevisionSheet && revisionSheet && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                AI Revision Sheet
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(revisionSheet)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
                  title="Copy"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    addBookmark({
                      type: 'ai-response',
                      title: `Revision: ${concept.topic}`,
                      subject: concept.subject,
                      topic: concept.topic,
                      url: `/concepts/${concept.subject}/${concept.topic}`,
                      data: { content: revisionSheet },
                    });
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
                  title="Bookmark"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans">
                {revisionSheet}
              </pre>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Definition
            </h2>
            <p className="text-slate-700 dark:text-slate-300">{concept.definition}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Simple Explanation
            </h2>
            <p className="text-slate-700 dark:text-slate-300">{concept.simpleExplanation}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Important Points
            </h2>
            <ul className="space-y-2">
              {concept.importantPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {concept.formulas && concept.formulas.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                Formulas
              </h2>
              <div className="space-y-2">
                {concept.formulas.map((formula, index) => (
                  <div key={index} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm text-slate-800 dark:text-slate-200">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Examples
            </h2>
            <ul className="space-y-2">
              {concept.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                  {example}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Common Traps
            </h2>
            <ul className="space-y-2">
              {concept.commonTraps.map((trap, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">⚠</span>
                  {trap}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
              GATE Tips
            </h2>
            <ul className="space-y-2">
              {concept.gateTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetail;
