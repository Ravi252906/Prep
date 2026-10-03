import { subjectsData } from '../data/subjects';
import { topicsData } from '../data/topics';

export const generateSmartResponse = (query, context = {}) => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('explain') || lowerQuery.includes('what is')) {
    return explainConcept(query, context);
  }

  if (lowerQuery.includes('study') || lowerQuery.includes('should i')) {
    return getStudyRecommendation(context);
  }

  if (lowerQuery.includes('mistake') || lowerQuery.includes('analyze')) {
    return analyzeMistake(context);
  }

  if (lowerQuery.includes('practice') || lowerQuery.includes('question')) {
    return getPracticeRecommendation(context);
  }

  if (lowerQuery.includes('revision') || lowerQuery.includes('revise')) {
    return getRevisionRecommendation(context);
  }

  return getGeneralResponse(query, context);
};

const explainConcept = (query, context) => {
  const subject = context.subject || 'General';
  const topic = context.topic || 'This topic';

  return {
    success: true,
    response: `**${topic} Explanation**

**Definition:**
This is an important concept in ${subject} that frequently appears in GATE exams.

**Simple Explanation:**
Think of this concept as a fundamental building block. Understanding this will help you solve related problems.

**Key Points:**
• This concept is tested in both theoretical and practical questions
• Make sure you understand the underlying principles
• Practice problems to strengthen your understanding

**Common Mistakes:**
• Confusing this with similar concepts
• Not paying attention to edge cases
• Missing important conditions

**GATE Tips:**
• This topic has high weightage in recent years
• Focus on numerical problems
• Understand the standard algorithms

*Smart Study Mode: Browser AI unavailable. Using local knowledge base.*`,
    source: 'smart-study',
  };
};

const getStudyRecommendation = (context) => {
  const { practiceAccuracy = 70, weakTopics = [], revisionDue = [], mockScores = [] } = context;

  let recommendations = [];

  if (practiceAccuracy < 60) {
    recommendations.push('Focus on revision first - your accuracy needs improvement');
  }

  if (weakTopics.length > 0) {
    recommendations.push(`Priority: Revise weak topics: ${weakTopics.slice(0, 3).join(', ')}`);
  }

  if (revisionDue.length > 0) {
    recommendations.push(`Overdue revision: ${revisionDue.slice(0, 2).join(', ')}`);
  }

  if (mockScores.length > 0) {
    const latestScore = mockScores[mockScores.length - 1];
    if (latestScore > 70) {
      recommendations.push('Great mock performance! Focus on advanced practice');
    } else {
      recommendations.push('Mock scores need improvement - practice more PYQs');
    }
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue with your current study plan');
    recommendations.push('Practice mixed questions from all subjects');
  }

  return {
    success: true,
    response: `**What Should You Study Now?**

Based on your current progress:

${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

**Recommended Action:**
Start with the highest priority item above. Use the Mistake Book to review your errors, then practice similar questions.

*Smart Study Mode: Browser AI unavailable. Using rule-based recommendations.*`,
    source: 'smart-study',
  };
};

const analyzeMistake = (context) => {
  const { topic = 'General', difficulty = 'medium', userAnswer = '', correctAnswer = '' } = context;

  return {
    success: true,
    response: `**Mistake Analysis**

**What Went Wrong:**
Your answer differs from the correct answer. This suggests a conceptual gap or calculation error.

**Correct Concept:**
Focus on understanding the core principles of ${topic}. Review the standard approach for this type of problem.

**Common Misconceptions:**
• Not reading the question carefully
• Applying the wrong formula or method
• Calculation errors in numerical problems
• Missing edge cases or special conditions

**How to Avoid:**
• Read the question twice before answering
• Write down the approach step by step
• Double-check calculations
• Practice similar problems from the Mistake Book

**Topic to Revise:**
${topic} - Go to the Revision Center and review this topic thoroughly.

*Smart Study Mode: Browser AI unavailable. Using rule-based analysis.*`,
    source: 'smart-study',
  };
};

const getPracticeRecommendation = (context) => {
  const { subject = 'DBMS', topic = 'Normalization' } = context;

  return {
    success: true,
    response: `**Practice Recommendation**

**Suggested Practice:**
• Start with easy questions to build confidence
• Move to medium difficulty for ${topic}
• Attempt a few hard questions for challenge

**Recommended Topics:**
1. ${topic} (Current focus)
2. Related topics in ${subject}
3. Cross-subject topics that use this concept

**Practice Strategy:**
• Aim for 80% accuracy before moving to next topic
• Time yourself to simulate exam conditions
• Review mistakes immediately after practice

**Question Types:**
• MCQs for conceptual understanding
• NAT for numerical practice
• MSQ for comprehensive testing

*Smart Study Mode: Browser AI unavailable. Using practice guidelines.*`,
    source: 'smart-study',
  };
};

const getRevisionRecommendation = (context) => {
  const { revisionDue = [], weakTopics = [] } = context;

  const priorityTopics = [...revisionDue, ...weakTopics].slice(0, 5);

  return {
    success: true,
    response: `**Revision Recommendations**

**Priority Topics for Revision:**
${priorityTopics.length > 0
  ? priorityTopics.map((t, i) => `${i + 1}. ${t}`).join('\n')
  : 'No urgent revisions. Continue with your schedule.'}

**Revision Strategy:**
• Review formulas and key concepts
• Solve 5-10 PYQs per topic
• Check Mistake Book for related errors
• Use spaced repetition for long-term retention

**Time Allocation:**
• High priority topics: 30-45 minutes each
• Medium priority: 20-30 minutes each
• Quick review: 10-15 minutes each

**After Revision:**
• Mark topic as revised in Revision Center
• Practice a quick test to verify understanding
• Add difficult concepts to Mistake Book if needed

*Smart Study Mode: Browser AI unavailable. Using revision guidelines.*`,
    source: 'smart-study',
  };
};

const getGeneralResponse = (query, context) => {
  return {
    success: true,
    response: `**Smart Study Response**

I'm here to help with your GATE preparation! I can assist with:

**Study Guidance:**
• "What should I study today?"
• "Create a study plan"
• "How to improve accuracy?"

**Concept Help:**
• "Explain [topic]"
• "Give me practice questions"
• "Help with this mistake"

**Revision & Practice:**
• "What needs revision?"
• "Practice recommendations"
• "Topic-wise suggestions"

**Analysis:**
• "Analyze my performance"
• "Review my mistakes"
• "Mock test insights"

Try asking a specific question, and I'll provide guidance based on your progress!

*Smart Study Mode: Browser AI unavailable. Using local knowledge base.*`,
    source: 'smart-study',
  };
};

export const generateSmartQuestions = (subject, topic, difficulty, count, questionType) => {
  const questions = [];

  for (let i = 0; i < count; i++) {
    questions.push({
      id: `smart-${Date.now()}-${i}`,
      question: `Sample ${difficulty} ${questionType.toUpperCase()} question for ${subject} - ${topic}. This is a placeholder question generated by Smart Study Mode.`,
      options: questionType === 'mcq' || questionType === 'msq'
        ? ['Option A', 'Option B', 'Option C', 'Option D']
        : [],
      answer: questionType === 'mcq' ? 'A' : questionType === 'nat' ? '42' : ['A', 'B'],
      explanation: 'This is a Smart Study Mode generated question. Browser AI is unavailable.',
      topic,
      difficulty,
      type: questionType,
      isAIGenerated: true,
    });
  }

  return {
    success: true,
    questions,
    source: 'smart-study',
  };
};

export const generateSmartRevisionNotes = (topic) => {
  return {
    success: true,
    response: `**Revision Sheet: ${topic}**

**Key Definitions:**
• [Add relevant definitions here]

**Important Concepts:**
• [List key concepts]
• [Note relationships between concepts]

**Formulas:**
• [Write important formulas]
• [Note when to use each formula]

**Examples:**
• [Add 1-2 examples]
• [Show step-by-step solutions]

**Common Traps:**
• [List common mistakes]
• [Note how to avoid them]

**GATE Tips:**
• [High-weightage subtopics]
• [Frequently tested areas]
• [Quick shortcuts]

**Quick Checklist:**
□ Definitions understood
□ Formulas memorized
□ Examples practiced
 PYQs attempted
□ Mistakes reviewed

*Smart Study Mode: Browser AI unavailable. Template provided.*`,
    source: 'smart-study',
  };
};

export const generateSmartStudyPlan = (examDate, subjectProgress, weakTopics, revisionDue, practiceAccuracy, mockScores, availableTime) => {
  const daysRemaining = Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24));

  return {
    success: true,
    response: `**Smart Study Plan**

**Time Remaining:** ${daysRemaining} days
**Daily Study Time:** ${availableTime} hours

**Weekly Schedule:**

**Week 1-2: Foundation & Weak Topics**
• Focus: ${weakTopics.slice(0, 3).join(', ') || 'Core subjects'}
• Daily: 2 hours concept + 1 hour practice
• Target: Complete weak topics

**Week 3-4: PYQ Focus**
• Focus: Previous year questions
• Daily: 1 hour PYQs + 2 hours revision
• Target: 80% PYQ completion

**Week 5-6: Mock Tests & Revision**
• Focus: Full-length mock tests
• Daily: 1 mock test + analysis
• Target: Improve mock scores by 10%

**Week 7+: Final Revision**
• Focus: ${revisionDue.slice(0, 3).join(', ') || 'All subjects'}
• Daily: Revision + quick practice
• Target: Review all topics

**Daily Routine:**
• Morning: New concepts (${availableTime * 0.4}h)
• Afternoon: Practice questions (${availableTime * 0.3}h)
• Evening: Revision & mistakes (${availableTime * 0.3}h)

**Subject-wise Allocation:**
${subjectProgress.map(s => `• ${s.subject}: ${s.progress}% - ${s.progress < 50 ? 'Priority' : 'Maintain'}`).join('\n')}

**Accuracy Focus:**
Current: ${practiceAccuracy}% | Target: 85%
If below 70%, prioritize revision over new topics

*Smart Study Mode: Browser AI unavailable. Rule-based plan generated.*`,
    source: 'smart-study',
  };
};

export const generateSmartPerformanceReport = (analyticsData) => {
  const { strongSubjects = [], weakSubjects = [], practiceAccuracy = 70, mockScores = [], studyConsistency = 60 } = analyticsData;

  return {
    success: true,
    response: `**Performance Analysis Report**

**What You're Doing Well:**
${strongSubjects.length > 0
  ? strongSubjects.map(s => `• Strong performance in ${s}`).join('\n')
  : '• Consistent study effort\n• Regular practice sessions'}
${studyConsistency > 70 ? '• Good study consistency' : ''}

**What Needs Attention:**
${weakSubjects.length > 0
  ? weakSubjects.map(s => `• ${s} needs improvement`).join('\n')
  : '• Increase practice volume\n• Focus on weak topics'}
${practiceAccuracy < 70 ? '• Practice accuracy below 70%' : ''}

**What Should You Study Next:**
1. ${weakSubjects[0] || 'Your weakest subject'} - Priority focus
2. Revision of overdue topics
3. PYQs for medium-difficulty topics
4. Mock test analysis and improvement

**Suggested Weekly Focus:**
• Monday-Wednesday: Weak subjects
• Thursday-Friday: PYQ practice
• Saturday: Mock test
• Sunday: Revision & planning

**Accuracy Breakdown:**
• Current: ${practiceAccuracy}%
• Target: 85%
• Gap: ${85 - practiceAccuracy}%

**Mock Performance:**
${mockScores.length > 0
  ? `Latest: ${mockScores[mockScores.length - 1]}%\nAverage: ${(mockScores.reduce((a, b) => a + b, 0) / mockScores.length).toFixed(1)}%`
  : 'Take more mock tests for better analysis'}

**Recommendations:**
• Use Mistake Book to track errors
• Follow revision schedule strictly
• Practice timed tests regularly
• Review mock test mistakes thoroughly

*Smart Study Mode: Browser AI unavailable. Using analytics data.*`,
    source: 'smart-study',
  };
};
