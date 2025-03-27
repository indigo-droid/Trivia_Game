const API_URL = '/api/questions';

// DOM elements
const quizContent = document.getElementById('quiz-content');
const loadingElement = document.getElementById('loading');
const questionElement = document.getElementById('question');
const categoryElement = document.getElementById('category');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Quiz state
let currentQuestion = {};
let questions = [];
let score = 0;
let acceptingAnswers = false;
let currentQuestionIndex = 0;

async function fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

function showQuestion() {
    acceptingAnswers = true;
    currentQuestion = questions[currentQuestionIndex];
    
    questionElement.innerText = currentQuestion.question.text;
    categoryElement.innerText = `Category: ${currentQuestion.category}`;
    
    const options = [
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers
    ].sort(() => Math.random() - 0.5);
    
    optionsElement.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', selectAnswer);
        optionsElement.appendChild(button);
    });
    
    nextButton.disabled = true;
    nextButton.innerText = 'Next Question';
}

function selectAnswer(e) {
    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedButton = e.target;
    const correctAnswer = currentQuestion.correctAnswer;
    
    Array.from(optionsElement.children).forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    if (selectedButton.innerText === correctAnswer) {
        selectedButton.classList.add('selected');
        score++;
        scoreElement.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add('incorrect');
    }
    
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        quizContent.style.display = 'none';
        loadingElement.style.display = 'block';
        loadingElement.innerText = `Quiz completed! Your final score is ${score}/${questions.length}`;
    }
}

async function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.innerText = `Score: ${score}`;
    
    questions = await fetchQuestions();
    if (questions.length === 0) {
        loadingElement.innerText = "Failed to load questions. Please try again later.";
        return;
    }

    loadingElement.style.display = 'none';
    quizContent.style.display = 'block';
    
    nextButton.addEventListener('click', nextQuestion);
    showQuestion();
}

document.addEventListener('DOMContentLoaded', startQuiz);