import connectDB from './database/db.js'; 
import express from 'express';           
import cors from 'cors';                 
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Connect to MongoDB Atlas
connectDB();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- QUIZ GENERATION ENDPOINT ---
app.post('/api/generate-quiz', async (req, res) => {
  const { topic, difficulty, count } = req.body;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Updated to current stable 1.5-flash
      generationConfig: { 
        responseMimeType: "application/json" 
      }
    });

    const prompt = `Generate a ${difficulty} level quiz about ${topic} with ${count} questions. 
    Return strictly a JSON array: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "Exact correct string from options"}].`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log("AI Generated Data Successfully");
    res.json(JSON.parse(text));

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Generation failed", details: error.message });
  }
});

// --- FEEDBACK ENDPOINT ---
app.post('/api/generate-feedback', async (req, res) => {
  const { quizData, userAnswers, topic } = req.body;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const performanceSummary = quizData.map((q, idx) => ({
      question: q.question,
      correct: userAnswers[idx] === q.answer,
      userAnswer: userAnswers[idx] || "Skipped",
      correctAnswer: q.answer
    }));

    const prompt = `Review this quiz performance on "${topic}": ${JSON.stringify(performanceSummary)}.
    Generate a feedback report in JSON format:
    {
      "overallPerformance": "summary",
      "laggingConcepts": [],
      "areasToImprove": [],
      "skippedOrWeakTopics": [],
      "actionPlan": [],
      "encouragement": "text"
    }`;

    const result = await model.generateContent(prompt);
    res.json(JSON.parse(result.response.text()));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend live on port ${PORT}`));