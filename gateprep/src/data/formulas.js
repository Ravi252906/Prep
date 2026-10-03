export const formulasData = [
  {
    id: 'coa-cache-access-time',
    subject: 'Computer Organization',
    topic: 'Cache Memory',
    formula: 'T_avg = H × T_cache + (1 - H) × T_memory',
    variables: {
      'T_avg': 'Average memory access time',
      'H': 'Hit ratio',
      'T_cache': 'Cache access time',
      'T_memory': 'Main memory access time',
    },
    explanation: 'Calculates the effective memory access time considering cache hits and misses.',
    whenToUse: 'When calculating system performance with cache memory',
    example: 'If H=0.9, T_cache=10ns, T_memory=100ns, then T_avg = 0.9×10 + 0.1×100 = 19ns',
    commonMistakes: [
      'Forgetting to include miss penalty',
      'Not converting units consistently',
      'Confusing hit ratio with miss ratio',
    ],
    gateWeightage: 'high',
  },
  {
    id: 'coa-pipeline-speedup',
    subject: 'Computer Organization',
    topic: 'Pipelining',
    formula: 'Speedup = T_non_pipeline / T_pipeline',
    variables: {
      'Speedup': 'Performance improvement',
      'T_non_pipeline': 'Time without pipelining',
      'T_pipeline': 'Time with pipelining',
    },
    explanation: 'Measures the performance gain from using pipeline architecture.',
    whenToUse: 'When comparing pipelined vs non-pipelined processors',
    example: 'If T_non_pipeline=100ns, T_pipeline=30ns, Speedup = 100/30 = 3.33',
    commonMistakes: [
      'Not considering pipeline stalls/hazards',
      'Using ideal speedup without considering overhead',
      'Forgetting about clock cycle time',
    ],
    gateWeightage: 'high',
  },
  {
    id: 'os-throughput',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    formula: 'Throughput = Number of processes completed / Total time',
    variables: {
      'Throughput': 'Processes completed per unit time',
      'Number of processes': 'Total completed processes',
      'Total time': 'Time duration',
    },
    explanation: 'Measures the number of processes completed per unit time.',
    whenToUse: 'When evaluating scheduler performance',
    example: 'If 20 processes complete in 100 seconds, Throughput = 20/100 = 0.2 processes/sec',
    commonMistakes: [
      'Including turnaround time in calculation',
      'Not specifying time unit',
      'Confusing with utilization',
    ],
    gateWeightage: 'medium',
  },
  {
    id: 'os-turnaround-time',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    formula: 'Turnaround Time = Completion Time - Arrival Time',
    variables: {
      'Turnaround Time': 'Total time from submission to completion',
      'Completion Time': 'When process finishes',
      'Arrival Time': 'When process arrives',
    },
    explanation: 'Total time a process spends in the system from arrival to completion.',
    whenToUse: 'When evaluating scheduling algorithms',
    example: 'If process arrives at t=2 and completes at t=10, Turnaround Time = 10-2 = 8',
    commonMistakes: [
      'Using burst time instead of completion time',
      'Not considering waiting time',
      'Confusing with response time',
    ],
    gateWeightage: 'high',
  },
  {
    id: 'dbms-join-cost',
    subject: 'DBMS',
    topic: 'Query Optimization',
    formula: 'Cost(R ⋈ S) = |R| × |S| (for nested loop join)',
    variables: {
      'Cost': 'Number of disk I/O operations',
      '|R|': 'Number of tuples in relation R',
      '|S|': 'Number of tuples in relation S',
    },
    explanation: 'Estimates the cost of joining two relations using nested loop join.',
    whenToUse: 'When comparing different join algorithms',
    example: 'If |R|=1000, |S|=500, Cost = 1000×500 = 500,000',
    commonMistakes: [
      'Assuming same cost for all join algorithms',
      'Not considering index availability',
      'Forgetting about buffer size',
    ],
    gateWeightage: 'medium',
  },
  {
    id: 'cn-efficiency',
    subject: 'Computer Networks',
    topic: 'Performance Metrics',
    formula: 'Efficiency = (Window Size) / (1 + 2a)',
    variables: {
      'Efficiency': 'Link utilization',
      'Window Size': 'Number of frames before ACK',
      'a': 'Propagation delay / Transmission delay',
    },
    explanation: 'Measures how effectively the link bandwidth is utilized.',
    whenToUse: 'When analyzing sliding window protocols',
    example: 'If Window=4, a=2, Efficiency = 4/(1+4) = 0.8 or 80%',
    commonMistakes: [
      'Not calculating a correctly',
      'Confusing with throughput',
      'Forgetting the factor of 2 in RTT',
    ],
    gateWeightage: 'high',
  },
  {
    id: 'daa-time-complexity',
    subject: 'Algorithms',
    topic: 'Complexity Analysis',
    formula: 'T(n) = O(f(n))',
    variables: {
      'T(n)': 'Time complexity',
      'O': 'Big-O notation (upper bound)',
      'f(n)': 'Growth rate function',
    },
    explanation: 'Describes how algorithm runtime grows with input size.',
    whenToUse: 'When analyzing algorithm efficiency',
    example: 'Binary search: T(n) = O(log n), Linear search: T(n) = O(n)',
    commonMistakes: [
      'Confusing Big-O with Big-Theta',
      'Not considering worst case',
      'Ignoring constant factors for small n',
    ],
    gateWeightage: 'very-high',
  },
  {
    id: 'daa-master-theorem',
    subject: 'Algorithms',
    topic: 'Divide and Conquer',
    formula: 'T(n) = aT(n/b) + f(n)',
    variables: {
      'T(n)': 'Recurrence relation',
      'a': 'Number of subproblems',
      'b': 'Factor by which input size reduces',
      'f(n)': 'Cost of dividing and combining',
    },
    explanation: 'Solves recurrence relations for divide and conquer algorithms.',
    whenToUse: 'When analyzing divide and conquer algorithms',
    example: 'Merge sort: T(n) = 2T(n/2) + O(n) → T(n) = O(n log n)',
    commonMistakes: [
      'Not checking the three cases properly',
      'Applying when f(n) is not polynomial',
      'Forgetting that a must be ≥ 1 and b > 1',
    ],
    gateWeightage: 'high',
  },
  {
    id: 'discrete-permutation',
    subject: 'Discrete Mathematics',
    topic: 'Combinatorics',
    formula: 'P(n, r) = n! / (n - r)!',
    variables: {
      'P(n, r)': 'Number of permutations',
      'n': 'Total items',
      'r': 'Items to arrange',
      '!': 'Factorial',
    },
    explanation: 'Number of ways to arrange r items from n distinct items.',
    whenToUse: 'When order matters in arrangement',
    example: 'P(5, 3) = 5! / 2! = 60 arrangements',
    commonMistakes: [
      'Confusing with combinations',
      'Not using factorial correctly',
      'Forgetting that n ≥ r',
    ],
    gateWeightage: 'medium',
  },
  {
    id: 'discrete-combination',
    subject: 'Discrete Mathematics',
    topic: 'Combinatorics',
    formula: 'C(n, r) = n! / (r! × (n - r)!)',
    variables: {
      'C(n, r)': 'Number of combinations',
      'n': 'Total items',
      'r': 'Items to select',
      '!': 'Factorial',
    },
    explanation: 'Number of ways to select r items from n distinct items (order doesn\'t matter).',
    whenToUse: 'When order doesn\'t matter in selection',
    example: 'C(5, 3) = 5! / (3! × 2!) = 10 combinations',
    commonMistakes: [
      'Confusing with permutations',
      'Not simplifying factorials',
      'Forgetting symmetry: C(n, r) = C(n, n-r)',
    ],
    gateWeightage: 'high',
  },
];

export const getFormulasBySubject = (subject) => {
  return formulasData.filter(f => f.subject === subject);
};

export const getFormulasByTopic = (topic) => {
  return formulasData.filter(f => f.topic === topic);
};

export const getFormulaById = (id) => {
  return formulasData.find(f => f.id === id);
};

export const searchFormulas = (query) => {
  const lowerQuery = query.toLowerCase();
  return formulasData.filter(f =>
    f.topic.toLowerCase().includes(lowerQuery) ||
    f.formula.toLowerCase().includes(lowerQuery) ||
    f.subject.toLowerCase().includes(lowerQuery) ||
    f.explanation.toLowerCase().includes(lowerQuery)
  );
};
