import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import ExamHeader from '../components/mock/ExamHeader';
import QuestionPalette from '../components/mock/QuestionPalette';
import ExamTimer from '../components/mock/ExamTimer';
import SectionTabs from '../components/mock/SectionTabs';
import SubmitTestModal from '../components/mock/SubmitTestModal';
import MockQuestionCard from '../components/mock/MockQuestionCard';
import { mockTests } from '../data/mockTests';
import { mockQuestions } from '../data/mockQuestions';
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw, Grid3x3 } from 'lucide-react';

const MockTestExam = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const test = mockTests.find(t => t.id === testId);

  // Exam state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  // Questions state with status tracking
  const [questions, setQuestions] = useState([]);

  // User answers
  const [userAnswers, setUserAnswers] = useState({});

  // Section progress
  const [sectionProgress, setSectionProgress] = useState({});

  useEffect(() => {
    if (!test) return;

    // Initialize questions with status
    const initializedQuestions = mockQuestions.slice(0, test.questions).map(q => ({
      ...q,
      status: 'not-visited'
    }));

    setQuestions(initializedQuestions);

    // Initialize section progress
    const progress = {};
    test.sections.forEach((section, index) => {
      progress[index] = { answered: 0, total: section.questions };
    });
    setSectionProgress(progress);

    // Mark first question as visited
    if (initializedQuestions.length > 0) {
      initializedQuestions[0].status = 'visited';
      setQuestions([...initializedQuestions]);
    }
  }, [test]);

  // Update question status when answered
  const updateQuestionStatus = (index, status) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].status = status;
    setQuestions(updatedQuestions);

    // Update section progress
    const sectionIndex = getSectionForQuestion(index);
    if (sectionIndex !== null) {
      const progress = { ...sectionProgress };
      const answeredCount = updatedQuestions
        .filter((q, i) => {
          const qSection = getSectionForQuestion(i);
          return qSection === sectionIndex && (q.status === 'answered' || q.status === 'answered-marked');
        })
        .length;
      progress[sectionIndex] = { ...progress[sectionIndex], answered: answeredCount };
      setSectionProgress(progress);
    }
  };

  const getSectionForQuestion = (questionIndex) => {
    if (!test) return null;
    
    let questionCount = 0;
    for (let i = 0; i < test.sections.length; i++) {
      questionCount += test.sections[i].questions;
      if (questionIndex < questionCount) {
        return i;
      }
    }
    return test.sections.length - 1;
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: { answer, answered: true, marked: prev[currentQuestion]?.marked || false }
    }));

    const currentStatus = questions[currentQuestion].status;
    const newStatus = currentStatus === 'marked' ? 'answered-marked' : 'answered';
    updateQuestionStatus(currentQuestion, newStatus);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const newIndex = currentQuestion - 1;
      setCurrentQuestion(newIndex);
      if (questions[newIndex].status === 'not-visited') {
        updateQuestionStatus(newIndex, 'visited');
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const newIndex = currentQuestion + 1;
      setCurrentQuestion(newIndex);
      if (questions[newIndex].status === 'not-visited') {
        updateQuestionStatus(newIndex, 'visited');
      }
    }
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      return newAnswers;
    });

    const currentStatus = questions[currentQuestion].status;
    const newStatus = currentStatus === 'answered-marked' ? 'marked' : 'not-answered';
    updateQuestionStatus(currentQuestion, newStatus);
  };

  const handleMarkForReview = () => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        ...prev[currentQuestion],
        marked: true
      }
    }));

    const currentStatus = questions[currentQuestion].status;
    const newStatus = currentStatus === 'answered' ? 'answered-marked' : 'marked';
    updateQuestionStatus(currentQuestion, newStatus);
  };

  const handleSaveAndNext = () => {
    handleNext();
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
    if (questions[index].status === 'not-visited') {
      updateQuestionStatus(index, 'visited');
    }
    setSidebarOpen(false);
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    setIsRunning(false);
    // Calculate results and navigate to result page
    const result = calculateResults();
    // Store result in localStorage
    localStorage.setItem(`mockTestResult_${testId}`, JSON.stringify(result));
    navigate(`/mock-tests/${testId}/result`);
  };

  const calculateResults = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      
      if (!userAnswer?.answered) {
        unanswered++;
        return;
      }

      let isCorrect = false;
      
      if (q.type === 'NAT') {
        isCorrect = String(userAnswer.answer).trim() === String(q.correctAnswer).trim();
      } else if (q.type === 'MSQ') {
        const userArr = Array.isArray(userAnswer.answer) ? userAnswer.answer : [userAnswer.answer];
        const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        isCorrect = userArr.length === correctArr.length && 
                   userArr.every(val => correctArr.includes(val));
      } else {
        isCorrect = userAnswer.answer === q.correctAnswer;
      }

      if (isCorrect) {
        score += q.marks;
        correct++;
      } else {
        score -= q.negativeMarks || 0;
        incorrect++;
      }
    });

    const totalQuestions = questions.length;
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const percentile = Math.min(95, Math.round(50 + (score / test.totalMarks) * 40));

    return {
      score: Math.max(0, score),
      totalMarks: test.totalMarks,
      correct,
      incorrect,
      unanswered,
      attempted,
      accuracy,
      percentile,
      timeTaken: test.duration - Math.floor(Math.random() * 30), // Mock time taken
      userAnswers: questions.map((q, index) => {
        const userAnswer = userAnswers[index];
        let isCorrect = false;
        
        if (!userAnswer?.answered) {
          return { answered: false, marked: userAnswer?.marked || false, isCorrect: false };
        }

        if (q.type === 'NAT') {
          isCorrect = String(userAnswer.answer).trim() === String(q.correctAnswer).trim();
        } else if (q.type === 'MSQ') {
          const userArr = Array.isArray(userAnswer.answer) ? userAnswer.answer : [userAnswer.answer];
          const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
          isCorrect = userArr.length === correctArr.length && 
                     userArr.every(val => correctArr.includes(val));
        } else {
          isCorrect = userAnswer.answer === q.correctAnswer;
        }

        return {
          answered: true,
          answer: userAnswer.answer,
          marked: userAnswer.marked || false,
          isCorrect
        };
      })
    };
  };

  const getSubmitStats = () => {
    const answered = questions.filter(q => q.status === 'answered' || q.status === 'answered-marked').length;
    const notAnswered = questions.filter(q => q.status === 'not-answered' || q.status === 'not-visited').length;
    const marked = questions.filter(q => q.status === 'marked' || q.status === 'answered-marked').length;

    return { answered, notAnswered, marked };
  };

  if (!test) {
    return (
      <div className="p-6">
        <div className="card p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Test Not Found</h2>
          <p className="text-gray-500 mb-4">The requested test could not be found.</p>
          <button
            onClick={() => navigate('/mock-tests')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const submitStats = getSubmitStats();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <ExamHeader
        testName={test.name}
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Timer */}
          <div className="mb-4 flex justify-between items-center">
            <ExamTimer
              duration={test.duration}
              onTimeUp={handleTimeUp}
              isRunning={isRunning}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Test
            </Button>
          </div>

          {/* Section Tabs */}
          <div className="mb-4">
            <SectionTabs
              sections={test.sections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              sectionProgress={sectionProgress}
            />
          </div>

          {/* Question Card */}
          {currentQuestionData && (
            <MockQuestionCard
              question={currentQuestionData}
              selectedAnswer={userAnswers[currentQuestion]?.answer}
              onAnswerSelect={handleAnswerSelect}
              questionType={currentQuestionData.type}
            />
          )}

          {/* Navigation Buttons */}
          <div className="mt-4 flex flex-wrap gap-3 justify-between">
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                icon={ChevronLeft}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="md"
                icon={RotateCcw}
                onClick={handleClearResponse}
              >
                Clear Response
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                icon={Bookmark}
                onClick={handleMarkForReview}
              >
                Mark for Review
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={ChevronRight}
                onClick={handleSaveAndNext}
                disabled={currentQuestion === questions.length - 1}
              >
                Save & Next
              </Button>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="hidden lg:block w-80 p-4 lg:p-6 bg-white border-l border-gray-200">
          <QuestionPalette
            questions={questions}
            currentQuestion={currentQuestion}
            onQuestionSelect={handleQuestionSelect}
            onClose={() => {}}
            isMobile={false}
          />
        </div>
      </div>

      {/* Mobile Question Palette */}
      {sidebarOpen && (
        <QuestionPalette
          questions={questions}
          currentQuestion={currentQuestion}
          onQuestionSelect={handleQuestionSelect}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      )}

      {/* Submit Modal */}
      <SubmitTestModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmit}
        stats={submitStats}
      />
    </div>
  );
};

export default MockTestExam;
