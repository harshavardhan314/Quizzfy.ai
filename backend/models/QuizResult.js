import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    difficulty: { type: String, default: 'Beginner' },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    quizData: { type: Array, required: true },   
    userAnswers: { type: Object, required: true }, 
    aiFeedback: { type: Object },                  
    createdAt: { type: Date, default: Date.now }
});

export const QuizResult = mongoose.model('QuizResult', QuizResultSchema);