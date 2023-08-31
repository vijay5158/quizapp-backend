const db = require('../db');
const Question = require('./Question.models');

class Quiz {
    static async createQuiz({title, questions}){
        const newQuiz = await db.oneOrNone('INSERT INTO quizzes(title) VALUES($1) RETURNING id, title', [title]);
        await Question.createQuestions(questions, newQuiz.id);
        return newQuiz;
    }

    static async getAllQuiz(){
        const quiz = await db.any('SELECT * FROM quizzes');
        if(!quiz) {
            return null;
        }
        // const questions = await Question.getQuestionsByQuizId(quizId);
        // quiz.questions = questions;
        return quiz;
    }

    static async getQuizById(quizId){
        const quiz = await db.oneOrNone('SELECT * FROM quizzes WHERE id = $1', [quizId]);
        if(!quiz) {
            return null;
        }
        const questions = await Question.getQuestionsByQuizId(quizId);
        quiz.questions = questions;
        return quiz;
    }

    static async deleteQuizById(quizId) {
        await Question.deleteQuestionsByQuizId(quizId); 
        const deletedQuiz = await db.oneOrNone('DELETE FROM quizzes WHERE id = $1 RETURNING *', [quizId]);
        return deletedQuiz;
      }
}

module.exports = Quiz;
