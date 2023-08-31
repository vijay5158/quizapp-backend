const db = require('../db');


class Question {
    static async createQuestions(questions, quizId){
        const quetionValues = questions.map(q => `('${q.text}', '${JSON.stringify(q.options)}', ${q.correctOption}, ${quizId})`).join(', ');
        await db.none(`INSERT INTO questions(text, options, correct_option, quiz_id) VALUES ${quetionValues}`);
    }

    static async getQuestionsByQuizId(quizId){
        return db.any('SELECT * FROM questions WHERE quiz_id = $1', [quizId]);
    }
    static async deleteQuestionsByQuizId(quizId) {
        await db.none('DELETE FROM questions WHERE quiz_id = $1', [quizId]);
      }
}

module.exports = Question;