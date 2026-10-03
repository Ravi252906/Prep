import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Target,
  FileText,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
} from "lucide-react";
import { useGamification } from "../context/GamificationContext";
import { useRevision } from "../context/RevisionContext";
import { useStudySession } from "../context/StudySessionContext";
import XPProgress from "../components/gamification/XPProgress";
import SmartStudyCard from "../components/study/SmartStudyCard";
import ContinueLearning from "../components/study/ContinueLearning";
import ChallengeCard from "../components/gamification/ChallengeCard";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------
// GATE 2027 EXAM DATE
// Change this date whenever required
// ---------------------------------------------
const GATE_EXAM_DATE = new Date("2027-02-07T09:30:00");

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.5 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 3.8 },
];

const subjects = [
  {
    name: "Data Structures",
    progress: 75,
    topics: "12 / 16 topics",
  },
  {
    name: "Algorithms",
    progress: 60,
    topics: "9 / 15 topics",
  },
  {
    name: "DBMS",
    progress: 45,
    topics: "7 / 16 topics",
  },
  {
    name: "Operating Systems",
    progress: 55,
    topics: "8 / 15 topics",
  },
  {
    name: "Computer Networks",
    progress: 40,
    topics: "6 / 15 topics",
  },
  {
    name: "COA",
    progress: 35,
    topics: "5 / 14 topics",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Complete DBMS Normalization",
    subject: "DBMS",
    time: "45 min",
    completed: false,
  },
  {
    id: 2,
    title: "Practice 20 DSA Questions",
    subject: "Data Structures",
    time: "60 min",
    completed: true,
  },
  {
    id: 3,
    title: "Revise Operating Systems",
    subject: "OS",
    time: "40 min",
    completed: false,
  },
  {
    id: 4,
    title: "Solve GATE PYQs",
    subject: "Mixed",
    time: "60 min",
    completed: false,
  },
];

function Dashboard() {
  const [timeLeft, setTimeLeft] = useState(
    getTimeRemaining()
  );

  const [tasks, setTasks] = useState(initialTasks);
  
  const { gamification, getCurrentLevelInfo, getXPToNextLevel, getLevelProgress } = useGamification();
  const { getDueToday } = useRevision();
  const { getStudyActivityCalendar, studySessions } = useStudySession();

  const currentLevelInfo = getCurrentLevelInfo();
  const xpToNextLevel = getXPToNextLevel();
  const levelProgress = getLevelProgress();
  const dueToday = getDueToday();
  const calendarData = getStudyActivityCalendar(90);

  function getTimeRemaining() {
    const now = new Date();
    const difference = GATE_EXAM_DATE - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =====================================
            WELCOME HEADER
        ====================================== */}
        <section className="mb-6">
          <p className="mb-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
            GATE CS / IT PREPARATION
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Good afternoon, Student 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Let's continue your GATE preparation.
          </p>
        </section>

        {/* =====================================
            HERO / COUNTDOWN CARD
        ====================================== */}
        <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            {/* Left */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Target size={16} />
                GATE 2027
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                Your preparation journey starts today.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Stay consistent, practice every day, and keep
                improving your GATE preparation.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/subjects"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                >
                  <Play size={17} />
                  Continue Studying
                </Link>

                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Practice Questions
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Countdown */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:min-w-[330px]">
              <p className="text-center text-sm font-medium text-blue-100">
                Time remaining
              </p>

              <div className="mt-4 grid grid-cols-4 gap-2">
                <CountdownBox
                  value={timeLeft.days}
                  label="Days"
                />

                <CountdownBox
                  value={timeLeft.hours}
                  label="Hours"
                />

                <CountdownBox
                  value={timeLeft.minutes}
                  label="Min"
                />

                <CountdownBox
                  value={timeLeft.seconds}
                  label="Sec"
                />
              </div>

              <p className="mt-4 text-center text-xs text-blue-100">
                GATE 2027 • February 2027
              </p>
            </div>
          </div>
        </section>

        {/* =====================================
            STATISTICS
        ====================================== */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<Flame size={21} />}
            iconStyle="bg-orange-50 text-orange-600"
            title="Study Streak"
            value={studySessions.studyDaysThisMonth || 0}
            subtitle="days this month"
          />

          <StatCard
            icon={<Target size={21} />}
            iconStyle="bg-blue-50 text-blue-600"
            title="Questions Solved"
            value={gamification.questionsSolved || 0}
            subtitle="questions"
          />

          <StatCard
            icon={<FileText size={21} />}
            iconStyle="bg-purple-50 text-purple-600"
            title="Mock Tests"
            value={gamification.mockTestsCompleted || 0}
            subtitle="completed"
          />

          <StatCard
            icon={<TrendingUp size={21} />}
            iconStyle="bg-green-50 text-green-600"
            title="Total XP"
            value={gamification.totalXP || 0}
            subtitle="XP earned"
          />

        </section>

        {/* =====================================
            STAGE 6 WIDGETS
        ====================================== */}
        <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {/* XP Progress */}
          <XPProgress
            currentXP={gamification.currentXP}
            totalXP={gamification.totalXP}
            xpToNextLevel={xpToNextLevel}
            levelProgress={levelProgress}
            currentLevelInfo={currentLevelInfo}
          />

          {/* Smart Study Recommendation */}
          <SmartStudyCard />

          {/* Continue Learning */}
          <ContinueLearning />

          {/* Daily Challenge */}
          <ChallengeCard
            challenge={gamification.dailyChallenge}
            type="daily"
          />
        </section>

        {/* =====================================
            SUBJECT + WEEKLY CHART
        ====================================== */}
        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Subject Progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Subject Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Track your preparation
                </p>
              </div>

              <Link
                to="/subjects"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all
              </Link>
            </div>

            <div className="space-y-5">
              {subjects.map((subject) => (
                <div key={subject.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {subject.name}
                    </span>

                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {subject.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-700 dark:bg-blue-500"
                      style={{
                        width: `${subject.progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {subject.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Weekly Study Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your study hours this week
              </p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient
                      id="studyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="day"
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#studyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* =====================================
            TASKS + QUICK ACTIONS
        ====================================== */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Today's Tasks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 dark:border-slate-700 dark:bg-slate-800">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Today's Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Complete your daily targets
                </p>
              </div>

              <CheckCircle2
                size={21}
                className="text-green-500"
              />
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-100 hover:bg-blue-50/40 dark:border-slate-700 dark:hover:bg-blue-900/20"
                >
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      task.completed
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle2 size={15} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? "text-slate-400 line-through dark:text-slate-500"
                          : "text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {task.subject}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                        <Clock size={12} />
                        {task.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Jump back into your preparation
            </p>

            <div className="mt-5 space-y-3">

              <QuickAction
                to="/subjects"
                icon={<BookOpen size={19} />}
                title="Study Subjects"
                description="Continue learning"
              />

              <QuickAction
                to="/practice"
                icon={<Target size={19} />}
                title="Practice Questions"
                description="Improve your accuracy"
              />

              <QuickAction
                to="/revision"
                icon={<Flame size={19} />}
                title="Revision Center"
                description="Review topics"
              />

              <QuickAction
                to="/mock-tests"
                icon={<FileText size={19} />}
                title="Take Mock Test"
                description="Test your preparation"
              />

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// =============================================
// COUNTDOWN BOX
// =============================================
function CountdownBox({ value, label }) {
  return (
    <div className="rounded-xl bg-white/15 px-2 py-3 text-center">
      <div className="text-xl font-bold sm:text-2xl">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-[10px] uppercase tracking-wide text-blue-100">
        {label}
      </div>
    </div>
  );
}

// =============================================
// STAT CARD
// =============================================
function StatCard({
  icon,
  iconStyle,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {value}
            </span>

            <span className="text-xs text-slate-400 dark:text-slate-500">
              {subtitle}
            </span>
          </div>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </div>
      </div>

    </div>
  );
}

// =============================================
// QUICK ACTION
// =============================================
function QuickAction({
  to,
  icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-all hover:border-blue-100 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-900/20"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={17}
        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400"
      />
    </Link>
  );
}

export default Dashboard;