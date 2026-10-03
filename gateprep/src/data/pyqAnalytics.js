export const pyqAnalyticsData = {
  totalPYQs: 450,
  attemptedPYQs: 285,
  accuracy: 68,
  averageTime: 3.2,
  strongestTopic: { subject: 'DBMS', topic: 'SQL', accuracy: 85 },
  weakestTopic: { subject: 'Algorithms', topic: 'Dynamic Programming', accuracy: 52 },
  completionPercentage: 63,

  byYear: [
    { year: 2024, total: 75, attempted: 45, accuracy: 70, avgTime: 3.1 },
    { year: 2023, total: 75, attempted: 48, accuracy: 67, avgTime: 3.3 },
    { year: 2022, total: 75, attempted: 42, accuracy: 65, avgTime: 3.4 },
    { year: 2021, total: 75, attempted: 50, accuracy: 72, avgTime: 3.0 },
    { year: 2020, total: 75, attempted: 48, accuracy: 68, avgTime: 3.2 },
    { year: 2019, total: 75, attempted: 52, accuracy: 69, avgTime: 3.1 },
  ],

  bySubject: [
    {
      subject: 'DBMS',
      total: 85,
      attempted: 58,
      accuracy: 72,
      avgTime: 3.0,
      topics: [
        { topic: 'Normalization', total: 45, attempted: 32, accuracy: 68 },
        { topic: 'Transactions', total: 38, attempted: 25, accuracy: 70 },
        { topic: 'SQL', total: 52, attempted: 40, accuracy: 85 },
        { topic: 'Indexing', total: 28, attempted: 18, accuracy: 65 },
        { topic: 'Concurrency Control', total: 32, attempted: 20, accuracy: 68 },
      ],
    },
    {
      subject: 'Operating Systems',
      total: 78,
      attempted: 50,
      accuracy: 65,
      avgTime: 3.4,
      topics: [
        { topic: 'Process Scheduling', total: 42, attempted: 28, accuracy: 70 },
        { topic: 'Deadlock', total: 38, attempted: 24, accuracy: 60 },
        { topic: 'Memory Management', total: 35, attempted: 22, accuracy: 65 },
        { topic: 'File Systems', total: 25, attempted: 18, accuracy: 72 },
        { topic: 'Synchronization', total: 40, attempted: 25, accuracy: 62 },
      ],
    },
    {
      subject: 'Algorithms',
      total: 72,
      attempted: 45,
      accuracy: 62,
      avgTime: 3.8,
      topics: [
        { topic: 'Dynamic Programming', total: 52, attempted: 30, accuracy: 52 },
        { topic: 'Greedy Algorithms', total: 35, attempted: 22, accuracy: 68 },
        { topic: 'Graph Algorithms', total: 48, attempted: 30, accuracy: 65 },
        { topic: 'Sorting', total: 40, attempted: 28, accuracy: 75 },
        { topic: 'Searching', total: 30, attempted: 22, accuracy: 78 },
      ],
    },
    {
      subject: 'Computer Networks',
      total: 65,
      attempted: 42,
      accuracy: 68,
      avgTime: 3.2,
      topics: [
        { topic: 'TCP/IP', total: 45, attempted: 30, accuracy: 70 },
        { topic: 'Routing', total: 32, attempted: 20, accuracy: 65 },
        { topic: 'Flow Control', total: 38, attempted: 25, accuracy: 68 },
        { topic: 'Application Layer', total: 28, attempted: 18, accuracy: 72 },
        { topic: 'Data Link Layer', total: 30, attempted: 20, accuracy: 66 },
      ],
    },
    {
      subject: 'Computer Organization',
      total: 60,
      attempted: 40,
      accuracy: 70,
      avgTime: 3.1,
      topics: [
        { topic: 'Cache Memory', total: 48, attempted: 32, accuracy: 72 },
        { topic: 'Pipelining', total: 42, attempted: 28, accuracy: 65 },
        { topic: 'ALU Design', total: 28, attempted: 18, accuracy: 70 },
        { topic: 'Memory Organization', total: 32, attempted: 22, accuracy: 72 },
        { topic: 'I/O Organization', total: 25, attempted: 16, accuracy: 68 },
      ],
    },
    {
      subject: 'Discrete Mathematics',
      total: 55,
      attempted: 35,
      accuracy: 72,
      avgTime: 2.9,
      topics: [
        { topic: 'Graph Theory', total: 44, attempted: 28, accuracy: 70 },
        { topic: 'Combinatorics', total: 38, attempted: 24, accuracy: 75 },
        { topic: 'Probability', total: 35, attempted: 22, accuracy: 68 },
        { topic: 'Logic', total: 30, attempted: 20, accuracy: 78 },
        { topic: 'Set Theory', total: 25, attempted: 18, accuracy: 80 },
      ],
    },
  ],

  byDifficulty: [
    { difficulty: 'easy', total: 158, attempted: 120, accuracy: 82, avgTime: 2.5 },
    { difficulty: 'medium', total: 202, attempted: 130, accuracy: 65, avgTime: 3.2 },
    { difficulty: 'hard', total: 90, attempted: 35, accuracy: 48, avgTime: 4.5 },
  ],

  byQuestionType: [
    { type: 'MCQ', total: 315, attempted: 210, accuracy: 72, avgTime: 2.8 },
    { type: 'MSQ', total: 68, attempted: 40, accuracy: 60, avgTime: 3.5 },
    { type: 'NAT', total: 67, attempted: 35, accuracy: 58, avgTime: 4.2 },
  ],

  accuracyTrend: [
    { month: 'Jan', accuracy: 60 },
    { month: 'Feb', accuracy: 62 },
    { month: 'Mar', accuracy: 65 },
    { month: 'Apr', accuracy: 64 },
    { month: 'May', accuracy: 68 },
    { month: 'Jun', accuracy: 70 },
    { month: 'Jul', accuracy: 69 },
    { month: 'Aug', accuracy: 71 },
    { month: 'Sep', accuracy: 68 },
  ],

  timeAnalysis: {
    averageTimePerQuestion: 3.2,
    totalTimeSpent: 912,
    timeByDifficulty: {
      easy: 2.5,
      medium: 3.2,
      hard: 4.5,
    },
    timeBySubject: {
      DBMS: 3.0,
      'Operating Systems': 3.4,
      Algorithms: 3.8,
      'Computer Networks': 3.2,
      'Computer Organization': 3.1,
      'Discrete Mathematics': 2.9,
    },
  },
};

export const getPYQAnalyticsBySubject = (subject) => {
  return pyqAnalyticsData.bySubject.find(s => s.subject === subject);
};

export const getPYQAnalyticsByYear = (year) => {
  return pyqAnalyticsData.byYear.find(y => y.year === year);
};

export const getPYQAnalyticsByTopic = (subject, topic) => {
  const subjectData = pyqAnalyticsData.bySubject.find(s => s.subject === subject);
  if (subjectData) {
    return subjectData.topics.find(t => t.topic === topic);
  }
  return null;
};
