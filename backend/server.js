import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from './database/db.js';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini 3 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const QUIZ_MODEL = "gemini-3-flash-preview";

/**
 * @route   POST /api/generate-quiz
 * @desc    Generates a quiz using Gemini AI
 */
app.post("/api/generate-quiz", async (req, res) => {
    const { topic, difficulty, count } = req.body;

    try {
        const model = genAI.getGenerativeModel({
            model: QUIZ_MODEL,
            generationConfig: { responseMimeType: "application/json" },
        });

        const prompt = `Generate a ${difficulty} level quiz about ${topic} with ${count} questions. 
        Return strictly a JSON array: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "Exact correct string from options"}].`;

        const result = await model.generateContent(prompt);
        const quizArray = JSON.parse(result.response.text());

        console.log(`✅ Quiz generated for topic: ${topic}`);
        res.json(quizArray);
    } catch (error) {
        console.error("❌ AI Quiz Error:", error.message);
        res.status(500).json({ error: "Generation failed", details: error.message });
    }
});


app.post("/api/generate-feedback", async (req, res) => {
    const { quizData, userAnswers, topic } = req.body;

    try {
        const model = genAI.getGenerativeModel({
            model: QUIZ_MODEL,
            generationConfig: { responseMimeType: "application/json" },
        });

        const performanceSummary = quizData.map((q, idx) => ({
            question: q.question,
            correct: userAnswers[idx] === q.answer,
            userAnswer: userAnswers[idx] || "Skipped",
            correctAnswer: q.answer,
        }));

        const prompt = `Review this quiz performance on "${topic}": ${JSON.stringify(performanceSummary)}. 
        Generate a feedback report in JSON format: 
        { 
            "overallPerformance": "...", 
            "laggingConcepts": [], 
            "areasToImprove": [], 
            "skippedOrWeakTopics": [], 
            "actionPlan": [], 
            "encouragement": "..." 
        }`;

        const result = await model.generateContent(prompt);
        console.log("✅ Feedback generated successfully");
        res.json(JSON.parse(result.response.text()));
    } catch (error) {
        console.error("❌ AI Feedback Error:", error.message);
        res.status(500).json({ error: "Failed to generate feedback" });
    }
});

app.listen(PORT, () => console.log(`🚀 Backend live on port ${PORT}`));