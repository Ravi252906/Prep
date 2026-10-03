export const weightageData = {
  disclaimer: 'This is historical/demo data based on past GATE exams. Historical frequency does not guarantee future questions. Use this for guidance only.',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  subjectWeightage: [
    {
      subject: 'DBMS',
      totalMarks: 85,
      averagePerYear: 14.2,
      trend: 'stable',
      yearBreakdown: [
        { year: 2019, marks: 13 },
        { year: 2020, marks: 15 },
        { year: 2021, marks: 14 },
        { year: 2022, marks: 16 },
        { year: 2023, marks: 13 },
        { year: 2024, marks: 14 },
      ],
    },
    {
      subject: 'Operating Systems',
      totalMarks: 78,
      averagePerYear: 13.0,
      trend: 'stable',
      yearBreakdown: [
        { year: 2019, marks: 12 },
        { year: 2020, marks: 14 },
        { year: 2021, marks: 13 },
        { year: 2022, marks: 13 },
        { year: 2023, marks: 13 },
        { year: 2024, marks: 13 },
      ],
    },
    {
      subject: 'Algorithms',
      totalMarks: 72,
      averagePerYear: 12.0,
      trend: 'stable',
      yearBreakdown: [
        { year: 2019, marks: 11 },
        { year: 2020, marks: 12 },
        { year: 2021, marks: 13 },
        { year: 2022, marks: 12 },
        { year: 2023, marks: 12 },
        { year: 2024, marks: 12 },
      ],
    },
    {
      subject: 'Computer Networks',
      totalMarks: 65,
      averagePerYear: 10.8,
      trend: 'increasing',
      yearBreakdown: [
        { year: 2019, marks: 9 },
        { year: 2020, marks: 10 },
        { year: 2021, marks: 11 },
        { year: 2022, marks: 11 },
        { year: 2023, marks: 12 },
        { year: 2024, marks: 12 },
      ],
    },
    {
      subject: 'Computer Organization',
      totalMarks: 60,
      averagePerYear: 10.0,
      trend: 'stable',
      yearBreakdown: [
        { year: 2019, marks: 10 },
        { year: 2020, marks: 10 },
        { year: 2021, marks: 10 },
        { year: 2022, marks: 10 },
        { year: 2023, marks: 10 },
        { year: 2024, marks: 10 },
      ],
    },
    {
      subject: 'Discrete Mathematics',
      totalMarks: 55,
      averagePerYear: 9.2,
      trend: 'stable',
      yearBreakdown: [
        { year: 2019, marks: 9 },
        { year: 2020, marks: 9 },
        { year: 2021, marks: 10 },
        { year: 2022, marks: 9 },
        { year: 2023, marks: 9 },
        { year: 2024, marks: 9 },
      ],
    },
  ],
  topicWeightage: [
    {
      subject: 'DBMS',
      topics: [
        { topic: 'Normalization', frequency: 45, averageMarks: 8.5, difficulty: 'medium' },
        { topic: 'Transactions', frequency: 38, averageMarks: 7.2, difficulty: 'hard' },
        { topic: 'SQL', frequency: 52, averageMarks: 9.8, difficulty: 'easy' },
        { topic: 'Indexing', frequency: 28, averageMarks: 5.3, difficulty: 'medium' },
        { topic: 'Concurrency Control', frequency: 32, averageMarks: 6.0, difficulty: 'hard' },
      ],
    },
    {
      subject: 'Operating Systems',
      topics: [
        { topic: 'Process Scheduling', frequency: 42, averageMarks: 7.9, difficulty: 'medium' },
        { topic: 'Deadlock', frequency: 38, averageMarks: 7.2, difficulty: 'hard' },
        { topic: 'Memory Management', frequency: 35, averageMarks: 6.6, difficulty: 'medium' },
        { topic: 'File Systems', frequency: 25, averageMarks: 4.7, difficulty: 'easy' },
        { topic: 'Synchronization', frequency: 40, averageMarks: 7.5, difficulty: 'hard' },
      ],
    },
    {
      subject: 'Algorithms',
      topics: [
        { topic: 'Dynamic Programming', frequency: 52, averageMarks: 9.8, difficulty: 'hard' },
        { topic: 'Greedy Algorithms', frequency: 35, averageMarks: 6.6, difficulty: 'medium' },
        { topic: 'Graph Algorithms', frequency: 48, averageMarks: 9.0, difficulty: 'hard' },
        { topic: 'Sorting', frequency: 40, averageMarks: 7.5, difficulty: 'easy' },
        { topic: 'Searching', frequency: 30, averageMarks: 5.7, difficulty: 'easy' },
      ],
    },
    {
      subject: 'Computer Networks',
      topics: [
        { topic: 'TCP/IP', frequency: 45, averageMarks: 8.5, difficulty: 'medium' },
        { topic: 'Routing', frequency: 32, averageMarks: 6.0, difficulty: 'medium' },
        { topic: 'Flow Control', frequency: 38, averageMarks: 7.2, difficulty: 'hard' },
        { topic: 'Application Layer', frequency: 28, averageMarks: 5.3, difficulty: 'easy' },
        { topic: 'Data Link Layer', frequency: 30, averageMarks: 5.7, difficulty: 'medium' },
      ],
    },
    {
      subject: 'Computer Organization',
      topics: [
        { topic: 'Cache Memory', frequency: 48, averageMarks: 9.0, difficulty: 'medium' },
        { topic: 'Pipelining', frequency: 42, averageMarks: 7.9, difficulty: 'hard' },
        { topic: 'ALU Design', frequency: 28, averageMarks: 5.3, difficulty: 'medium' },
        { topic: 'Memory Organization', frequency: 32, averageMarks: 6.0, difficulty: 'easy' },
        { topic: 'I/O Organization', frequency: 25, averageMarks: 4.7, difficulty: 'medium' },
      ],
    },
    {
      subject: 'Discrete Mathematics',
      topics: [
        { topic: 'Graph Theory', frequency: 44, averageMarks: 8.3, difficulty: 'medium' },
        { topic: 'Combinatorics', frequency: 38, averageMarks: 7.2, difficulty: 'medium' },
        { topic: 'Probability', frequency: 35, averageMarks: 6.6, difficulty: 'hard' },
        { topic: 'Logic', frequency: 30, averageMarks: 5.7, difficulty: 'easy' },
        { topic: 'Set Theory', frequency: 25, averageMarks: 4.7, difficulty: 'easy' },
      ],
    },
  ],
  difficultyDistribution: {
    easy: { percentage: 35, averageMarks: 28 },
    medium: { percentage: 45, averageMarks: 36 },
    hard: { percentage: 20, averageMarks: 16 },
  },
  questionTypeDistribution: {
    mcq: { percentage: 70, count: 70 },
    msq: { percentage: 15, count: 15 },
    nat: { percentage: 15, count: 15 },
  },
};

export const getSubjectWeightage = (subject) => {
  return weightageData.subjectWeightage.find(s => s.subject === subject);
};

export const getTopicWeightage = (subject, topic) => {
  const subjectData = weightageData.topicWeightage.find(s => s.subject === subject);
  if (subjectData) {
    return subjectData.topics.find(t => t.topic === topic);
  }
  return null;
};

export const getYearWeightage = (year) => {
  return weightageData.subjectWeightage.map(s => ({
    subject: s.subject,
    marks: s.yearBreakdown.find(y => y.year === year)?.marks || 0,
  }));
};
