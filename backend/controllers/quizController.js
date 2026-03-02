import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-3-flash-preview";

//    Generate a quiz based on topic
export const generateQuiz = async (req, res) => {
    const { topic, difficulty, count } = req.body;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            generationConfig: { responseMimeType: "application/json" },
        });

        const prompt = `Generate a ${difficulty} level quiz about ${topic} with ${count} questions. 
        Return strictly a JSON array: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "answer": "Exact correct string from options"}].`;

        const result = await model.generateContent(prompt);
        res.status(200).json(JSON.parse(result.response.text()));
    } catch (error) {
        res.status(500).json({ error: "AI Quiz Generation Failed", message: error.message });
    }
};

//     Generate feedback based on user answers
export const generateFeedback = async (req, res) => {
    const { quizData, userAnswers, topic } = req.body;

    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
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
            "overallPerformance": "summary", 
            "laggingConcepts": [], 
            "areasToImprove": [], 
            "skippedOrWeakTopics": [], 
            "actionPlan": [], 
            "encouragement": "text" 
        }`;

        const result = await model.generateContent(prompt);
        res.status(200).json(JSON.parse(result.response.text()));
    } catch (error) {
        res.status(500).json({ error: "AI Feedback Failed", message: error.message });
    }
};