import express from 'express';
import { generateQuiz, generateFeedback, getQuizHistory } from '../controllers/quizController.js';

const router = express.Router();

router.post('/generate-quiz', generateQuiz);
router.post('/generate-feedback', generateFeedback);
router.get('/quiz/history', getQuizHistory); 

export default router;