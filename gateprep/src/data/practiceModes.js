export const practiceModes = [
  {
    id: 'quick-practice',
    name: 'Quick Practice',
    description: '10 random questions for a quick revision',
    icon: 'Zap',
    defaultCount: 10,
    timer: 600, // 10 minutes in seconds
    randomQuestions: true,
    showInPreset: true,
  },
  {
    id: 'topic-practice',
    name: 'Topic Practice',
    description: 'Focus on a specific topic',
    icon: 'Target',
    defaultCount: 20,
    timer: 0, // No timer
    randomQuestions: false,
    showInPreset: true,
  },
  {
    id: 'gate-pyq',
    name: 'GATE PYQs',
    description: 'Previous year GATE questions',
    icon: 'Calendar',
    defaultCount: 15,
    timer: 1800, // 30 minutes
    randomQuestions: false,
    showInPreset: true,
  },
  {
    id: 'mixed-practice',
    name: 'Mixed Practice',
    description: 'Questions from all subjects',
    icon: 'Shuffle',
    defaultCount: 25,
    timer: 1500, // 25 minutes
    randomQuestions: true,
    showInPreset: true,
  },
  {
    id: 'weak-topics',
    name: 'Weak Topics',
    description: 'Practice topics you struggle with',
    icon: 'TrendingDown',
    defaultCount: 15,
    timer: 0,
    randomQuestions: false,
    showInPreset: true,
  },
  {
    id: 'custom',
    name: 'Custom Practice',
    description: 'Configure your own practice session',
    icon: 'Settings',
    defaultCount: 20,
    timer: 0,
    randomQuestions: false,
    showInPreset: true,
  },
];

export const questionTypes = [
  { id: 'MCQ', name: 'MCQ (Single Correct)', description: 'Multiple Choice Question' },
  { id: 'MSQ', name: 'MSQ (Multiple Correct)', description: 'Multiple Select Question' },
  { id: 'NAT', name: 'NAT (Numerical Answer)', description: 'Numerical Answer Type' },
];

export const difficultyLevels = [
  { id: 'Easy', name: 'Easy', color: 'success' },
  { id: 'Medium', name: 'Medium', color: 'warning' },
  { id: 'Hard', name: 'Hard', color: 'error' },
];

export const gateYears = [
  { id: 2024, name: 'GATE 2024' },
  { id: 2023, name: 'GATE 2023' },
  { id: 2022, name: 'GATE 2022' },
  { id: 2021, name: 'GATE 2021' },
  { id: 2020, name: 'GATE 2020' },
  { id: 2019, name: 'GATE 2019' },
  { id: 2018, name: 'GATE 2018' },
  { id: '2017-2024', name: 'All Years (2017-2024)' },
];

export const marksOptions = [
  { id: 1, name: '1 Mark' },
  { id: 2, name: '2 Marks' },
  { id: 'all', name: 'All Marks' },
];

export const questionCountOptions = [
  { id: 5, name: '5 Questions' },
  { id: 10, name: '10 Questions' },
  { id: 15, name: '15 Questions' },
  { id: 20, name: '20 Questions' },
  { id: 25, name: '25 Questions' },
  { id: 30, name: '30 Questions' },
  { id: 50, name: '50 Questions' },
];

export const timerOptions = [
  { id: 0, name: 'No Timer' },
  { id: 300, name: '5 Minutes' },
  { id: 600, name: '10 Minutes' },
  { id: 900, name: '15 Minutes' },
  { id: 1200, name: '20 Minutes' },
  { id: 1800, name: '30 Minutes' },
  { id: 3600, name: '1 Hour' },
];
