// GATE 2027 Exam Date - Easily editable
export const GATE_EXAM_DATE = new Date('2027-02-06');

export const stats = [
  {
    id: 1,
    label: 'Study Streak',
    value: '15',
    unit: 'days',
    icon: 'Flame',
    color: 'bg-warning-500',
    trend: '+3',
    trendDirection: 'up',
  },
  {
    id: 2,
    label: 'Questions Solved',
    value: '847',
    unit: 'questions',
    icon: 'CheckCircle',
    color: 'bg-success-500',
    trend: '+42',
    trendDirection: 'up',
  },
  {
    id: 3,
    label: 'Mock Tests',
    value: '12',
    unit: 'completed',
    icon: 'FileText',
    color: 'bg-primary-500',
    trend: '+2',
    trendDirection: 'up',
  },
  {
    id: 4,
    label: 'Overall Progress',
    value: '52',
    unit: '%',
    icon: 'TrendingUp',
    color: 'bg-primary-600',
    trend: '+5',
    trendDirection: 'up',
  },
];

export const weeklyProgress = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 6 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 7 },
  { day: 'Sun', hours: 5 },
];

export const tasks = [
  {
    id: 1,
    text: 'Complete DBMS Normalization',
    completed: false,
    category: 'DBMS',
    estimatedTime: '45 min',
    priority: 'high',
  },
  {
    id: 2,
    text: 'Practice 20 DSA questions',
    completed: true,
    category: 'DSA',
    estimatedTime: '60 min',
    priority: 'medium',
  },
  {
    id: 3,
    text: 'Revise Operating Systems',
    completed: false,
    category: 'OS',
    estimatedTime: '30 min',
    priority: 'high',
  },
  {
    id: 4,
    text: 'Solve GATE PYQs - 2023',
    completed: false,
    category: 'Practice',
    estimatedTime: '90 min',
    priority: 'medium',
  },
];

export const quickActions = [
  {
    id: 1,
    label: 'Practice Questions',
    description: 'Solve topic-wise questions',
    icon: 'BookOpen',
    route: '/practice',
    color: 'bg-primary-500',
  },
  {
    id: 2,
    label: 'Take Mock Test',
    description: 'Test your knowledge',
    icon: 'FileText',
    route: '/mock-tests',
    color: 'bg-success-500',
  },
  {
    id: 3,
    label: 'Study Planner',
    description: 'Plan your schedule',
    icon: 'Calendar',
    route: '/planner',
    color: 'bg-primary-600',
  },
  {
    id: 4,
    label: 'View Notes',
    description: 'Access your notes',
    icon: 'FileText',
    route: '/notes',
    color: 'bg-warning-500',
  },
];

export const insights = [
  {
    id: 1,
    title: 'Strongest Subject',
    value: 'Data Structures',
    icon: 'TrendingUp',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
  {
    id: 2,
    title: 'Weakest Subject',
    value: 'Computer Networks',
    icon: 'TrendingDown',
    color: 'text-error-600',
    bgColor: 'bg-error-50',
  },
  {
    id: 3,
    title: 'Weekly Study Goal',
    value: '34/40 hours',
    icon: 'Target',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    id: 4,
    title: 'Recommended Topic',
    value: 'DBMS Transactions',
    icon: 'Lightbulb',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
  },
];
