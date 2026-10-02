import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/practice/QuestionCard';
import QuestionHeader from '../components/practice/QuestionHeader';
import QuestionNavigation from '../components/practice/QuestionNavigation';
import Button from '../components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const PracticeReview = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const questionsData = localStorage.getItem('practiceQuestions');
    const answersData = localStorage.getItem('practiceAnswers');

    if (questionsData && answersData) {
      setQuestions(JSON.parse(questionsData));
      setAnswers(JSON.parse(answersData));
    } else {
      navigate('/practice/setup');
    }
  }, [navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleBack = () => {
    navigate('/practice/results');
  };

  if (!currentQuestion) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading review...</p>
        </div>
      </div>
    );
  }

  const userAnswer = answers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const canGoBack = currentQuestionIndex > 0;
  const canGoForward = currentQuestionIndex < questions.length - 1;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={handleBack}>
          Back to Results
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Answers</h1>
          <p className="text-gray-500 mt-1">Review your performance</p>
        </div>
      </div>

      {/* Question Header */}
      <QuestionHeader
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onBack={handleBack}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onMarkReview={() => {}}
        isMarked={false}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Answer Status */}
          <div className={`card p-4 flex items-center gap-3 ${
            isCorrect ? 'border-l-4 border-l-success-500 bg-success-50/30' : 'border-l-4 border-l-error-500 bg-error-50/30'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-success-600" />
            ) : (
              <XCircle className="w-6 h-6 text-error-600" />
            )}
            <div>
              <p className={`font-semibold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
              </p>
              <p className="text-sm text-gray-600">
                {userAnswer !== undefined
                  ? `Your answer: ${currentQuestion.options[userAnswer]}`
                  : 'You skipped this question'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-success-600">
                  Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
              )}
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={userAnswer}
            onAnswerSelect={() => {}}
            showFeedback={true}
            isReview={true}
          />
        </div>

        {/* Question Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <QuestionNavigation
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              markedForReview={[]}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeReview;
