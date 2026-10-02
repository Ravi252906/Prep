export const practiceQuestions = [
  // Data Structures - Arrays
  {
    id: 1,
    question: 'Consider an array A[1...n] of distinct elements. What is the minimum number of comparisons required to find the second largest element in the array?',
    subject: 'Programming & Data Structures',
    topic: 'Arrays',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'n + ⌈log₂n⌉ - 2',
      'n - 1',
      'n + ⌈log₂n⌉ - 1',
      '2n - 3'
    ],
    correctAnswer: 0,
    explanation: 'To find the second largest element, we can use a tournament method. First, find the largest element in n-1 comparisons. The second largest must be among the elements that lost to the largest during the tournament. This requires ⌈log₂n⌉ - 1 additional comparisons. Total: n - 1 + ⌈log₂n⌉ - 1 = n + ⌈log₂n⌉ - 2.',
    tags: ['Arrays', 'Tournament Method', 'Complexity']
  },
  {
    id: 2,
    question: 'What is the time complexity of binary search on a sorted array of n elements?',
    subject: 'Programming & Data Structures',
    topic: 'Arrays',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'O(n)',
      'O(log n)',
      'O(n log n)',
      'O(1)'
    ],
    correctAnswer: 1,
    explanation: 'Binary search divides the search space in half at each step, resulting in a time complexity of O(log n).',
    tags: ['Binary Search', 'Complexity', 'Arrays']
  },
  // Data Structures - Linked Lists
  {
    id: 3,
    question: 'In a circular linked list, insertion of a node requires the modification of _____ pointers.',
    subject: 'Programming & Data Structures',
    topic: 'Linked Lists',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctAnswer: 1,
    explanation: 'In a circular linked list, to insert a node, we need to modify the next pointer of the new node and the next pointer of the node after which we are inserting. Thus, 2 pointers need to be modified.',
    tags: ['Linked Lists', 'Circular Linked List', 'Pointers']
  },
  {
    id: 4,
    question: 'What is the time complexity to reverse a singly linked list?',
    subject: 'Programming & Data Structures',
    topic: 'Linked Lists',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(1)'
    ],
    correctAnswer: 0,
    explanation: 'Reversing a singly linked list requires traversing the entire list once and modifying each node\'s next pointer. This takes O(n) time.',
    tags: ['Linked Lists', 'Reversal', 'Complexity']
  },
  // Data Structures - Trees
  {
    id: 5,
    question: 'The height of a binary tree is the maximum number of edges in any root-to-leaf path. What is the height of a complete binary tree with n nodes?',
    subject: 'Programming & Data Structures',
    topic: 'Trees',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      '⌊log₂n⌋',
      '⌈log₂n⌉',
      '⌊log₂(n+1)⌋',
      '⌈log₂(n+1)⌉'
    ],
    correctAnswer: 2,
    explanation: 'For a complete binary tree with n nodes, the height is ⌊log₂(n+1)⌋. This is because a complete binary tree of height h has between 2^h and 2^(h+1) - 1 nodes.',
    tags: ['Trees', 'Complete Binary Tree', 'Height']
  },
  {
    id: 6,
    question: 'In a binary search tree, the inorder traversal gives elements in _____ order.',
    subject: 'Programming & Data Structures',
    topic: 'Trees',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'Preorder',
      'Postorder',
      'Sorted (ascending)',
      'Level order'
    ],
    correctAnswer: 2,
    explanation: 'In a binary search tree, inorder traversal always produces elements in sorted (ascending) order because of the BST property: left subtree < root < right subtree.',
    tags: ['BST', 'Inorder Traversal', 'Properties']
  },
  // Data Structures - Graphs
  {
    id: 7,
    question: 'What is the time complexity of BFS traversal of a graph with V vertices and E edges?',
    subject: 'Programming & Data Structures',
    topic: 'Graphs',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'O(V)',
      'O(E)',
      'O(V + E)',
      'O(V × E)'
    ],
    correctAnswer: 2,
    explanation: 'BFS visits each vertex once (O(V)) and each edge once (O(E)). The total time complexity is O(V + E).',
    tags: ['Graphs', 'BFS', 'Complexity']
  },
  {
    id: 8,
    question: 'The adjacency matrix representation of a graph with V vertices requires _____ space.',
    subject: 'Programming & Data Structures',
    topic: 'Graphs',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'O(V)',
      'O(E)',
      'O(V²)',
      'O(V + E)'
    ],
    correctAnswer: 2,
    explanation: 'An adjacency matrix is a V × V matrix where each entry represents an edge. This requires O(V²) space regardless of the number of edges.',
    tags: ['Graphs', 'Adjacency Matrix', 'Space Complexity']
  },
  // Algorithms - Sorting
  {
    id: 9,
    question: 'Which sorting algorithm has the worst-case time complexity of O(n log n)?',
    subject: 'Algorithms',
    topic: 'Sorting',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Quick Sort',
      'Merge Sort',
      'Bubble Sort',
      'Insertion Sort'
    ],
    correctAnswer: 1,
    explanation: 'Merge Sort has a guaranteed worst-case time complexity of O(n log n). Quick Sort has O(n²) in the worst case, while Bubble Sort and Insertion Sort have O(n²).',
    tags: ['Sorting', 'Merge Sort', 'Complexity']
  },
  {
    id: 10,
    question: 'What is the best-case time complexity of Quick Sort?',
    subject: 'Algorithms',
    topic: 'Sorting',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(log n)'
    ],
    correctAnswer: 1,
    explanation: 'The best case for Quick Sort occurs when the pivot always divides the array into two equal halves, resulting in O(n log n) time complexity.',
    tags: ['Quick Sort', 'Best Case', 'Complexity']
  },
  // Algorithms - Dynamic Programming
  {
    id: 11,
    question: 'The 0/1 Knapsack problem can be solved using dynamic programming with time complexity of _____ and space complexity of _____.',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Hard',
    options: [
      'O(nW), O(nW)',
      'O(nW), O(W)',
      'O(2^n), O(n)',
      'O(n log W), O(n)'
    ],
    correctAnswer: 0,
    explanation: 'The 0/1 Knapsack problem can be solved using a 2D DP table of size n × W, where n is the number of items and W is the capacity. This gives O(nW) time and space complexity.',
    tags: ['Dynamic Programming', 'Knapsack', 'Complexity']
  },
  {
    id: 12,
    question: 'What is the time complexity of the Fibonacci sequence using memoization?',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'O(2^n)',
      'O(n)',
      'O(n²)',
      'O(n log n)'
    ],
    correctAnswer: 1,
    explanation: 'With memoization, each Fibonacci number is computed only once. Computing F(n) requires computing n distinct values, giving O(n) time complexity.',
    tags: ['Dynamic Programming', 'Memoization', 'Fibonacci']
  },
  // DBMS - SQL
  {
    id: 13,
    question: 'Which SQL clause is used to filter records based on a specific condition?',
    subject: 'DBMS',
    topic: 'SQL',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'GROUP BY',
      'WHERE',
      'HAVING',
      'ORDER BY'
    ],
    correctAnswer: 1,
    explanation: 'The WHERE clause is used to filter records based on a specific condition. HAVING is used with GROUP BY, and ORDER BY is for sorting.',
    tags: ['SQL', 'WHERE Clause', 'Filtering']
  },
  {
    id: 14,
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    subject: 'DBMS',
    topic: 'SQL',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'WHERE filters individual rows, HAVING filters groups',
      'HAVING filters individual rows, WHERE filters groups',
      'Both filter individual rows',
      'Both filter groups'
    ],
    correctAnswer: 0,
    explanation: 'WHERE clause filters individual rows before grouping, while HAVING clause filters groups after GROUP BY aggregation.',
    tags: ['SQL', 'HAVING', 'GROUP BY']
  },
  // DBMS - Normalization
  {
    id: 15,
    question: 'A relation is in BCNF if for every non-trivial functional dependency X → Y, _____ is a superkey.',
    subject: 'DBMS',
    topic: 'Normalization',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Y',
      'X',
      'X ∪ Y',
      'X ∩ Y'
    ],
    correctAnswer: 1,
    explanation: 'Boyce-Codd Normal Form (BCNF) requires that for every non-trivial functional dependency X → Y, X must be a superkey. This is a stronger condition than 3NF.',
    tags: ['Normalization', 'BCNF', 'Functional Dependencies']
  },
  {
    id: 16,
    question: 'Which normal form eliminates transitive dependencies?',
    subject: 'DBMS',
    topic: 'Normalization',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '2NF',
      '3NF',
      'BCNF',
      '4NF'
    ],
    correctAnswer: 1,
    explanation: '3NF eliminates transitive dependencies. A relation is in 3NF if it is in 2NF and has no transitive dependencies of non-prime attributes on the candidate key.',
    tags: ['Normalization', '3NF', 'Transitive Dependencies']
  },
  // DBMS - Transactions
  {
    id: 17,
    question: 'Which property of transactions ensures that either all operations in a transaction are completed or none are?',
    subject: 'DBMS',
    topic: 'Transactions',
    year: 2023,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'Atomicity',
      'Consistency',
      'Isolation',
      'Durability'
    ],
    correctAnswer: 0,
    explanation: 'Atomicity ensures that a transaction is treated as a single unit - either all operations succeed or none do. If any operation fails, the entire transaction is rolled back.',
    tags: ['Transactions', 'ACID', 'Atomicity']
  },
  {
    id: 18,
    question: 'In the two-phase locking protocol, the growing phase ends when _____',
    subject: 'DBMS',
    topic: 'Concurrency Control',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'The first lock is released',
      'The transaction acquires all locks',
      'The transaction commits',
      'The transaction rolls back'
    ],
    correctAnswer: 1,
    explanation: 'In two-phase locking, the growing phase continues until the transaction acquires all locks it needs. The shrinking phase begins when the first lock is released.',
    tags: ['Concurrency Control', 'Two-Phase Locking', 'Locking']
  },
  // Operating Systems - Processes
  {
    id: 19,
    question: 'Which scheduling algorithm is guaranteed to minimize the average waiting time?',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'FCFS',
      'SJF (Shortest Job First)',
      'Round Robin',
      'Priority Scheduling'
    ],
    correctAnswer: 1,
    explanation: 'Shortest Job First (SJF) scheduling minimizes the average waiting time because it schedules the shortest job first, reducing the waiting time for other processes.',
    tags: ['CPU Scheduling', 'SJF', 'Waiting Time']
  },
  {
    id: 20,
    question: 'In Round Robin scheduling with time quantum q, what happens when a process\'s CPU burst is less than q?',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'The process is preempted',
      'The process continues until completion',
      'The process is moved to the end of the queue',
      'The process is terminated'
    ],
    correctAnswer: 1,
    explanation: 'If a process\'s CPU burst is less than the time quantum q, it releases the CPU voluntarily when it completes, and the next process is scheduled.',
    tags: ['Round Robin', 'Time Quantum', 'Scheduling']
  },
  // Operating Systems - Deadlocks
  {
    id: 21,
    question: 'Banker\'s algorithm is used for _____',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Deadlock detection',
      'Deadlock prevention',
      'Deadlock avoidance',
      'Deadlock recovery'
    ],
    correctAnswer: 2,
    explanation: 'Banker\'s algorithm is a deadlock avoidance algorithm. It checks if granting a resource request would lead to an unsafe state before actually granting it.',
    tags: ['Deadlocks', 'Banker\'s Algorithm', 'Avoidance']
  },
  {
    id: 22,
    question: 'A system is in a safe state if _____',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'No deadlock exists',
      'There exists a safe sequence',
      'All processes are terminated',
      'Resources are unlimited'
    ],
    correctAnswer: 1,
    explanation: 'A system is in a safe state if there exists a safe sequence of processes such that each process can complete by acquiring available resources and resources released by previously completed processes.',
    tags: ['Deadlocks', 'Safe State', 'Safe Sequence']
  },
  // Operating Systems - Memory Management
  {
    id: 23,
    question: 'In paging, the page table is used to translate _____',
    subject: 'Operating Systems',
    topic: 'Memory Management',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Logical address to physical address',
      'Physical address to logical address',
      'Virtual address to disk address',
      'Disk address to physical address'
    ],
    correctAnswer: 0,
    explanation: 'The page table maps logical (virtual) page numbers to physical frame numbers, enabling translation from logical addresses to physical addresses.',
    tags: ['Paging', 'Page Table', 'Address Translation']
  },
  {
    id: 24,
    question: 'Thrashing occurs when _____',
    subject: 'Operating Systems',
    topic: 'Virtual Memory',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'CPU is idle',
      'The system spends more time paging than executing',
      'Memory is full',
      'All processes are blocked'
    ],
    correctAnswer: 1,
    explanation: 'Thrashing occurs when the system spends more time swapping pages in and out of memory than executing actual processes, severely degrading performance.',
    tags: ['Virtual Memory', 'Thrashing', 'Paging']
  },
  // Computer Networks - OSI Model
  {
    id: 25,
    question: 'Which layer of the OSI model is responsible for end-to-end communication?',
    subject: 'Computer Networks',
    topic: 'OSI Model',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'Network Layer',
      'Transport Layer',
      'Session Layer',
      'Application Layer'
    ],
    correctAnswer: 1,
    explanation: 'The Transport Layer (Layer 4) is responsible for end-to-end communication, providing reliable data transfer between hosts.',
    tags: ['OSI Model', 'Transport Layer', 'Layers']
  },
  {
    id: 26,
    question: 'Which protocol operates at the Network Layer of the OSI model?',
    subject: 'Computer Networks',
    topic: 'Network Layer',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'TCP',
      'HTTP',
      'IP',
      'Ethernet'
    ],
    correctAnswer: 2,
    explanation: 'IP (Internet Protocol) operates at the Network Layer (Layer 3) of the OSI model. TCP operates at the Transport Layer, HTTP at the Application Layer, and Ethernet at the Data Link Layer.',
    tags: ['Network Layer', 'IP', 'OSI Model']
  },
  // Computer Networks - TCP/IP
  {
    id: 27,
    question: 'How many packets are exchanged during the TCP three-way handshake?',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctAnswer: 1,
    explanation: 'The TCP three-way handshake involves three packets: SYN (client to server), SYN-ACK (server to client), and ACK (client to server).',
    tags: ['TCP', 'Three-Way Handshake', 'Connection Establishment']
  },
  {
    id: 28,
    question: 'Which field in the TCP header is used for flow control?',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Sequence Number',
      'Acknowledgment Number',
      'Window Size',
      'Checksum'
    ],
    correctAnswer: 2,
    explanation: 'The Window Size field in the TCP header is used for flow control. It specifies the number of bytes the receiver is willing to accept.',
    tags: ['TCP', 'Flow Control', 'Window Size']
  },
  // Digital Logic - Number Systems
  {
    id: 29,
    question: 'What is the binary representation of the decimal number 13?',
    subject: 'Digital Logic',
    topic: 'Number Systems',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '1010',
      '1101',
      '1110',
      '1001'
    ],
    correctAnswer: 1,
    explanation: '13 in decimal = 8 + 4 + 1 = 2³ + 2² + 2⁰ = 1101 in binary.',
    tags: ['Number Systems', 'Binary Conversion', 'Decimal to Binary']
  },
  {
    id: 30,
    question: 'The 2\'s complement of the binary number 1010 is _____',
    subject: 'Digital Logic',
    topic: 'Number Systems',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      '0101',
      '0110',
      '1010',
      '1110'
    ],
    correctAnswer: 1,
    explanation: 'To find 2\'s complement: 1) Find 1\'s complement (invert bits): 1010 → 0101. 2) Add 1: 0101 + 1 = 0110.',
    tags: ['Number Systems', '2\'s Complement', 'Binary']
  },
  // Digital Logic - Logic Gates
  {
    id: 31,
    question: 'Which logic gate outputs 1 only when both inputs are 1?',
    subject: 'Digital Logic',
    topic: 'Logic Gates',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'OR gate',
      'AND gate',
      'XOR gate',
      'NAND gate'
    ],
    correctAnswer: 1,
    explanation: 'The AND gate outputs 1 only when both inputs are 1. For all other input combinations, it outputs 0.',
    tags: ['Logic Gates', 'AND Gate', 'Digital Logic']
  },
  {
    id: 32,
    question: 'The universal logic gates are _____',
    subject: 'Digital Logic',
    topic: 'Logic Gates',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'AND and OR',
      'NAND and NOR',
      'XOR and XNOR',
      'AND and NOT'
    ],
    correctAnswer: 1,
    explanation: 'NAND and NOR are called universal gates because any Boolean function can be implemented using only NAND gates or only NOR gates.',
    tags: ['Logic Gates', 'Universal Gates', 'NAND', 'NOR']
  },
  // COA - Pipelining
  {
    id: 33,
    question: 'The speedup of a pipeline with k stages is ideally _____',
    subject: 'Computer Organization & Architecture',
    topic: 'Pipelining',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'k',
      'k/2',
      'log₂k',
      'k²'
    ],
    correctAnswer: 0,
    explanation: 'Ideally, a pipeline with k stages provides a speedup of k because k instructions can be in different stages simultaneously.',
    tags: ['Pipelining', 'Speedup', 'Performance']
  },
  {
    id: 34,
    question: 'Pipeline hazards can be classified into _____ types.',
    subject: 'Computer Organization & Architecture',
    topic: 'Pipelining',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctAnswer: 1,
    explanation: 'Pipeline hazards are classified into three types: Structural hazards, Data hazards, and Control hazards.',
    tags: ['Pipelining', 'Hazards', 'Types']
  },
  // COA - Cache Memory
  {
    id: 35,
    question: 'In cache memory, the hit ratio is defined as _____',
    subject: 'Computer Organization & Architecture',
    topic: 'Cache Memory',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Misses / Total accesses',
      'Hits / Total accesses',
      'Hits / Misses',
      'Misses / Hits'
    ],
    correctAnswer: 1,
    explanation: 'Hit ratio = Number of cache hits / Total number of memory accesses. It measures the effectiveness of the cache.',
    tags: ['Cache Memory', 'Hit Ratio', 'Performance']
  },
  {
    id: 36,
    question: 'Which cache mapping policy has the lowest miss rate?',
    subject: 'Computer Organization & Architecture',
    topic: 'Cache Memory',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'Direct Mapping',
      'Fully Associative',
      'Set Associative',
      'All have the same miss rate'
    ],
    correctAnswer: 1,
    explanation: 'Fully associative mapping has the lowest miss rate because a block can be placed in any cache line, maximizing flexibility. However, it has the highest cost and complexity.',
    tags: ['Cache Memory', 'Mapping', 'Miss Rate']
  },
  // Theory of Computation - Automata
  {
    id: 37,
    question: 'A DFA with n states can have at most _____ equivalence classes under the Myhill-Nerode theorem.',
    subject: 'Theory of Computation',
    topic: 'Finite Automata',
    year: 2021,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'n',
      'n²',
      '2^n',
      'log₂n'
    ],
    correctAnswer: 0,
    explanation: 'A DFA with n states has exactly n equivalence classes under the Myhill-Nerode relation. Each state represents an equivalence class of strings.',
    tags: ['Automata', 'DFA', 'Myhill-Nerode']
  },
  {
    id: 38,
    question: 'The language {a^n b^n | n ≥ 0} is _____',
    subject: 'Theory of Computation',
    topic: 'Context Free Languages',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Regular',
      'Context-free but not regular',
      'Context-sensitive but not context-free',
      'Recursive but not context-sensitive'
    ],
    correctAnswer: 1,
    explanation: 'The language {a^n b^n | n ≥ 0} is context-free (can be generated by a CFG) but not regular (cannot be recognized by a DFA due to the need for counting).',
    tags: ['Context Free Languages', 'Regular Languages', 'Pumping Lemma']
  },
  // Compiler Design - Parsing
  {
    id: 39,
    question: 'Which parsing technique uses a stack and input buffer?',
    subject: 'Compiler Design',
    topic: 'Syntax Analysis',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Operator Precedence Parsing',
      'LR Parsing',
      'Recursive Descent Parsing',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'All these parsing techniques use a stack and input buffer. The stack is used to store grammar symbols, and the input buffer holds the remaining input string.',
    tags: ['Parsing', 'Stack', 'Syntax Analysis']
  },
  {
    id: 40,
    question: 'Shift-reduce conflicts occur in _____ parsing.',
    subject: 'Compiler Design',
    topic: 'Bottom-Up Parsing',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'LL(1)',
      'LR(1)',
      'Recursive Descent',
      'Operator Precedence'
    ],
    correctAnswer: 1,
    explanation: 'Shift-reduce conflicts occur in LR parsing (and its variants) when the parser cannot decide whether to shift the next input symbol or reduce using a production rule.',
    tags: ['LR Parsing', 'Shift-Reduce Conflict', 'Bottom-Up Parsing']
  },
  // Engineering Mathematics - Linear Algebra
  {
    id: 41,
    question: 'The determinant of a 2×2 matrix [[a, b], [c, d]] is _____',
    subject: 'Engineering Mathematics',
    topic: 'Linear Algebra',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      'ab + cd',
      'ad - bc',
      'ac - bd',
      'ab - cd'
    ],
    correctAnswer: 1,
    explanation: 'The determinant of a 2×2 matrix [[a, b], [c, d]] is ad - bc.',
    tags: ['Linear Algebra', 'Determinant', 'Matrices']
  },
  {
    id: 42,
    question: 'A matrix is invertible if and only if its determinant is _____',
    subject: 'Engineering Mathematics',
    topic: 'Linear Algebra',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'Zero',
      'Non-zero',
      'Positive',
      'Negative'
    ],
    correctAnswer: 1,
    explanation: 'A matrix is invertible (non-singular) if and only if its determinant is non-zero. If the determinant is zero, the matrix is singular and has no inverse.',
    tags: ['Linear Algebra', 'Invertible Matrix', 'Determinant']
  },
  // Engineering Mathematics - Probability
  {
    id: 43,
    question: 'The probability of an event A is 0.6. What is the probability of its complement?',
    subject: 'Engineering Mathematics',
    topic: 'Probability',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '0.4',
      '0.6',
      '0.5',
      '1.0'
    ],
    correctAnswer: 0,
    explanation: 'The probability of the complement of an event A is P(A\') = 1 - P(A) = 1 - 0.6 = 0.4.',
    tags: ['Probability', 'Complement', 'Basic Probability']
  },
  {
    id: 44,
    question: 'Two events A and B are independent if _____',
    subject: 'Engineering Mathematics',
    topic: 'Probability',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'P(A ∩ B) = 0',
      'P(A ∩ B) = P(A) × P(B)',
      'P(A ∪ B) = 1',
      'P(A) = P(B)'
    ],
    correctAnswer: 1,
    explanation: 'Two events A and B are independent if the probability of their intersection equals the product of their individual probabilities: P(A ∩ B) = P(A) × P(B).',
    tags: ['Probability', 'Independent Events', 'Conditional Probability']
  },
  // General Aptitude - Numerical Ability
  {
    id: 45,
    question: 'If a car travels at 60 km/h for 2 hours, how far does it travel?',
    subject: 'General Aptitude',
    topic: 'Numerical Ability',
    year: 2021,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '100 km',
      '120 km',
      '150 km',
      '180 km'
    ],
    correctAnswer: 1,
    explanation: 'Distance = Speed × Time = 60 km/h × 2 h = 120 km.',
    tags: ['Numerical Ability', 'Speed Distance Time', 'Basic Arithmetic']
  },
  {
    id: 46,
    question: 'What is 15% of 200?',
    subject: 'General Aptitude',
    topic: 'Numerical Ability',
    year: 2022,
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    options: [
      '15',
      '20',
      '30',
      '35'
    ],
    correctAnswer: 2,
    explanation: '15% of 200 = (15/100) × 200 = 15 × 2 = 30.',
    tags: ['Numerical Ability', 'Percentage', 'Basic Arithmetic']
  },
  // General Aptitude - Logical Reasoning
  {
    id: 47,
    question: 'If all roses are flowers and some flowers are red, then _____',
    subject: 'General Aptitude',
    topic: 'Logical Reasoning',
    year: 2023,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      'All roses are red',
      'Some roses are red',
      'No rose is red',
      'Cannot be determined'
    ],
    correctAnswer: 3,
    explanation: 'From the given statements, we cannot determine whether any roses are red. The red flowers might not include any roses.',
    tags: ['Logical Reasoning', 'Syllogism', 'Deductive Reasoning']
  },
  {
    id: 48,
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, _____',
    subject: 'General Aptitude',
    topic: 'Series Completion',
    year: 2022,
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    options: [
      '40',
      '42',
      '44',
      '46'
    ],
    correctAnswer: 1,
    explanation: 'The pattern is: 2 = 1×2, 6 = 2×3, 12 = 3×4, 20 = 4×5, 30 = 5×6. The next number is 6×7 = 42.',
    tags: ['Series Completion', 'Number Series', 'Pattern Recognition']
  },
];

export const getQuestionsBySubject = (subject) => {
  return practiceQuestions.filter(q => q.subject === subject);
};

export const getQuestionsByTopic = (topic) => {
  return practiceQuestions.filter(q => q.topic === topic);
};

export const getQuestionsByYear = (year) => {
  return practiceQuestions.filter(q => q.year === year);
};

export const getQuestionsByDifficulty = (difficulty) => {
  return practiceQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByType = (type) => {
  return practiceQuestions.filter(q => q.type === type);
};

export const getRandomQuestions = (count) => {
  const shuffled = [...practiceQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
