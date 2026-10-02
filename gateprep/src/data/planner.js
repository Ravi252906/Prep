export const plannerData = {
  weeklySchedule: [
    { day: 'Monday', topics: ['DS: Trees', 'Algo: DP'], hours: 4 },
    { day: 'Tuesday', topics: ['DBMS: Transactions', 'OS: Scheduling'], hours: 5 },
    { day: 'Wednesday', topics: ['CN: TCP/IP', 'COA: Pipelining'], hours: 3 },
    { day: 'Thursday', topics: ['DS: Graphs', 'Algo: Greedy'], hours: 6 },
    { day: 'Friday', topics: ['DBMS: Indexing', 'OS: Memory'], hours: 4 },
    { day: 'Saturday', topics: ['Mock Test', 'Revision'], hours: 7 },
    { day: 'Sunday', topics: ['Weak Topics', 'Notes'], hours: 5 },
  ],
  upcomingDeadlines: [
    { id: 1, task: 'Complete DBMS Normalization', dueDate: '2024-10-05', priority: 'high' },
    { id: 2, task: 'Mock Test #13', dueDate: '2024-10-07', priority: 'medium' },
    { id: 3, task: 'Revise OS Concepts', dueDate: '2024-10-10', priority: 'low' },
  ],
  studyGoals: {
    daily: 6,
    weekly: 40,
    monthly: 160,
  },
};
