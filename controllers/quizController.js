const Quiz = require('../models/Quiz.model');


exports.getAllQuiz = async (req, res) => {

    try {
        const quizes = await Quiz.getAllQuiz();
        if(!quizes) {
            return res.status(404).json({"status": false, "message": "Quiz not found"});
        }
        res.json(quizes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({"status": false, "message": "Error occured, Try again!"});
    }
}

exports.getQuizById = async (req, res) => {
    const {quizId} = req.params;

    try {
        const quiz = await Quiz.getQuizById(quizId);
        if(!quiz) {
            return res.status(404).json({"status": false, "message": "Quiz not found"});
        }
        res.json(quiz);
    } catch (error) {
        console.log(error);
        return res.status(500).json({"status": false, "message": "Error occured, Try again!"});
    }
}

exports.createQuiz = async (req, res) => {
    const {title, questions} = req.body;
    try {
        const newQuiz = await Quiz.createQuiz({title, questions});
        res.json(newQuiz);
    } catch (error) {
        console.log(error);
        return res.status(404).json({"status": false, "message": "Error occured, Try again"});

    }
};

exports.deleteQuizById = async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const deletedQuiz = await Quiz.deleteQuizById(quizId);
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting quiz' });
    }
  };


  exports.submitQuizAnswers = async (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body;
  
    try {
      const quiz = await Quiz.getQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correct_option) {
          score++;
        }
      });
      res.json({ score });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Error submitting quiz answers' });
    }
  };