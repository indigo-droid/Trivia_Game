// DOM Elements
const quizContainer = document.getElementById('quiz-container');
let questions = [];
let score = 0;
let currentQuestionIndex = 0;
let acceptingAnswers = false;
const API_URL = '/api/questions';

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Show an error message on failure
function showError(message) {
    document.body.insertAdjacentHTML('afterbegin', `
        <div class="error-message">
            <h3>⚠️ Error Loading Quiz</h3>
            <p>${message}</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
        </div>
    `);
}

// Answer selection handler
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

    // Apply correct/incorrect styling
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add('selected');
        score++;
        updateScore();
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Enable "Next Question" button
    document.getElementById('next-btn').disabled = false;
}

// Display a question
function showQuestion() {
    acceptingAnswers = true;
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById('question').textContent = currentQuestion.question.text;
    document.getElementById('category').textContent = `Category: ${currentQuestion.category}`;

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    // Shuffle and display answers
    const allAnswers = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers]
        .sort(() => Math.random() - 0.5);

    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = answer;
        button.addEventListener('click', selectAnswer);
        optionsElement.appendChild(button);
    });

    document.getElementById('next-btn').disabled = true;
}

// Move to next question or end quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Show final quiz results
function endQuiz() {
    quizContainer.innerHTML = `
        <div class="quiz-complete">
            <h2>Quiz Complete!</h2>
            <p>Your score: ${score}/${questions.length}</p>
            <button onclick="window.location.reload()">Play Again</button>
        </div>
    `;
}

// Fetch questions from API
async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        if (!data.length) throw new Error("No questions available.");
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        showError(error.message);
        return [getFallbackQuestion()];
    }
}

// Provide a random fallback question
function getFallbackQuestion() {
    const fallbackQuestions = [
        {
            question: { text: "What is the capital of France?" },
            correctAnswer: "Paris",
            incorrectAnswers: ["London", "Berlin", "Madrid"],
            category: "Geography"
        },
        {
            question: { text: "Who wrote 'To Kill a Mockingbird'?" },
            correctAnswer: "Harper Lee",
            incorrectAnswers: ["Mark Twain", "F. Scott Fitzgerald", "Jane Austen"],
            category: "Literature"
        },
        {
            question: { text: "What is 5 + 7?" },
            correctAnswer: "12",
            incorrectAnswers: ["10", "13", "11"],
            category: "Math"
        }
    ];
    return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
}

// Initialize quiz
async function initQuiz() {
    try {
        questions = await fetchQuestions();
        startQuiz();
    } catch (error) {
        showError(error.message);
    }
}

// Start the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    document.getElementById('loading').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    showQuestion();
}

// Run when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    initQuiz();
});
