export const assistantKnowledgeData = {
  gateOverview: {
    exam: 'GATE CS/IT',
    duration: '3 hours',
    totalMarks: 100,
    questionTypes: ['MCQ (1 or 2 marks)', 'MSQ (1 or 2 marks)', 'NAT (1 or 2 marks)'],
    subjects: [
      'DBMS',
      'Operating Systems',
      'Algorithms',
      'Computer Networks',
      'Computer Organization',
      'Discrete Mathematics',
    ],
  },

  suggestedPrompts: [
    'Explain deadlock in simple language',
    'Explain normalization in Hinglish',
    'Give me 5 DBMS MCQs',
    'Explain this GATE question',
    'Create revision notes for CPU scheduling',
    'What should I study today?',
    'Analyze my recent mistakes',
    'Help me understand dynamic programming',
    'Generate practice questions for TCP',
    'Explain cache memory with examples',
  ],

  aiModes: [
    { id: 'explain', name: 'Explain', description: 'Get detailed explanations of concepts' },
    { id: 'solve', name: 'Solve', description: 'Solve GATE questions step by step' },
    { id: 'hint', name: 'Hint', description: 'Get progressive hints for problems' },
    { id: 'practice', name: 'Practice', description: 'Generate practice questions' },
    { id: 'pyq', name: 'PYQ', description: 'Get help with previous year questions' },
    { id: 'revise', name: 'Revise', description: 'Generate revision notes' },
    { id: 'formula', name: 'Formula', description: 'Understand formulas and their usage' },
    { id: 'plan', name: 'Plan', description: 'Create study plans' },
    { id: 'analyze', name: 'Analyze', description: 'Analyze performance and mistakes' },
  ],

  languageOptions: [
    { id: 'english', name: 'English' },
    { id: 'hinglish', name: 'Hinglish' },
  ],

  explanationStyles: [
    { id: 'simple', name: 'Simple' },
    { id: 'detailed', name: 'Detailed' },
  ],

  responseStyles: [
    { id: 'short', name: 'Short' },
    { id: 'normal', name: 'Normal' },
    { id: 'detailed', name: 'Detailed' },
  ],

  hintProgression: {
    1: 'Think about the fundamental definition or property involved in this problem.',
    2: 'Consider which formula or algorithm applies to this type of problem.',
    3: 'Here\'s the key insight: [partial solution hint]. Try to complete it from here.',
  },

  conceptExplanationTemplate: `
**Concept: {concept}**

**Definition:**
{definition}

**Simple Explanation:**
{simpleExplanation}

**Key Points:**
• {point1}
• {point2}
• {point3}

**Example:**
{example}

**Important GATE Points:**
• {gatePoint1}
• {gatePoint2}

**Common Mistakes:**
• {mistake1}
• {mistake2}

**Quick Revision:**
{quickRevision}
  `,

  questionSolutionTemplate: `
**Question Analysis:**
{questionUnderstanding}

**Relevant Concept:**
{concept}

**Solution Steps:**
1. {step1}
2. {step2}
3. {step3}

**Final Answer:**
{answer}

**Explanation:**
{explanation}

**Common Mistakes:**
• {mistake1}
• {mistake2}

**Related Topics:**
{relatedTopics}
  `,

  revisionSheetTemplate: `
**Revision Sheet: {topic}**

**Definitions:**
{definitions}

**Important Concepts:**
{concepts}

**Formulas:**
{formulas}

**Examples:**
{examples}

**Common Traps:**
{traps}

**GATE Tips:**
{tips}

**Quick Checklist:**
{checklist}
  `,

  studyPlanTemplate: `
**Study Plan for GATE CS/IT**

**Timeline:**
{timeline}

**Weekly Breakdown:**
{weeklyPlan}

**Daily Routine:**
{dailyRoutine}

**Subject-wise Focus:**
{subjectFocus}

**Milestones:**
{milestones}

**Tips:**
{tips}
  `,

  performanceAnalysisTemplate: `
**Performance Analysis**

**Strengths:**
{strengths}

**Areas for Improvement:**
{weaknesses}

**What's Working Well:**
{positivePoints}

**What Needs Attention:**
{attentionAreas}

**Recommended Actions:**
{recommendations}

**Study Focus:**
{studyFocus}
  `,
};

export const getSuggestedPrompt = (category) => {
  const categoryPrompts = {
    concept: assistantKnowledgeData.suggestedPrompts.slice(0, 2),
    practice: assistantKnowledgeData.suggestedPrompts.slice(2, 4),
    revision: assistantKnowledgeData.suggestedPrompts.slice(4, 5),
    general: assistantKnowledgeData.suggestedPrompts.slice(5, 7),
  };
  return categoryPrompts[category] || assistantKnowledgeData.suggestedPrompts;
};

export const getAIMode = (modeId) => {
  return assistantKnowledgeData.aiModes.find(m => m.id === modeId);
};
