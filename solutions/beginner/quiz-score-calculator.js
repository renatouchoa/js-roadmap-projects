function isAnswerCorrect(question, userAnswer) {
    return question.correctAnswer === userAnswer;
}

function countCorrectAnswers(questions, userAnswers) {
    let counter = 0;
    userAnswers.forEach(userAnswer => {
        const question = questions.find(question => question.id === userAnswer.questionId);
        if (isAnswerCorrect(question, userAnswer.answer)) {
            counter++;
        }
    });
    return counter;
}

function calculatePercentage(correctCount, totalQuestions) {
    if (totalQuestions === 0) return 0;
    return correctCount / totalQuestions * 100.0;
}

function getResultMessage(percentage) {
    if (percentage >= 80) return 'Great work';
    if (percentage >= 60) return 'You passed';
    return 'Keep practicing';
}

function createQuizResult(questions, userAnswers) {
    const correctCount = countCorrectAnswers(questions, userAnswers);
    const totalQuestions = questions.length;
    const percentage = calculatePercentage(correctCount, totalQuestions);
    return {
        correctCount,
        totalQuestions,
        percentage,
        message: getResultMessage(percentage),
    };
}

// Sample checks...

const questions = [
    { id: 1, correctAnswer: 'B' },
    { id: 2, correctAnswer: 'A' },
    { id: 3, correctAnswer: 'D' },
    { id: 4, correctAnswer: 'C' },
];
const userAnswers = [
    { questionId: 1, answer: 'B' },
    { questionId: 2, answer: 'C' },
    { questionId: 3, answer: 'D' },
    { questionId: 4, answer: 'C' },
];
console.log(createQuizResult(questions, userAnswers));
console.log(countCorrectAnswers(questions, userAnswers));
console.log(calculatePercentage(3, questions.length));
const partialAnswers = [{ questionId: 1, answer: 'B' }];
console.log(createQuizResult(questions, partialAnswers));