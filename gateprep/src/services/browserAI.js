let browserAIInstance = null;
let isInitialized = false;
let isAvailable = false;

export const detectBrowserAI = () => {
  try {
    if (typeof window !== 'undefined') {
      if (window.ai && window.ai.createAssistant) {
        return true;
      }

      if (window.webkit && window.webkit.messageHandlers) {
        return true;
      }

      if (navigator.userAgentData && navigator.userAgentData.brands) {
        const isChrome = navigator.userAgentData.brands.some(
          brand => brand.brand === 'Chrome' && parseInt(brand.version) >= 131
        );
        if (isChrome) {
          return true;
        }
      }

      const chromeVersion = navigator.userAgent.match(/Chrome\/(\d+)/);
      if (chromeVersion && parseInt(chromeVersion[1]) >= 131) {
        return true;
      }
    }
  } catch (error) {
    console.error('Error detecting browser AI:', error);
  }

  return false;
};

export const initializeBrowserAI = async () => {
  if (isInitialized) {
    return { available: isAvailable, instance: browserAIInstance };
  }

  try {
    const detected = detectBrowserAI();

    if (!detected) {
      isInitialized = true;
      isAvailable = false;
      return { available: false, instance: null };
    }

    if (window.ai && window.ai.createAssistant) {
      browserAIInstance = await window.ai.createAssistant();
      isAvailable = true;
      isInitialized = true;
      return { available: true, instance: browserAIInstance };
    }

    isInitialized = true;
    isAvailable = false;
    return { available: false, instance: null };
  } catch (error) {
    console.error('Error initializing browser AI:', error);
    isInitialized = true;
    isAvailable = false;
    return { available: false, instance: null };
  }
};

export const generateAIResponse = async (prompt, options = {}) => {
  try {
    if (!isAvailable || !browserAIInstance) {
      throw new Error('Browser AI not available');
    }

    const systemPrompt = options.systemPrompt || `You are a helpful GATE CS/IT preparation assistant. Provide clear, educational explanations. Be concise and practical.`;
    const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}`;

    const response = await browserAIInstance.prompt(fullPrompt);

    return {
      success: true,
      response: response,
      source: 'browser-ai',
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    return {
      success: false,
      error: error.message,
      source: 'browser-ai',
    };
  }
};

export const generateQuestions = async (subject, topic, difficulty, count, questionType) => {
  const prompt = `Generate ${count} ${questionType.toUpperCase()} questions for GATE CS/IT exam.
Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

Format each question as:
Question: [question text]
Options: [A, B, C, D for MCQ/MSQ]
Answer: [correct answer]
Explanation: [brief explanation]

Return only the questions, no extra text.`;

  return await generateAIResponse(prompt);
};

export const explainConcept = async (concept, style = 'simple', language = 'english') => {
  const languageInstruction = language === 'hinglish' ? 'Use Hinglish (Hindi + English mix)' : 'Use English';
  const styleInstruction = style === 'simple' ? 'Keep it simple and easy to understand' : 'Provide detailed explanation';

  const prompt = `Explain the concept: "${concept}"
Instructions:
- ${languageInstruction}
- ${styleInstruction}
- Include: definition, simple explanation, example, important GATE points, common mistakes
- Format as structured sections`;

  return await generateAIResponse(prompt);
};

export const solveQuestion = async (question, options = []) => {
  const prompt = `Solve this GATE question:
Question: ${question}
${options.length > 0 ? `Options: ${options.join(', ')}` : ''}

Provide:
1. Question understanding
2. Relevant concept
3. Solution steps
4. Final answer
5. Explanation
6. Common mistakes`;

  return await generateAIResponse(prompt);
};

export const generateRevisionNotes = async (topic) => {
  const prompt = `Generate revision notes for GATE topic: ${topic}

Include:
- Key definitions
- Important concepts
- Formulas
- Examples
- Common traps
- GATE tips
- Quick checklist

Format as a structured revision sheet.`;

  return await generateAIResponse(prompt);
};

export const analyzeMistake = async (question, userAnswer, correctAnswer, topic, difficulty) => {
  const prompt = `Analyze this mistake:
Question: ${question}
User's answer: ${userAnswer}
Correct answer: ${correctAnswer}
Topic: ${topic}
Difficulty: ${difficulty}

Explain:
- What went wrong
- Correct concept
- Common misconceptions
- How to avoid this mistake
- Which topic to revise`;

  return await generateAIResponse(prompt);
};

export const generateStudyPlan = async (examDate, subjectProgress, weakTopics, revisionDue, practiceAccuracy, mockScores, availableTime) => {
  const prompt = `Generate a study plan for GATE CS/IT preparation.

Context:
- Exam date: ${examDate}
- Subject progress: ${JSON.stringify(subjectProgress)}
- Weak topics: ${weakTopics.join(', ')}
- Revision due: ${revisionDue.join(', ')}
- Practice accuracy: ${practiceAccuracy}%
- Mock scores: ${mockScores.join(', ')}
- Available study time: ${availableTime} hours/day

Generate a practical study plan with:
- Daily activities
- Subject-wise focus
- Revision schedule
- Practice recommendations
- Mock test schedule

Format as a structured plan.`;

  return await generateAIResponse(prompt);
};

export const analyzePerformance = async (analyticsData) => {
  const prompt = `Analyze GATE preparation performance:
${JSON.stringify(analyticsData, null, 2)}

Provide:
- Strengths
- Weaknesses
- Areas needing attention
- Recommendations
- What to study next`;

  return await generateAIResponse(prompt);
};

export const getBrowserAIStatus = () => {
  return {
    available: isAvailable,
    initialized: isInitialized,
    detected: detectBrowserAI(),
  };
};

export const resetBrowserAI = () => {
  browserAIInstance = null;
  isInitialized = false;
  isAvailable = false;
};
