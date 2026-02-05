const express = require('express');
const router = express.Router();
const quizController = require('../controllers/Quizcontroller');

// Define specific routes
router.post('/generate-quiz', quizController.generateQuiz);
router.post('/generate-feedback', quizController.generateFeedback);

module.exports = router;