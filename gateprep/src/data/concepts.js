export const conceptsData = [
  {
    id: 'dbms-normalization',
    subject: 'DBMS',
    topic: 'Normalization',
    subtopic: '1NF, 2NF, 3NF, BCNF',
    difficulty: 'medium',
    definition: 'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.',
    simpleExplanation: 'Think of normalization like organizing your closet - you group similar items together and remove duplicates to make it efficient.',
    importantPoints: [
      '1NF: All attributes must be atomic (no repeating groups)',
      '2NF: Must be in 1NF and no partial dependency',
      '3NF: Must be in 2NF and no transitive dependency',
      'BCNF: Stricter version of 3NF for certain cases',
    ],
    formulas: [],
    examples: [
      'A table with repeated groups violates 1NF',
      'A table where non-key attribute depends on part of composite key violates 2NF',
    ],
    commonTraps: [
      'Confusing 3NF with BCNF',
      'Not identifying all functional dependencies',
      'Forgetting that BCNF is lossless but not always dependency preserving',
    ],
    gateTips: [
      'High weightage topic in GATE',
      'Practice finding candidate keys',
      'Learn the decomposition algorithms',
    ],
    pyqCount: 45,
    practiceQuestions: 120,
  },
  {
    id: 'os-deadlock',
    subject: 'OS',
    topic: 'Deadlock',
    subtopic: 'Conditions, Prevention, Avoidance',
    difficulty: 'hard',
    definition: 'A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
    simpleExplanation: 'Like two people trying to cross a narrow bridge from opposite ends - neither can move forward because the other is blocking the way.',
    importantPoints: [
      'Four necessary conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'Deadlock prevention: Break at least one condition',
      'Deadlock avoidance: Banker\'s algorithm',
      'Deadlock detection: Wait-for graph',
    ],
    formulas: [],
    examples: [
      'Process P1 holds R1 and needs R2, Process P2 holds R2 and needs R1',
      'Resource allocation graph with cycle indicates deadlock',
    ],
    commonTraps: [
      'Confusing prevention with avoidance',
      'Not understanding safe state in Banker\'s algorithm',
      'Forgetting that circular wait alone doesn\'t guarantee deadlock',
    ],
    gateTips: [
      'Very high weightage in GATE',
      'Practice Banker\'s algorithm numericals',
      'Understand resource allocation graph',
    ],
    pyqCount: 38,
    practiceQuestions: 95,
  },
  {
    id: 'daa-dp',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    subtopic: 'Optimal Substructure, Overlapping Subproblems',
    difficulty: 'hard',
    definition: 'Dynamic Programming is an optimization technique that solves complex problems by breaking them down into simpler subproblems and storing their solutions to avoid redundant computations.',
    simpleExplanation: 'Like solving a big puzzle by solving smaller pieces first and remembering the solutions so you don\'t have to solve them again.',
    importantPoints: [
      'Two key properties: Optimal Substructure and Overlapping Subproblems',
      'Top-down: Memoization (recursion + cache)',
      'Bottom-up: Tabulation (iterative)',
      'Time vs Space trade-off',
    ],
    formulas: [],
    examples: [
      'Fibonacci sequence calculation',
      'Longest Common Subsequence',
      'Matrix Chain Multiplication',
    ],
    commonTraps: [
      'Not identifying overlapping subproblems',
      'Choosing wrong DP approach (top-down vs bottom-up)',
      'Incorrect state definition',
    ],
    gateTips: [
      'Highest weightage in Algorithms',
      'Practice standard DP problems',
      'Focus on state transition',
    ],
    pyqCount: 52,
    practiceQuestions: 150,
  },
  {
    id: 'cn-tcp',
    subject: 'Computer Networks',
    topic: 'TCP',
    subtopic: 'Flow Control, Congestion Control',
    difficulty: 'medium',
    definition: 'TCP (Transmission Control Protocol) is a connection-oriented protocol that provides reliable, ordered, and error-checked delivery of data between applications.',
    simpleExplanation: 'Like a phone call - you establish a connection first, then have a conversation where you can hear everything clearly, and finally hang up.',
    importantPoints: [
      'Three-way handshake for connection establishment',
      'Flow control: Sliding window protocol',
      'Congestion control: Slow start, Congestion avoidance, Fast retransmit',
      'Reliable delivery: ACKs, sequence numbers',
    ],
    formulas: [
      'Throughput = Window Size / RTT',
      'Efficiency = (Window Size) / (Bandwidth × Delay)',
    ],
    examples: [
      'TCP connection setup: SYN, SYN-ACK, ACK',
      'Congestion window growth in slow start',
    ],
    commonTraps: [
      'Confusing flow control with congestion control',
      'Not understanding RTT calculation',
      'Forgetting about cumulative ACKs',
    ],
    gateTips: [
      'Consistently appears in GATE',
      'Practice numerical problems on window size',
      'Understand TCP header fields',
    ],
    pyqCount: 41,
    practiceQuestions: 110,
  },
  {
    id: 'coa-cache',
    subject: 'Computer Organization',
    topic: 'Cache Memory',
    subtopic: 'Mapping, Replacement, Write Policies',
    difficulty: 'medium',
    definition: 'Cache memory is a small, fast memory located close to the CPU that stores frequently accessed data to reduce average memory access time.',
    simpleExplanation: 'Like keeping your most-used books on your desk instead of going to the library every time - much faster access!',
    importantPoints: [
      'Three mapping techniques: Direct, Fully Associative, Set Associative',
      'Replacement policies: LRU, FIFO, Random',
      'Write policies: Write-through, Write-back',
      'Cache performance: Hit ratio, Miss penalty',
    ],
    formulas: [
      'Average Access Time = Hit Time + (Miss Rate × Miss Penalty)',
      'Cache Size = Number of Sets × Block Size × Associativity',
    ],
    examples: [
      'Direct mapping: Block i → Set (i mod number of sets)',
      '4-way set associative: Each set has 4 blocks',
    ],
    commonTraps: [
      'Confusing set associativity with mapping',
      'Not considering tag size calculation',
      'Forgetting about valid and dirty bits',
    ],
    gateTips: [
      'Very high weightage in GATE',
      'Practice cache size calculations',
      'Understand all mapping techniques',
    ],
    pyqCount: 48,
    practiceQuestions: 130,
  },
  {
    id: 'discrete-graph',
    subject: 'Discrete Mathematics',
    topic: 'Graph Theory',
    subtopic: 'Traversal, Shortest Path, MST',
    difficulty: 'medium',
    definition: 'Graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects.',
    simpleExplanation: 'Like a map showing cities connected by roads - you can find the shortest path, best route, or connectivity.',
    importantPoints: [
      'Graph traversal: BFS (level order), DFS (depth first)',
      'Shortest path: Dijkstra (non-negative), Bellman-Ford (negative edges)',
      'MST: Prim\'s, Kruskal\'s algorithm',
      'Graph properties: Connected, Complete, Bipartite',
    ],
    formulas: [
      'Number of edges in complete graph: n(n-1)/2',
      'Maximum edges in bipartite graph: floor(n²/4)',
    ],
    examples: [
      'BFS for shortest path in unweighted graph',
      'Dijkstra for weighted graphs',
      'Prim\'s algorithm starting from any vertex',
    ],
    commonTraps: [
      'Using Dijkstra on graphs with negative weights',
      'Forgetting to mark visited nodes in DFS',
      'Confusing BFS with DFS applications',
    ],
    gateTips: [
      'High weightage in Discrete Math',
      'Practice all standard algorithms',
      'Focus on time complexity analysis',
    ],
    pyqCount: 44,
    practiceQuestions: 115,
  },
];

export const getConceptsBySubject = (subject) => {
  return conceptsData.filter(c => c.subject === subject);
};

export const getConceptsByTopic = (topic) => {
  return conceptsData.filter(c => c.topic === topic);
};

export const getConceptById = (id) => {
  return conceptsData.find(c => c.id === id);
};

export const searchConcepts = (query) => {
  const lowerQuery = query.toLowerCase();
  return conceptsData.filter(c =>
    c.topic.toLowerCase().includes(lowerQuery) ||
    c.subtopic.toLowerCase().includes(lowerQuery) ||
    c.definition.toLowerCase().includes(lowerQuery) ||
    c.subject.toLowerCase().includes(lowerQuery)
  );
};
