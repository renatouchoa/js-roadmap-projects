import questionSet from './questions.json' with {type: 'json'}

const quiz = {

    state: 'waiting',

    displayingQuestionIndex: 0,

    questions: [],

    score: 0,

    reset(totalQuestions) {
        this.questions = [];
        const notSelectedQuestions = [...questionSet];
        for (let i = 0; i < totalQuestions; i++) {
            const index = Math.floor(Math.random() * notSelectedQuestions.length);
            const question = notSelectedQuestions.at(index);
            notSelectedQuestions.splice(index, 1);
            const options = [];
            for (const option of question.options) {
                options.push({
                    ...option,
                    element: this.createOptionElement(question, option),
                });
            }
            question.options = options;
            this.questions.push({
                ...question,
                answer: null,
                element: this.createQuestionElement(question),
                navElement: this.createNavElement(i),
            });
        }
        this.score = 0;
        this.state = 'started';
        this.setDisplaying(0);
    },

    questionsCount() {
        return this.questions.length;
    },

    isAllQuestionsAnswered() {
        const oneNotAnsweredQuestion = this.questions.find(question => question.answer === null);
        if (oneNotAnsweredQuestion) {
            return false;
        }
        return true;
    },

    isDisplayingFirstQuestion() {
        return this.displayingQuestionIndex === 0;
    },

    isDisplayingLastQuestion() {
        return this.displayingQuestionIndex + 1 === this.questions.length;
    },

    isWaiting() {
        return this.state === 'waiting';
    },

    isStarted() {
        return this.state === 'started';
    },

    isFinished() {
        return this.state === 'finished';
    },

    getQuestion(questionId) {
        return this.questions.find(question => question.id === questionId);
    },

    setDisplaying(indexToDisplay) {
        quiz.displayingQuestionIndex = indexToDisplay;
        this.display();
    },

    displayNext() {
        if (this.displayingQuestionIndex + 1 >= this.questions.length) {
            return;
        }
        this.displayingQuestionIndex++;
        this.display();
    },

    displayPrev() {
        if (this.displayingQuestionIndex <= 0) {
            return;
        }
        this.displayingQuestionIndex--;
        this.display();
    },

    display() {
        for (const [index, question] of this.questions.entries()) {
            question.element.hidden = true;
            question.navElement.classList.remove('selected');
            if (this.displayingQuestionIndex === index) {
                question.element.hidden = false;
                question.navElement.classList.add('selected');
            }
        }
    },

    answer(questionId, answerId) {
        const question = this.getQuestion(questionId);
        question.answer = answerId;
        for (const option of question.options) {
            option.element.classList.remove('btn-secondary');
            option.element.classList.add('btn-light');
            if (answerId === option.id) {
                option.element.classList.add('btn-secondary');
                option.element.classList.remove('btn-light');
            }
        }
        question.navElement.classList.add('btn-light');
        question.navElement.classList.remove('btn-secondary');
        if (question.answer !== null) {
            question.navElement.classList.remove('btn-light');
            question.navElement.classList.add('btn-secondary');
        }
    },

    createOptionElement(question, option) {
        const optionElement = document.createElement('a');
        optionElement.className = 'btn btn-light option';
        optionElement.role = 'button';
        optionElement.textContent = option.content;
        optionElement.addEventListener('click', e => {
            e.stopPropagation();
            this.answer(question.id, option.id);
            refreshElements();
        });
        return optionElement;
    },

    createQuestionElement(question) {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        const statementElement = document.createElement('h3');
        statementElement.className = 'statement';
        statementElement.textContent = question.statement;
        questionElement.appendChild(statementElement);
        const optionsElement = document.createElement('div');
        optionsElement.className = 'options d-grid gap-2';
        for (const option of question.options) {
            optionsElement.appendChild(option.element);
        }
        questionElement.appendChild(optionsElement);
        return questionElement;
    },

    createNavElement(questionIndex) {
        const navElement = document.createElement('a');
        navElement.className = 'btn btn-light btn-sm nav-question';
        navElement.textContent = questionIndex + 1;
        navElement.addEventListener('click', e => {
            e.stopPropagation();
            this.setDisplaying(questionIndex);
            refreshElements();
        });
        return navElement;
    },

    finish() {
        if (!this.isAllQuestionsAnswered()) {
            return;
        }
        this.state = 'finished';
        this.score = 0;
        this.corrects = 0;
        this.setDisplaying(0);
        for (const question of this.questions) {
            for (const option of question.options) {
                option.element.classList.add('disabled');
                option.element.classList.add('btn-light');
                if (question.answer === option.id) {
                    option.element.classList.remove('btn-light');
                    option.element.classList.add('btn-danger');
                }
                if (question.correct === option.id) {
                    option.element.classList.remove('btn-light');
                    option.element.classList.remove('btn-danger');
                    option.element.classList.add('btn-success');
                }
            }
            question.navElement.classList.remove('btn-light');
            question.navElement.classList.remove('btn-secondary');
            if (question.correct === question.answer) {
                this.score++;
                question.navElement.classList.add('btn-success');
            } else {
                question.navElement.classList.add('btn-danger');
            }
        }
    }

}

//////////////////////////////////////////////////////////////////////

const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const finishButton = document.getElementById('finish');
const questionsContainerElement = document.getElementById('questions');
const navElement = document.getElementById('nav');
const result = document.getElementById('result');
const navCard = document.getElementById('nav-card');
const questionsCard = document.getElementById('questions-card');
const controlPrevNextContainer = document.getElementById('control-prevnext-container');

//////////////////////////////////////////////////////////////////////

function refreshElements() {
    prevButton.hidden = quiz.isDisplayingFirstQuestion();
    nextButton.hidden = quiz.isDisplayingLastQuestion();
    finishButton.hidden = !quiz.isAllQuestionsAnswered() || quiz.isFinished();
    startButton.hidden = quiz.isStarted();
    result.hidden = !quiz.isFinished();
    if (quiz.isFinished()) {
        result.textContent = `Você acertou ${quiz.score} de ${quiz.questionsCount()} questões. `;
        result.textContent += ` Nota ${(quiz.score / quiz.questionsCount() * 10).toFixed(1)}!`;
    }
    questionsCard.hidden = quiz.isWaiting();
    navCard.hidden = quiz.isWaiting();
    controlPrevNextContainer.hidden = quiz.isWaiting();
}

//////////////////////////////////////////////////////////////////////

startButton.addEventListener('click', e => {
    e.stopPropagation();
    if (quiz.isFinished() && !confirm("Iniciar novo quiz?")) {
        return;
    }
    quiz.reset(10);
    questionsContainerElement.replaceChildren();
    navElement.replaceChildren();
    for (const question of quiz.questions) {
        questionsContainerElement.appendChild(question.element);
        navElement.appendChild(question.navElement);
    }
    refreshElements();
});

nextButton.addEventListener('click', e => {
    e.stopPropagation();
    quiz.displayNext();
    refreshElements();
});

prevButton.addEventListener('click', e => {
    e.stopPropagation();
    quiz.displayPrev();
    refreshElements();
});

finishButton.addEventListener('click', e => {
    e.stopPropagation();
    if (!confirm('Deseja finalizar?')) return;
    quiz.finish();
    refreshElements();
});

window.addEventListener('load', e => {
    refreshElements();
});