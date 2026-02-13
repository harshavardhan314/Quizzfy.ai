import express from 'express';
import { generateQuiz, generateFeedback } from '../controllers/quizController.js';

const router = express.Router();

// Define routes and link to controllers
router.post('/generate-quiz', generateQuiz);
router.post('/generate-feedback', generateFeedback);

export default router;