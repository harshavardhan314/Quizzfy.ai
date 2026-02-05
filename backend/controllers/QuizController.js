const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to get the model instance
const getModel = () => genAI.getGenerativeModel({ 
  model: "gemini-3-flash-preview",
  generationConfig: { responseMimeType: "application/json" }
});

exports.generateQuiz = async (req, res) => {
  const { topic, difficulty, count } = req.body;

  try {
    const model = getModel();
    const prompt = `Generate a ${difficulty} level quiz about ${topic} with ${count} questions. 
    Return strictly a JSON array: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "Exact correct string from options"}].`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
    console.log(`✅ Quiz generated for topic: ${topic}`);
  } catch (error) {
    console.error("AI Quiz Error:", error.message);
    res.status(500).json({ error: "Generation failed" });
  }
};

exports.generateFeedback = async (req, res) => {
  const { quizData, userAnswers, topic } = req.body;

  try {
    const model = getModel();
    const performanceSummary = quizData.map((q, idx) => ({
      question: q.question,
      correct: userAnswers[idx] === q.answer,
      userAnswer: userAnswers[idx] || "Skipped",
      correctAnswer: q.answer
    }));

    const prompt = `Review this quiz performance on "${topic}": ${JSON.stringify(performanceSummary)}.
    Generate a feedback report in JSON format including overallPerformance, laggingConcepts, areasToImprove, skippedOrWeakTopics, actionPlan, and encouragement.`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
    console.log(`✅ Feedback generated for topic: ${topic}`);
  } catch (error) {
    console.error("AI Feedback Error:", error.message);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};