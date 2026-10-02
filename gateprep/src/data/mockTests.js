export const mockTests = [
  {
    id: 'full-length-1',
    name: 'Full Length Mock Test #1',
    type: 'full-length',
    questions: 65,
    totalMarks: 100,
    duration: 180, // in minutes
    difficulty: 'Medium',
    sections: [
      { name: 'General Aptitude', questions: 15, marks: 15 },
      { name: 'Engineering Mathematics', questions: 13, marks: 13 },
      { name: 'Computer Science', questions: 37, marks: 72 }
    ],
    description: 'Complete GATE CS 2025 pattern mock test covering all subjects',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'full-length-2',
    name: 'Full Length Mock Test #2',
    type: 'full-length',
    questions: 65,
    totalMarks: 100,
    duration: 180,
    difficulty: 'Medium',
    sections: [
      { name: 'General Aptitude', questions: 15, marks: 15 },
      { name: 'Engineering Mathematics', questions: 13, marks: 13 },
      { name: 'Computer Science', questions: 37, marks: 72 }
    ],
    description: 'Complete GATE CS 2025 pattern mock test covering all subjects',
    attemptStatus: 'completed',
    bestScore: 72,
    lastAttempted: '2024-09-28'
  },
  {
    id: 'full-length-3',
    name: 'Full Length Mock Test #3',
    type: 'full-length',
    questions: 65,
    totalMarks: 100,
    duration: 180,
    difficulty: 'Hard',
    sections: [
      { name: 'General Aptitude', questions: 15, marks: 15 },
      { name: 'Engineering Mathematics', questions: 13, marks: 13 },
      { name: 'Computer Science', questions: 37, marks: 72 }
    ],
    description: 'Advanced level mock test with challenging questions',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'mini-test-1',
    name: 'Mini Test - Quick Revision',
    type: 'mini',
    questions: 25,
    totalMarks: 40,
    duration: 45,
    difficulty: 'Easy',
    sections: [
      { name: 'Mixed Topics', questions: 25, marks: 40 }
    ],
    description: 'Quick 25-question test for rapid revision',
    attemptStatus: 'completed',
    bestScore: 35,
    lastAttempted: '2024-09-25'
  },
  {
    id: 'mini-test-2',
    name: 'Mini Test - Speed Test',
    type: 'mini',
    questions: 30,
    totalMarks: 45,
    duration: 30,
    difficulty: 'Medium',
    sections: [
      { name: 'Mixed Topics', questions: 30, marks: 45 }
    ],
    description: '30-minute speed test to improve time management',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'subject-dsa',
    name: 'Subject-wise Test: Data Structures & Algorithms',
    type: 'subject',
    subject: 'Data Structures & Algorithms',
    questions: 20,
    totalMarks: 30,
    duration: 60,
    difficulty: 'Medium',
    sections: [
      { name: 'Arrays & Linked Lists', questions: 5, marks: 8 },
      { name: 'Trees & Graphs', questions: 8, marks: 12 },
      { name: 'Algorithms', questions: 7, marks: 10 }
    ],
    description: 'Focused test on DSA concepts',
    attemptStatus: 'completed',
    bestScore: 26,
    lastAttempted: '2024-09-20'
  },
  {
    id: 'subject-dbms',
    name: 'Subject-wise Test: DBMS',
    type: 'subject',
    subject: 'DBMS',
    questions: 15,
    totalMarks: 25,
    duration: 45,
    difficulty: 'Medium',
    sections: [
      { name: 'SQL & Normalization', questions: 8, marks: 13 },
      { name: 'Transactions & Concurrency', questions: 7, marks: 12 }
    ],
    description: 'Comprehensive DBMS test',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'subject-os',
    name: 'Subject-wise Test: Operating Systems',
    type: 'subject',
    subject: 'Operating Systems',
    questions: 18,
    totalMarks: 28,
    duration: 50,
    difficulty: 'Hard',
    sections: [
      { name: 'Process Management', questions: 6, marks: 10 },
      { name: 'Memory Management', questions: 6, marks: 9 },
      { name: 'File Systems & I/O', questions: 6, marks: 9 }
    ],
    description: 'Advanced OS concepts test',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'subject-cn',
    name: 'Subject-wise Test: Computer Networks',
    type: 'subject',
    subject: 'Computer Networks',
    questions: 15,
    totalMarks: 25,
    duration: 45,
    difficulty: 'Medium',
    sections: [
      { name: 'OSI & TCP/IP', questions: 5, marks: 8 },
      { name: 'Transport & Application Layer', questions: 5, marks: 9 },
      { name: 'Network Layer & Routing', questions: 5, marks: 8 }
    ],
    description: 'Complete networking concepts test',
    attemptStatus: 'completed',
    bestScore: 20,
    lastAttempted: '2024-09-15'
  },
  {
    id: 'subject-coa',
    name: 'Subject-wise Test: Computer Organization',
    type: 'subject',
    subject: 'Computer Organization & Architecture',
    questions: 12,
    totalMarks: 20,
    duration: 40,
    difficulty: 'Medium',
    sections: [
      { name: 'Pipelining & Performance', questions: 4, marks: 7 },
      { name: 'Memory & Cache', questions: 4, marks: 7 },
      { name: 'I/O & Interrupts', questions: 4, marks: 6 }
    ],
    description: 'COA concepts test',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'subject-dl',
    name: 'Subject-wise Test: Digital Logic',
    type: 'subject',
    subject: 'Digital Logic',
    questions: 10,
    totalMarks: 15,
    duration: 30,
    difficulty: 'Easy',
    sections: [
      { name: 'Number Systems & Boolean Algebra', questions: 5, marks: 8 },
      { name: 'Combinational & Sequential Circuits', questions: 5, marks: 7 }
    ],
    description: 'Digital logic fundamentals test',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  },
  {
    id: 'subject-eng-math',
    name: 'Subject-wise Test: Engineering Mathematics',
    type: 'subject',
    subject: 'Engineering Mathematics',
    questions: 13,
    totalMarks: 15,
    duration: 45,
    difficulty: 'Medium',
    sections: [
      { name: 'Linear Algebra & Calculus', questions: 7, marks: 8 },
      { name: 'Probability & Statistics', questions: 6, marks: 7 }
    ],
    description: 'Engineering mathematics test',
    attemptStatus: 'not-attempted',
    bestScore: null,
    lastAttempted: null
  }
];
