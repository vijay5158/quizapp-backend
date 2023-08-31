const express = require('express');
const quizzController = require('../controllers/quizController');

const router = express.Router();

router.get('/quizzes/:quizId', quizzController.getQuizById);
router.get('/all-quizzes', quizzController.getAllQuiz);
router.post('/quizzes', quizzController.createQuiz);
router.delete('/quizzes/:quizId', quizzController.deleteQuizById);
router.post('/quizzes/:quizId/submit', quizzController.submitQuizAnswers);

module.exports = router;
