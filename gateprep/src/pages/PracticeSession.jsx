import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Flag,
  RotateCcw,
  Send,
  X,
  BookOpen,
} from "lucide-react";

/* =========================================================
   MOCK QUESTIONS
   You can move these later to src/data/questions.js
========================================================= */

const questions = [
  {
    id: 1,
    question:
      "Which data structure is used to implement recursion internally?",
    subject: "Data Structures",
    topic: "Stacks",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Tree",
    ],
    answer: 1,
    explanation:
      "Function calls and local variables are stored in the call stack during recursion.",
  },

  {
    id: 2,
    question:
      "Which normal form removes partial functional dependencies?",
    subject: "DBMS",
    topic: "Normalization",
    type: "MCQ",
    marks: 1,
    difficulty: "Medium",
    options: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF",
    ],
    answer: 1,
    explanation:
      "Second Normal Form removes partial functional dependencies on a candidate key.",
  },

  {
    id: 3,
    question:
      "Which scheduling algorithm can cause starvation?",
    subject: "Operating Systems",
    topic: "CPU Scheduling",
    type: "MCQ",
    marks: 1,
    difficulty: "Medium",
    options: [
      "FCFS",
      "Round Robin",
      "Priority Scheduling",
      "FIFO",
    ],
    answer: 2,
    explanation:
      "A low-priority process may wait indefinitely if higher-priority processes keep arriving.",
  },

  {
    id: 4,
    question:
      "Which protocol is connection-oriented?",
    subject: "Computer Networks",
    topic: "Transport Layer",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    options: [
      "UDP",
      "IP",
      "TCP",
      "ICMP",
    ],
    answer: 2,
    explanation:
      "TCP establishes a connection before transmitting data and provides reliable delivery.",
  },

  {
    id: 5,
    question:
      "What is the time complexity of binary search on a sorted array?",
    subject: "Algorithms",
    topic: "Searching",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(1)",
    ],
    answer: 1,
    explanation:
      "Binary search divides the search space into half at every step, resulting in O(log n).",
  },

  {
    id: 6,
    question:
      "Which of the following is a property of a deadlock?",
    subject: "Operating Systems",
    topic: "Deadlocks",
    type: "MCQ",
    marks: 2,
    difficulty: "Medium",
    options: [
      "Mutual exclusion",
      "Circular wait",
      "Hold and wait",
      "All of these",
    ],
    answer: 3,
    explanation:
      "Deadlock requires mutual exclusion, hold and wait, no preemption, and circular wait.",
  },

  {
    id: 7,
    question:
      "Which language class is recognized by a finite automaton?",
    subject: "Theory of Computation",
    topic: "Finite Automata",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    options: [
      "Regular languages",
      "Context-free languages",
      "Context-sensitive languages",
      "Recursive languages",
    ],
    answer: 0,
    explanation:
      "Finite automata recognize exactly the class of regular languages.",
  },

  {
    id: 8,
    question:
      "Which memory is closest to the CPU?",
    subject: "COA",
    topic: "Memory Hierarchy",
    type: "MCQ",
    marks: 1,
    difficulty: "Easy",
    options: [
      "Hard Disk",
      "RAM",
      "Cache",
      "Secondary Storage",
    ],
    answer: 2,
    explanation:
      "Cache memory is much closer to the CPU and provides faster access than RAM.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const PracticeSession = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState([]);
  const [checked, setChecked] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setShowSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  /* =====================================================
     TIMER FORMAT
  ===================================================== */

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* =====================================================
     SELECT ANSWER
  ===================================================== */

  const selectAnswer = (optionIndex) => {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionIndex,
    }));
  };

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  /* =====================================================
     PREVIOUS QUESTION
  ===================================================== */

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  };

  /* =====================================================
     MARK / UNMARK
  ===================================================== */

  const toggleMark = () => {
    setMarked((previous) => {
      if (previous.includes(currentQuestion.id)) {
        return previous.filter(
          (id) => id !== currentQuestion.id
        );
      }

      return [...previous, currentQuestion.id];
    });
  };

  /* =====================================================
     CHECK ANSWER
  ===================================================== */

  const checkAnswer = () => {
    if (answers[currentQuestion.id] === undefined) {
      return;
    }

    setChecked((previous) => ({
      ...previous,
      [currentQuestion.id]: true,
    }));
  };

  /* =====================================================
     CLEAR ANSWER
  ===================================================== */

  const clearAnswer = () => {
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[currentQuestion.id];
      return updated;
    });

    setChecked((previous) => {
      const updated = { ...previous };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const submitTest = () => {
    setSubmitted(true);
    setShowSubmit(false);
  };

  /* =====================================================
     RESULT CALCULATION
  ===================================================== */

  const results = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
    let score = 0;
    let totalMarks = 0;

    questions.forEach((question) => {
      totalMarks += question.marks;

      if (answers[question.id] !== undefined) {
        attempted++;

        if (answers[question.id] === question.answer) {
          correct++;
          score += question.marks;
        } else {
          incorrect++;
        }
      }
    });

    const skipped = questions.length - attempted;

    const accuracy =
      attempted > 0
        ? Math.round((correct / attempted) * 100)
        : 0;

    return {
      attempted,
      correct,
      incorrect,
      skipped,
      score,
      totalMarks,
      accuracy,
    };
  }, [answers]);

  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">

          <div className="mb-6">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Practice
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={34}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Practice Completed!
            </h1>

            <p className="mt-2 text-slate-500">
              Here is your performance summary.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

              <ResultCard
                title="Score"
                value={`${results.score}/${results.totalMarks}`}
              />

              <ResultCard
                title="Accuracy"
                value={`${results.accuracy}%`}
              />

              <ResultCard
                title="Correct"
                value={results.correct}
              />

              <ResultCard
                title="Incorrect"
                value={results.incorrect}
              />

            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <RotateCcw size={17} />
                Retry Practice
              </button>

              <Link
                to="/practice"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Practice
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const selectedAnswer =
    answers[currentQuestion.id];

  const isChecked =
    checked[currentQuestion.id];

  const isCorrect =
    selectedAnswer === currentQuestion.answer;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <Link
              to="/practice"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Practice
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={21} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  GATE Practice Session
                </h1>

                <p className="text-sm text-slate-500">
                  {currentQuestion.subject} •{" "}
                  {currentQuestion.topic}
                </p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
              timeLeft < 300
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <Clock size={19} />

            <span className="font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>

        </div>

        {/* =================================================
            PROGRESS
        ================================================== */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Question {currentIndex + 1} of{" "}
              {questions.length}
            </span>

            <span className="text-slate-500">
              {Object.keys(answers).length} attempted
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentIndex + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              QUESTION
          ================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Question header */}
            <div className="border-b border-slate-100 p-5">

              <div className="flex flex-wrap items-center gap-2">

                <Badge>
                  {currentQuestion.subject}
                </Badge>

                <Badge>
                  {currentQuestion.topic}
                </Badge>

                <Badge>
                  {currentQuestion.type}
                </Badge>

                <Badge>
                  {currentQuestion.marks} Mark
                </Badge>

                <Badge>
                  {currentQuestion.difficulty}
                </Badge>

              </div>

            </div>

            {/* Question */}
            <div className="p-5 sm:p-7">

              <h2 className="text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
                Q{currentIndex + 1}.{" "}
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="mt-7 space-y-3">

                {currentQuestion.options.map(
                  (option, index) => {

                    const selected =
                      selectedAnswer === index;

                    const correct =
                      currentQuestion.answer === index;

                    let optionStyle =
                      "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50";

                    if (selected) {
                      optionStyle =
                        "border-blue-500 bg-blue-50";
                    }

                    if (isChecked && correct) {
                      optionStyle =
                        "border-green-500 bg-green-50";
                    }

                    if (
                      isChecked &&
                      selected &&
                      !correct
                    ) {
                      optionStyle =
                        "border-red-500 bg-red-50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() =>
                          selectAnswer(index)
                        }
                        disabled={isChecked}
                        className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${optionStyle}`}
                      >
                        <span
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                            selected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {option}
                        </span>

                        {isChecked && correct && (
                          <Check
                            size={19}
                            className="ml-auto text-green-600"
                          />
                        )}

                        {isChecked &&
                          selected &&
                          !correct && (
                            <X
                              size={19}
                              className="ml-auto text-red-600"
                            />
                          )}
                      </button>
                    );
                  }
                )}

              </div>

              {/* Feedback */}
              {isChecked && (
                <div
                  className={`mt-6 rounded-xl border p-4 ${
                    isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2
                        size={20}
                        className="text-green-600"
                      />
                    ) : (
                      <X
                        size={20}
                        className="text-red-600"
                      />
                    )}

                    <p
                      className={`font-semibold ${
                        isCorrect
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {isCorrect
                        ? "Correct Answer!"
                        : "Incorrect Answer"}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3">

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={toggleMark}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      marked.includes(
                        currentQuestion.id
                      )
                        ? "border-orange-200 bg-orange-50 text-orange-600"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Flag size={16} />
                    {marked.includes(
                      currentQuestion.id
                    )
                      ? "Marked"
                      : "Mark Review"}
                  </button>

                  <button
                    onClick={clearAnswer}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Clear
                  </button>

                </div>

                <div className="flex gap-2">

                  {selectedAnswer !==
                    undefined &&
                    !isChecked && (
                      <button
                        onClick={checkAnswer}
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        <Check size={17} />
                        Check Answer
                      </button>
                    )}

                  {currentIndex <
                    questions.length - 1 ? (
                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Next
                      <ArrowRight size={17} />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setShowSubmit(true)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Send size={17} />
                      Submit
                    </button>
                  )}

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              QUESTION NAVIGATION
          ================================================== */}

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Questions
            </h3>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((question, index) => {

                const answered =
                  answers[question.id] !==
                  undefined;

                const isCurrent =
                  currentIndex === index;

                const isMarked =
                  marked.includes(question.id);

                return (
                  <button
                    key={question.id}
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                    className={`relative flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : answered
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}

                    {isMarked && (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-xs">

              <Legend
                color="bg-blue-600"
                label="Current"
              />

              <Legend
                color="bg-green-500"
                label="Answered"
              />

              <Legend
                color="bg-slate-300"
                label="Not Answered"
              />

              <Legend
                color="bg-orange-500"
                label="Marked for Review"
              />

            </div>

            {/* Summary */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Attempted
                </span>

                <span className="font-semibold text-slate-900">
                  {Object.keys(answers).length}/
                  {questions.length}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">
                  Marked
                </span>

                <span className="font-semibold text-slate-900">
                  {marked.length}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SUBMIT MODAL
      ====================================================== */}

      {showSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Send size={22} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Submit Practice?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You have attempted{" "}
              <strong>
                {Object.keys(answers).length}
              </strong>{" "}
              out of{" "}
              <strong>{questions.length}</strong>{" "}
              questions.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowSubmit(false)
                }
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Continue
              </button>

              <button
                onClick={submitTest}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Submit Test
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Badge({ children }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <span className="text-slate-500">
        {label}
      </span>
    </div>
  );
}

function ResultCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default PracticeSession;