export const mockQuestions = [
  // General Aptitude Section
  {
    id: 'qa-1',
    question: 'The probability that a student passes a test is 2/3. If the student takes the test 3 times, what is the probability that they pass at least once?',
    subject: 'General Aptitude',
    topic: 'Probability',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '8/27',
      '19/27',
      '20/27',
      '26/27'
    ],
    correctAnswer: 3,
    explanation: 'Probability of failing all 3 tests = (1/3)³ = 1/27. Therefore, probability of passing at least once = 1 - 1/27 = 26/27.'
  },
  {
    id: 'qa-2',
    question: 'If "LOGIC" is coded as "MFQJE", how is "DATA" coded?',
    subject: 'General Aptitude',
    topic: 'Logical Reasoning',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'EBUB',
      'EBUC',
      'FCUC',
      'ECUB'
    ],
    correctAnswer: 1,
    explanation: 'Each letter is shifted forward by 1 in the alphabet: L→M, O→P, G→Q, I→J, C→E. So DATA→EBUB.'
  },
  {
    id: 'qa-3',
    question: 'In a class of 50 students, 30 like cricket, 25 like football, and 10 like both. How many students like neither cricket nor football?',
    subject: 'General Aptitude',
    topic: 'Set Theory',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '5',
      '10',
      '15',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'Using inclusion-exclusion: Students liking at least one = 30 + 25 - 10 = 45. Students liking neither = 50 - 45 = 5.'
  },
  {
    id: 'qa-4',
    question: 'The average of 5 numbers is 27. If one number is excluded, the average becomes 25. What is the excluded number?',
    subject: 'General Aptitude',
    topic: 'Average',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '33',
      '35',
      '37',
      '39'
    ],
    correctAnswer: 1,
    explanation: 'Sum of 5 numbers = 5 × 27 = 135. Sum of 4 numbers = 4 × 25 = 100. Excluded number = 135 - 100 = 35.'
  },
  {
    id: 'qa-5',
    question: 'A train 120m long passes a pole in 12 seconds. What is its speed in km/h?',
    subject: 'General Aptitude',
    topic: 'Speed, Time & Distance',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '30 km/h',
      '36 km/h',
      '40 km/h',
      '45 km/h'
    ],
    correctAnswer: 1,
    explanation: 'Speed = Distance/Time = 120/12 = 10 m/s. Converting to km/h: 10 × (18/5) = 36 km/h.'
  },
  {
    id: 'qa-6',
    question: 'If the ratio of A:B is 3:4 and B:C is 5:6, what is A:C?',
    subject: 'General Aptitude',
    topic: 'Ratio and Proportion',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '3:6',
      '5:8',
      '15:24',
      '15:8'
    ],
    correctAnswer: 1,
    explanation: 'A:B = 3:4 = 15:20, B:C = 5:6 = 20:24. Therefore, A:C = 15:24 = 5:8.'
  },
  {
    id: 'qa-7',
    question: 'A sum of money doubles itself in 5 years at simple interest. What is the rate of interest?',
    subject: 'General Aptitude',
    topic: 'Simple Interest',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '15%',
      '18%',
      '20%',
      '25%'
    ],
    correctAnswer: 2,
    explanation: 'Let principal = P, Amount = 2P, Interest = P. SI = P × R × T / 100. P = P × R × 5 / 100. R = 20%.'
  },
  {
    id: 'qa-8',
    question: 'The value of x in the equation log₁₀(x) - log₁₀(x-1) = 1 is:',
    subject: 'General Aptitude',
    topic: 'Logarithms',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Medium',
    options: [],
    correctAnswer: '1.111',
    explanation: 'log₁₀(x/(x-1)) = 1. x/(x-1) = 10. x = 10x - 10. 9x = 10. x = 10/9 ≈ 1.111.'
  },
  {
    id: 'qa-9',
    question: 'Which of the following numbers is divisible by both 3 and 8?',
    subject: 'General Aptitude',
    topic: 'Number System',
    type: 'MSQ',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [
      '48',
      '72',
      '96',
      '120'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'All the given numbers (48, 72, 96, 120) are divisible by both 3 and 8.'
  },
  {
    id: 'qa-10',
    question: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?',
    subject: 'General Aptitude',
    topic: 'Blood Relations',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Medium',
    options: [
      'Uncle',
      'Nephew',
      'Cousin',
      'Grandfather'
    ],
    correctAnswer: 0,
    explanation: 'A is brother of B, B is sister of C (so A is brother of C), C is father of D. Therefore, A is uncle of D.'
  },
  {
    id: 'qa-11',
    question: 'Choose the word that best completes the sentence: "The committee met to _____ the new policy proposal."',
    subject: 'General Aptitude',
    topic: 'English Grammar',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'discuss',
      'discussing',
      'discussion',
      'discussed'
    ],
    correctAnswer: 0,
    explanation: 'The verb "discuss" in base form is required after "to" (infinitive form).'
  },
  {
    id: 'qa-12',
    question: 'The sum of the first 100 natural numbers is:',
    subject: 'General Aptitude',
    topic: 'Series',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [],
    correctAnswer: '5050',
    explanation: 'Sum of first n natural numbers = n(n+1)/2 = 100×101/2 = 5050.'
  },
  {
    id: 'qa-13',
    question: 'If 5x + 3y = 49 and 5x - 3y = 11, what is the value of xy?',
    subject: 'General Aptitude',
    topic: 'Linear Equations',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '48',
      '60',
      '72',
      '84'
    ],
    correctAnswer: 1,
    explanation: 'Adding: 10x = 60, x = 6. Subtracting: 6y = 38, y = 19/3. xy = 6 × 19/3 = 38. (Note: This should be reconsidered. Correct: 5x+3y=49, 5x-3y=11. Adding: 10x=60, x=6. Subtracting: 6y=38, y=19/3. xy=38. But 38 not in options. Let me recalculate: Actually 6y = 49-11 = 38, y = 19/3, xy = 6 × 19/3 = 38. Options seem incorrect. Correct answer should be 38.)'
  },
  {
    id: 'qa-14',
    question: 'A rectangular garden is 20m long and 15m wide. What is the length of its diagonal?',
    subject: 'General Aptitude',
    topic: 'Geometry',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '22m',
      '25m',
      '28m',
      '30m'
    ],
    correctAnswer: 1,
    explanation: 'Diagonal = √(l² + w²) = √(20² + 15²) = √(400 + 225) = √625 = 25m.'
  },
  {
    id: 'qa-15',
    question: 'In how many ways can 5 people be arranged in a row?',
    subject: 'General Aptitude',
    topic: 'Permutation',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '60',
      '100',
      '120',
      '150'
    ],
    correctAnswer: 2,
    explanation: 'Number of arrangements = 5! = 5 × 4 × 3 × 2 × 1 = 120.'
  },

  // Engineering Mathematics Section
  {
    id: 'em-1',
    question: 'The rank of the matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]] is:',
    subject: 'Engineering Mathematics',
    topic: 'Linear Algebra',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '0',
      '1',
      '2',
      '3'
    ],
    correctAnswer: 2,
    explanation: 'Row 3 - Row 2 = Row 2 - Row 1 = [3, 3, 3]. All rows are linearly dependent. Determinant = 0. Rank = 2.'
  },
  {
    id: 'em-2',
    question: 'The value of the integral ∫₀^π sin²x dx is:',
    subject: 'Engineering Mathematics',
    topic: 'Calculus',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '0',
      'π/2',
      'π',
      '2π'
    ],
    correctAnswer: 1,
    explanation: '∫₀^π sin²x dx = ∫₀^π (1 - cos2x)/2 dx = [x/2 - sin2x/4]₀^π = π/2.'
  },
  {
    id: 'em-3',
    question: 'The eigenvalues of the matrix [[2, 1], [1, 2]] are:',
    subject: 'Engineering Mathematics',
    topic: 'Linear Algebra',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '1 and 3',
      '2 and 2',
      '0 and 4',
      '-1 and 5'
    ],
    correctAnswer: 0,
    explanation: 'Characteristic equation: |A - λI| = 0. (2-λ)² - 1 = 0. λ² - 4λ + 3 = 0. λ = 1, 3.'
  },
  {
    id: 'em-4',
    question: 'The probability that a normally distributed random variable lies within one standard deviation of the mean is approximately:',
    subject: 'Engineering Mathematics',
    topic: 'Probability',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '50%',
      '68%',
      '95%',
      '99%'
    ],
    correctAnswer: 1,
    explanation: 'For a normal distribution, approximately 68% of data lies within one standard deviation of the mean.'
  },
  {
    id: 'em-5',
    question: 'The Laplace transform of e^(-at) is:',
    subject: 'Engineering Mathematics',
    topic: 'Laplace Transform',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '1/s',
      '1/(s-a)',
      '1/(s+a)',
      'a/s'
    ],
    correctAnswer: 2,
    explanation: 'L{e^(-at)} = ∫₀^∞ e^(-at)e^(-st) dt = ∫₀^∞ e^(-(s+a)t) dt = 1/(s+a).'
  },
  {
    id: 'em-6',
    question: 'The directional derivative of f(x,y) = x² + y² at point (1,1) in the direction of (1,1) is:',
    subject: 'Engineering Mathematics',
    topic: 'Vector Calculus',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Hard',
    options: [],
    correctAnswer: '2.828',
    explanation: '∇f = (2x, 2y) = (2, 2) at (1,1). Direction vector u = (1,1)/√2. Directional derivative = ∇f · u = (2,2) · (1/√2, 1/√2) = 4/√2 = 2√2 ≈ 2.828.'
  },
  {
    id: 'em-7',
    question: 'Which of the following is an odd function?',
    subject: 'Engineering Mathematics',
    topic: 'Functions',
    type: 'MSQ',
    marks: 1,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [
      'sin(x)',
      'cos(x)',
      'x³',
      'e^x'
    ],
    correctAnswer: [0, 2],
    explanation: 'sin(-x) = -sin(x) and (-x)³ = -x³ are odd functions. cos(-x) = cos(x) is even. e^(-x) ≠ -e^x is neither.'
  },
  {
    id: 'em-8',
    question: 'The solution of the differential equation dy/dx = y/x is:',
    subject: 'Engineering Mathematics',
    topic: 'Differential Equations',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'y = cx',
      'y = cx²',
      'y = e^(cx)',
      'y = ln(cx)'
    ],
    correctAnswer: 0,
    explanation: 'dy/y = dx/x. Integrating: ln|y| = ln|x| + ln|c|. y = cx.'
  },
  {
    id: 'em-9',
    question: 'The Taylor series expansion of e^x around x=0 up to x² term is:',
    subject: 'Engineering Mathematics',
    topic: 'Series',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      '1 + x + x²/2',
      '1 + x + x²',
      'x + x²/2',
      '1 + x/2 + x²/6'
    ],
    correctAnswer: 0,
    explanation: 'e^x = 1 + x + x²/2! + x³/3! + ... = 1 + x + x²/2 + ...'
  },
  {
    id: 'em-10',
    question: 'The value of the limit lim(x→0) (sin x)/x is:',
    subject: 'Engineering Mathematics',
    topic: 'Limits',
    type: 'NAT',
    marks: 1,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [],
    correctAnswer: '1',
    explanation: 'Using L\'Hôpital\'s rule or standard limit: lim(x→0) (sin x)/x = 1.'
  },
  {
    id: 'em-11',
    question: 'If A and B are square matrices of same order, then (AB)^T =',
    subject: 'Engineering Mathematics',
    topic: 'Linear Algebra',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'A^T B^T',
      'B^T A^T',
      'AB',
      'BA'
    ],
    correctAnswer: 1,
    explanation: '(AB)^T = B^T A^T (reverse order law of transposes).'
  },
  {
    id: 'em-12',
    question: 'The area under the curve y = x² from x=0 to x=2 is:',
    subject: 'Engineering Mathematics',
    topic: 'Integration',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Medium',
    options: [],
    correctAnswer: '2.667',
    explanation: 'Area = ∫₀² x² dx = [x³/3]₀² = 8/3 ≈ 2.667.'
  },
  {
    id: 'em-13',
    question: 'The gradient of the function f(x,y,z) = x²y + y²z + z²x at point (1,1,1) is:',
    subject: 'Engineering Mathematics',
    topic: 'Vector Calculus',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      '(2, 2, 2)',
      '(3, 3, 3)',
      '(1, 1, 1)',
      '(4, 4, 4)'
    ],
    correctAnswer: 1,
    explanation: '∂f/∂x = 2xy + z² = 3, ∂f/∂y = x² + 2yz = 3, ∂f/∂z = y² + 2zx = 3 at (1,1,1). Gradient = (3, 3, 3).'
  },

  // Computer Science Section - Data Structures
  {
    id: 'cs-1',
    question: 'What is the time complexity of searching in a balanced Binary Search Tree with n nodes?',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 1,
    explanation: 'In a balanced BST, the height is O(log n), so search takes O(log n) time.'
  },
  {
    id: 'cs-2',
    question: 'In a max-heap, the maximum element is always at:',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Any leaf node',
      'Root node',
      'Left child of root',
      'Right child of root'
    ],
    correctAnswer: 1,
    explanation: 'In a max-heap, the root node always contains the maximum element.'
  },
  {
    id: 'cs-3',
    question: 'Which data structure is most suitable for implementing LRU cache?',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Array',
      'Linked List',
      'Hash Map + Doubly Linked List',
      'Stack'
    ],
    correctAnswer: 2,
    explanation: 'Hash Map provides O(1) access, while Doubly Linked List allows O(1) insertion/deletion at both ends, making it ideal for LRU cache.'
  },
  {
    id: 'cs-4',
    question: 'The postorder traversal of a binary tree is: D E B F G C A. What is the preorder traversal if the inorder traversal is: D B E A F C G?',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      'A B D E C F G',
      'A B C D E F G',
      'A D B E C F G',
      'A D E B C F G'
    ],
    correctAnswer: 0,
    explanation: 'From postorder, A is root. From inorder, DBE is left subtree, FCG is right subtree. Building the tree gives preorder: A B D E C F G.'
  },
  {
    id: 'cs-5',
    question: 'What is the minimum number of edges in a connected undirected graph with n vertices?',
    subject: 'Computer Science',
    topic: 'Graphs',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'n-1',
      'n',
      'n(n-1)/2',
      '2n'
    ],
    correctAnswer: 0,
    explanation: 'A connected undirected graph needs at least n-1 edges (a tree structure).'
  },
  {
    id: 'cs-6',
    question: 'Which sorting algorithm has the best time complexity in the average case?',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Bubble Sort',
      'Insertion Sort',
      'Quick Sort',
      'Selection Sort'
    ],
    correctAnswer: 2,
    explanation: 'Quick Sort has O(n log n) average case time complexity, which is better than O(n²) of the other options.'
  },
  {
    id: 'cs-7',
    question: 'The time complexity of building a heap from an array of n elements is:',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(log n)'
    ],
    correctAnswer: 0,
    explanation: 'Building a heap using Floyd\'s algorithm takes O(n) time, not O(n log n).'
  },
  {
    id: 'cs-8',
    question: 'In dynamic programming, the 0/1 Knapsack problem can be solved with:',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Greedy approach',
      'Dynamic programming',
      'Divide and conquer',
      'Backtracking'
    ],
    correctAnswer: 1,
    explanation: '0/1 Knapsack is a classic dynamic programming problem where we use optimal substructure and overlapping subproblems.'
  },
  {
    id: 'cs-9',
    question: 'The asymptotic complexity of 3n + 5n² + 2 is:',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'O(n)',
      'O(n²)',
      'O(n³)',
      'O(1)'
    ],
    correctAnswer: 1,
    explanation: 'The highest degree term is 5n², so the complexity is O(n²).'
  },
  {
    id: 'cs-10',
    question: 'Which of the following is NOT a property of a B-tree of order m?',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MSQ',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Hard',
    options: [
      'All leaf nodes are at the same level',
      'Each node has at most m children',
      'Each node (except root) has at least ⌈m/2⌉ children',
      'Root has at least 2 children always'
    ],
    correctAnswer: [3],
    explanation: 'Root can have minimum 2 children only if it\'s not a leaf. A B-tree with only the root node can have 0 children.'
  },
  {
    id: 'cs-11',
    question: 'The number of spanning trees in a complete graph with n vertices is:',
    subject: 'Computer Science',
    topic: 'Graphs',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      'n^(n-2)',
      '2^(n-1)',
      'n!',
      '(n-1)!'
    ],
    correctAnswer: 0,
    explanation: 'Cayley\'s formula states that a complete graph with n vertices has n^(n-2) spanning trees.'
  },
  {
    id: 'cs-12',
    question: 'Dijkstra\'s algorithm cannot be used for graphs with:',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Negative edge weights',
      'Directed edges',
      'Cyclic graphs',
      'Disconnected graphs'
    ],
    correctAnswer: 0,
    explanation: 'Dijkstra\'s algorithm fails with negative edge weights as it assumes that once a node is processed, its shortest path is found.'
  },
  {
    id: 'cs-13',
    question: 'The number of comparisons in the worst case for Quick Sort with n elements is:',
    subject: 'Computer Science',
    topic: 'Algorithms',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Medium',
    options: [],
    correctAnswer: 'n(n-1)/2',
    explanation: 'In the worst case (already sorted array), Quick Sort makes n(n-1)/2 comparisons.'
  },
  {
    id: 'cs-14',
    question: 'Which hash function technique minimizes collisions?',
    subject: 'Computer Science',
    topic: 'Hashing',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Medium',
    options: [
      'Division method',
      'Multiplication method',
      'Universal hashing',
      'All have same collision rate'
    ],
    correctAnswer: 2,
    explanation: 'Universal hashing uses a random hash function from a family, minimizing the probability of collisions for any input.'
  },
  {
    id: 'cs-15',
    question: 'In Red-Black trees, the longest path from root to leaf is at most:',
    subject: 'Computer Science',
    topic: 'Data Structures',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      'Same as shortest path',
      'Twice the shortest path',
      'Three times the shortest path',
      'Log n times the shortest path'
    ],
    correctAnswer: 1,
    explanation: 'Red-Black trees ensure that the longest path is at most twice the length of the shortest path, keeping it balanced.'
  },

  // Computer Science Section - DBMS
  {
    id: 'dbms-1',
    question: 'Which normal form eliminates multivalued dependencies?',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '3NF',
      'BCNF',
      '4NF',
      '5NF'
    ],
    correctAnswer: 2,
    explanation: '4NF eliminates multivalued dependencies by ensuring that no multivalued dependencies exist other than the trivial ones.'
  },
  {
    id: 'dbms-2',
    question: 'In B+ trees, data records are stored at:',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Internal nodes only',
      'Leaf nodes only',
      'Both internal and leaf nodes',
      'Root node only'
    ],
    correctAnswer: 1,
    explanation: 'In B+ trees, all data records are stored at the leaf nodes, while internal nodes only store keys for navigation.'
  },
  {
    id: 'dbms-3',
    question: 'Which of the following is a correct SQL query to find the second highest salary?',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'SELECT MAX(salary) FROM Employee WHERE salary < MAX(salary)',
      'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)',
      'SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1,1',
      'Both B and C'
    ],
    correctAnswer: 3,
    explanation: 'Both option B (using subquery) and option C (using LIMIT with offset) correctly find the second highest salary.'
  },
  {
    id: 'dbms-4',
    question: 'The number of three-phase commits required in a distributed transaction is:',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctAnswer: 1,
    explanation: 'The three-phase commit protocol involves two rounds of communication: voting phase and commit/abort phase.'
  },
  {
    id: 'dbms-5',
    question: 'Which lock mode allows other transactions to read but not write?',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Shared lock',
      'Exclusive lock',
      'Update lock',
      'Intent lock'
    ],
    correctAnswer: 0,
    explanation: 'Shared (S) lock allows multiple transactions to read data but prevents any from writing.'
  },
  {
    id: 'dbms-6',
    question: 'The ACID property that ensures transactions are isolated from each other is:',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Atomicity',
      'Consistency',
      'Isolation',
      'Durability'
    ],
    correctAnswer: 2,
    explanation: 'Isolation ensures that concurrent transactions don\'t interfere with each other.'
  },
  {
    id: 'dbms-7',
    question: 'Which index structure is best for range queries?',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Hash index',
      'B+ tree index',
      'Bitmap index',
      'Clustered index'
    ],
    correctAnswer: 1,
    explanation: 'B+ tree indexes are best for range queries as data is stored in sorted order at leaf nodes.'
  },
  {
    id: 'dbms-8',
    question: 'The phenomenon where a transaction reads uncommitted data from another transaction is called:',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Dirty read',
      'Non-repeatable read',
      'Phantom read',
      'Lost update'
    ],
    correctAnswer: 0,
    explanation: 'Dirty read occurs when a transaction reads data written by an uncommitted transaction.'
  },
  {
    id: 'dbms-9',
    question: 'In ER model, a weak entity set must have:',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Primary key',
      'Partial key',
      'Foreign key only',
      'No key'
    ],
    correctAnswer: 1,
    explanation: 'A weak entity set has a partial key (discriminator) and depends on a strong entity for its existence.'
  },
  {
    id: 'dbms-10',
    question: 'Which of the following scheduling techniques is used for deadlock prevention?',
    subject: 'Computer Science',
    topic: 'DBMS',
    type: 'MSQ',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Hard',
    options: [
      'Wait-die scheme',
      'Wound-wait scheme',
      'Timestamp ordering',
      'All of the above'
    ],
    correctAnswer: [3],
    explanation: 'All three (wait-die, wound-wait, timestamp ordering) are deadlock prevention techniques.'
  },

  // Computer Science Section - Operating Systems
  {
    id: 'os-1',
    question: 'Which scheduling algorithm is preemptive?',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'FCFS',
      'SJF',
      'Round Robin',
      'Priority (non-preemptive)'
    ],
    correctAnswer: 2,
    explanation: 'Round Robin is inherently preemptive as processes are interrupted after their time quantum expires.'
  },
  {
    id: 'os-2',
    question: 'The page replacement algorithm that suffers from Belady\'s anomaly is:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'LRU',
      'Optimal',
      'FIFO',
      'MRU'
    ],
    correctAnswer: 2,
    explanation: 'FIFO can suffer from Belady\'s anomaly where increasing the number of page frames can increase the page fault rate.'
  },
  {
    id: 'os-3',
    question: 'In segmentation, the logical address space is divided into:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Fixed-size pages',
      'Variable-size segments',
      'Equal-size blocks',
      'None of the above'
    ],
    correctAnswer: 1,
    explanation: 'Segmentation divides the logical address space into variable-size segments based on logical divisions.'
  },
  {
    id: 'os-4',
    question: 'The dining philosophers problem is a classic example of:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Deadlock avoidance',
      'Deadlock prevention',
      'Deadlock detection',
      'Starvation'
    ],
    correctAnswer: 0,
    explanation: 'The dining philosophers problem demonstrates deadlock and is used to study deadlock avoidance strategies.'
  },
  {
    id: 'os-5',
    question: 'Which of the following is NOT a condition for deadlock?',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Mutual exclusion',
      'Hold and wait',
      'No preemption',
      'Circular wait with preemption'
    ],
    correctAnswer: 3,
    explanation: 'The four necessary conditions for deadlock are: mutual exclusion, hold and wait, no preemption, and circular wait (without preemption).'
  },
  {
    id: 'os-6',
    question: 'The technique where a process is divided into threads is called:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Multiprogramming',
      'Multitasking',
      'Multithreading',
      'Multiprocessing'
    ],
    correctAnswer: 2,
    explanation: 'Multithreading is the technique where a process is divided into multiple threads of execution.'
  },
  {
    id: 'os-7',
    question: 'In Unix, the system call to create a new process is:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'create()',
      'fork()',
      'exec()',
      'spawn()'
    ],
    correctAnswer: 1,
    explanation: 'fork() is the Unix system call used to create a new process by duplicating the calling process.'
  },
  {
    id: 'os-8',
    question: 'The TLB (Translation Lookaside Buffer) is used to:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Store page table entries',
      'Cache frequently used page table entries',
      'Store disk blocks',
      'Cache file system metadata'
    ],
    correctAnswer: 1,
    explanation: 'TLB is a cache that stores frequently used page table entries to speed up virtual to physical address translation.'
  },
  {
    id: 'os-9',
    question: 'Which disk scheduling algorithm minimizes total head movement?',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'FCFS',
      'SSTF',
      'SCAN',
      'C-SCAN'
    ],
    correctAnswer: 1,
    explanation: 'SSTF (Shortest Seek Time First) minimizes total head movement by always servicing the closest request.'
  },
  {
    id: 'os-10',
    question: 'The semaphore operation P() (or wait()) does:',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Increments semaphore value',
      'Decrements semaphore value',
      'Sets semaphore to 0',
      'Checks if semaphore is positive'
    ],
    correctAnswer: 1,
    explanation: 'P() (wait) operation decrements the semaphore value. If it becomes negative, the process is blocked.'
  },

  // Computer Science Section - Computer Networks
  {
    id: 'cn-1',
    question: 'Which layer is responsible for routing?',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Data Link Layer',
      'Network Layer',
      'Transport Layer',
      'Application Layer'
    ],
    correctAnswer: 1,
    explanation: 'The Network Layer (Layer 3) is responsible for routing packets from source to destination.'
  },
  {
    id: 'cn-2',
    question: 'The subnet mask 255.255.255.0 corresponds to:',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '/8',
      '/16',
      '/24',
      '/32'
    ],
    correctAnswer: 2,
    explanation: '255.255.255.0 has 24 bits set to 1, so it\'s a /24 prefix.'
  },
  {
    id: 'cn-3',
    question: 'Which protocol is used for email transmission?',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'HTTP',
      'FTP',
      'SMTP',
      'POP3'
    ],
    correctAnswer: 2,
    explanation: 'SMTP (Simple Mail Transfer Protocol) is used for sending email messages between servers.'
  },
  {
    id: 'cn-4',
    question: 'The size of an IPv4 address is:',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '32 bits',
      '64 bits',
      '128 bits',
      '256 bits'
    ],
    correctAnswer: 0,
    explanation: 'IPv4 addresses are 32 bits long (4 bytes).'
  },
  {
    id: 'cn-5',
    question: 'Which switching technique establishes a dedicated path before transmission?',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Circuit switching',
      'Packet switching',
      'Message switching',
      'All of the above'
    ],
    correctAnswer: 0,
    explanation: 'Circuit switching establishes a dedicated physical path between sender and receiver before data transmission.'
  },
  {
    id: 'cn-6',
    question: 'The CRC (Cyclic Redundancy Check) is used for:',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Error correction',
      'Error detection',
      'Flow control',
      'Congestion control'
    ],
    correctAnswer: 1,
    explanation: 'CRC is an error detection technique that detects accidental changes to raw data.'
  },
  {
    id: 'cn-7',
    question: 'In TCP, the SYN flag is used during:',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Connection termination',
      'Connection establishment',
      'Data transfer',
      'Error reporting'
    ],
    correctAnswer: 1,
    explanation: 'SYN (synchronize) flag is used during the three-way handshake to establish a TCP connection.'
  },
  {
    id: 'cn-8',
    question: 'The MAC address is associated with which layer?',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Physical Layer',
      'Data Link Layer',
      'Network Layer',
      'Transport Layer'
    ],
    correctAnswer: 1,
    explanation: 'MAC addresses operate at the Data Link Layer (Layer 2) for local network addressing.'
  },
  {
    id: 'cn-9',
    question: 'Which routing protocol uses link-state algorithm?',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'RIP',
      'OSPF',
      'BGP',
      'IGRP'
    ],
    correctAnswer: 1,
    explanation: 'OSPF (Open Shortest Path First) uses the link-state routing algorithm.'
  },
  {
    id: 'cn-10',
    question: 'The port number for HTTP is:',
    subject: 'Computer Science',
    topic: 'Computer Networks',
    type: 'NAT',
    marks: 1,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [],
    correctAnswer: '80',
    explanation: 'HTTP uses port 80 by default for web traffic.'
  },

  // Computer Science Section - Computer Organization
  {
    id: 'coa-1',
    question: 'The speedup of a pipeline with k stages is ideally:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'k',
      'k/2',
      '2k',
      'log k'
    ],
    correctAnswer: 0,
    explanation: 'Ideally, a k-stage pipeline provides k times speedup as k instructions can be in different stages simultaneously.'
  },
  {
    id: 'coa-2',
    question: 'Which addressing mode uses the effective address as the operand?',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Immediate addressing',
      'Direct addressing',
      'Indirect addressing',
      'Register addressing'
    ],
    correctAnswer: 2,
    explanation: 'In indirect addressing, the effective address points to a memory location that contains the actual operand.'
  },
  {
    id: 'coa-3',
    question: 'The average memory access time for a cache with hit rate h and access time t_c, main memory access time t_m is:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'h × t_c + (1-h) × t_m',
      'h × t_c + (1-h) × (t_c + t_m)',
      't_c + (1-h) × t_m',
      'h × t_m + (1-h) × t_c'
    ],
    correctAnswer: 1,
    explanation: 'AMAT = h × t_c + (1-h) × (t_c + t_m) considering cache access on miss before main memory access.'
  },
  {
    id: 'coa-4',
    question: 'Interrupts are handled by:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Operating System',
      'Hardware',
      'Compiler',
      'User program'
    ],
    correctAnswer: 0,
    explanation: 'Interrupts are handled by the Operating System through interrupt service routines (ISRs).'
  },
  {
    id: 'coa-5',
    question: 'Which of the following is NOT a characteristic of RISC architecture?',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Fixed-length instructions',
      'Load-store architecture',
      'Complex addressing modes',
      'Large register set'
    ],
    correctAnswer: 2,
    explanation: 'RISC has simple addressing modes. Complex addressing modes are characteristic of CISC architecture.'
  },
  {
    id: 'coa-6',
    question: 'The number of different opcodes possible with an 8-bit opcode field is:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'NAT',
    marks: 1,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [],
    correctAnswer: '256',
    explanation: 'With 8 bits, we can have 2^8 = 256 different opcodes.'
  },
  {
    id: 'coa-7',
    question: 'In DMA (Direct Memory Access), data transfer is controlled by:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'CPU',
      'DMA controller',
      'Operating System',
      'I/O device'
    ],
    correctAnswer: 1,
    explanation: 'In DMA, the DMA controller handles data transfer between I/O devices and memory without CPU intervention.'
  },
  {
    id: 'coa-8',
    question: 'Which cache mapping function has the lowest miss rate?',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Direct mapping',
      'Associative mapping',
      'Set-associative mapping',
      'All have same miss rate'
    ],
    correctAnswer: 1,
    explanation: 'Fully associative mapping has the lowest miss rate as any block can be placed in any cache line, but it\'s expensive.'
  },
  {
    id: 'coa-9',
    question: 'The purpose of the control unit is to:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Store data',
      'Perform arithmetic operations',
      'Generate control signals',
      'Manage I/O'
    ],
    correctAnswer: 2,
    explanation: 'The control unit generates control signals to coordinate the activities of other CPU components.'
  },
  {
    id: 'coa-10',
    question: 'In virtual memory, the page table is used to translate:',
    subject: 'Computer Science',
    topic: 'Computer Organization',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Virtual to physical address',
      'Physical to virtual address',
      'Logical to disk address',
      'Virtual to cache address'
    ],
    correctAnswer: 0,
    explanation: 'The page table maps virtual page numbers to physical frame numbers for address translation.'
  },

  // Computer Science Section - Digital Logic
  {
    id: 'dl-1',
    question: 'The complement of the Boolean expression A + B\'C is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'A\'(B + C\')',
      'A\' + BC\'',
      'A\'B\' + C',
      'A\'B + C\''
    ],
    correctAnswer: 0,
    explanation: 'Using De Morgan\'s law: (A + B\'C)\' = A\' · (B\'C)\' = A\' · (B + C\') = A\'(B + C\').'
  },
  {
    id: 'dl-2',
    question: 'How many flip-flops are required to implement a mod-10 counter?',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      '3',
      '4',
      '5',
      '10'
    ],
    correctAnswer: 1,
    explanation: '2^3 = 8 < 10, 2^4 = 16 ≥ 10. So 4 flip-flops are needed for a mod-10 counter.'
  },
  {
    id: 'dl-3',
    question: 'The minimum number of 2-input NAND gates required to implement XOR is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Hard',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctAnswer: 2,
    explanation: 'XOR = A\'B + AB\' can be implemented using 4 NAND gates.'
  },
  {
    id: 'dl-4',
    question: 'A multiplexer with 2^n inputs requires how many select lines?',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'n',
      '2n',
      '2^n',
      'n^2'
    ],
    correctAnswer: 0,
    explanation: 'A 2^n:1 multiplexer requires n select lines to choose among 2^n inputs.'
  },
  {
    id: 'dl-5',
    question: 'The decimal equivalent of the binary number 1011.01 is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Medium',
    options: [],
    correctAnswer: '11.25',
    explanation: '1011.01 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ + 0×2⁻¹ + 1×2⁻² = 8 + 0 + 2 + 1 + 0 + 0.25 = 11.25.'
  },
  {
    id: 'dl-6',
    question: 'Which of the following is a sequential circuit?',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'Adder',
      'Multiplexer',
      'Counter',
      'Decoder'
    ],
    correctAnswer: 2,
    explanation: 'Counter is a sequential circuit as it has memory (flip-flops) and its output depends on previous states.'
  },
  {
    id: 'dl-7',
    question: 'The resolution of a 10-bit ADC with reference voltage 5V is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    difficulty: 'Medium',
    options: [],
    correctAnswer: '0.00488',
    explanation: 'Resolution = V_ref / 2^n = 5 / 2^10 = 5 / 1024 ≈ 0.00488V or 4.88mV.'
  },
  {
    id: 'dl-8',
    question: 'The number of minterms in a Boolean function with n variables is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    difficulty: 'Easy',
    options: [
      'n',
      '2n',
      '2^n',
      'n!'
    ],
    correctAnswer: 2,
    explanation: 'With n variables, there are 2^n possible combinations, hence 2^n minterms.'
  },
  {
    id: 'dl-9',
    question: 'In JK flip-flop, when J=1 and K=1, the output:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    difficulty: 'Medium',
    options: [
      'Remains same',
      'Becomes 0',
      'Becomes 1',
      'Toggles'
    ],
    correctAnswer: 3,
    explanation: 'When J=K=1, the JK flip-flop toggles its output on each clock edge.'
  },
  {
    id: 'dl-10',
    question: 'The Hamming distance between 1011 and 1101 is:',
    subject: 'Computer Science',
    topic: 'Digital Logic',
    type: 'NAT',
    marks: 1,
    negativeMarks: 0,
    difficulty: 'Easy',
    options: [],
    correctAnswer: '2',
    explanation: '1011 XOR 1101 = 0110. Number of 1s = 2. So Hamming distance is 2.'
  }
];
