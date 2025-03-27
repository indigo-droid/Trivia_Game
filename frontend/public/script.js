// DOM Elements
const quizContainer = document.getElementById('quiz-container');
let questions = [];
let score = 0;
let currentQuestionIndex = 0;
let acceptingAnswers = false;
const API_URL = '/api/questions';

// 1. First define ALL functions that will be called by other functions

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

function showError(message) {
    quizContainer.innerHTML = `
        <div class="error-message">
            <h3>⚠️ Error Loading Quiz</h3>
            <p>${message}</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
        </div>
    `;
}

// Answer selection handler - DEFINED BEFORE IT'S USED
function selectAnswer(e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    
    const selectedButton = e.target;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    // Highlight correct and incorrect answers
    Array.from(document.getElementById('options').children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });
    
    // Check if correct
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add('selected');
        score++;
        updateScore();
    } else {
        selectedButton.classList.add('incorrect');
    }
    
    document.getElementById('next-btn').disabled = false;
}

function showQuestion() {
    acceptingAnswers = true;
    const currentQuestion = questions[currentQuestionIndex];
    
    document.getElementById('question').textContent = currentQuestion.question.text;
    document.getElementById('category').textContent = `Category: ${currentQuestion.category}`;
    
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    
    // Combine and shuffle answers
    const allAnswers = [
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers
    ].sort(() => Math.random() - 0.5);
    
    // Create answer buttons
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = answer;
        button.addEventListener('click', selectAnswer); // Now selectAnswer is defined
        optionsElement.appendChild(button);
    });
    
    document.getElementById('next-btn').disabled = true;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.innerHTML = `
        <div class="quiz-complete">
            <h2>Quiz Complete!</h2>
            <p>Your score: ${score}/${questions.length}</p>
            <button onclick="window.location.reload()">Play Again</button>
        </div>
    `;
}

// 2. Then define API/initialization functions

async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        return data.length ? data : [getFallbackQuestion()];
    } catch (error) {
        console.error("Fetch error:", error);
        return [getFallbackQuestion()];
    }
}

function getFallbackQuestion() {
    return {
        question: { text: "What is the capital of France?" },
        correctAnswer: "Paris",
        incorrectAnswers: ["London", "Berlin", "Madrid"],
        category: "Geography"
    };
}

async function initQuiz() {
    try {
        questions = await fetchQuestions();
        startQuiz();
    } catch (error) {
        showError(error.message);
    }
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    document.getElementById('loading').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    showQuestion();
}

// 3. Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    initQuiz();
});