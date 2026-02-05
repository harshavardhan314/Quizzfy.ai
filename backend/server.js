const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-quiz', async (req, res) => {
  const { topic, difficulty, count } = req.body;

  try {
    // 1. Initialize Gemini 3 Flash (2026 Preview Model)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: { 
        responseMimeType: "application/json" // Native JSON mode
      }
    });

    // 2. Clear prompt with explicit JSON instructions
    const prompt = `Generate a ${difficulty} level quiz about ${topic} with ${count} questions. 
    Return strictly a JSON array: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "Exact correct string from options"}].`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log("AI Generated Data Successfully");

    // 3. Parse and return
    const quizArray = JSON.parse(text);
    res.json(quizArray);

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Generation failed", details: error.message });
  }
});

app.post('/api/generate-feedback', async (req, res) => {
  const { quizData, userAnswers, topic } = req.body;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: { responseMimeType: "application/json" }
    });

    // Create a summary of performance for the AI
    const performanceSummary = quizData.map((q, idx) => ({
      question: q.question,
      correct: userAnswers[idx] === q.answer,
      userAnswer: userAnswers[idx] || "Skipped",
      correctAnswer: q.answer
    }));

    const prompt = `Review this quiz performance on "${topic}": ${JSON.stringify(performanceSummary)}.
    Generate a feedback report in JSON format:
    {
      "overallPerformance": "A brief summary of how they did",
      "laggingConcepts": ["Concept 1", "Concept 2"],
      "areasToImprove": ["Specific skill 1", "Specific skill 2"],
      "skippedOrWeakTopics": ["Topic 1"],
      "actionPlan": ["Step 1", "Step 2"],
      "encouragement": "A motivating closing sentence"
    }`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend live on port ${PORT}`));