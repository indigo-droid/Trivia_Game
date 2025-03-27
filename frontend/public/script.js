// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const loadingElement = document.getElementById('loading');
const questionElement = document.getElementById('question');
const categoryElement = document.getElementById('category');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Game State
let currentQuestion = {};
let questions = [];
let score = 0;
let acceptingAnswers = false;
let currentQuestionIndex = 0;
const API_URL = '/api/questions';

// Initialize Quiz
async function initQuiz() {
    try {
        // Initial UI Setup
        quizContainer.innerHTML = `
            <div id="loading" class="loading">Loading questions...</div>
            <div id="quiz-content" style="display:none;">
                <div class="category" id="category"></div>
                <div class="question" id="question"></div>
                <div class="options" id="options"></div>
                <button id="next-btn" class="next-btn" disabled>Next Question</button>
            </div>
            <div class="score" id="score">Score: 0</div>
        `;

        // Get fresh DOM references
        const loadingEl = document.getElementById('loading');
        const quizContentEl = document.getElementById('quiz-content');
        
        // Load questions
        questions = await fetchQuestions();
        
        if (questions && questions.length > 0) {
            loadingEl.style.display = 'none';
            quizContentEl.style.display = 'block';
            startQuiz();
        } else {
            throw new Error("No questions received from server");
        }
    } catch (error) {
        console.error("Initialization error:", error);
        showError(error.message);
    }
}

// Fetch Questions with Error Handling
async function fetchQuestions() {
    try {
      console.log('Fetching from:', API_URL);
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
      
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // This will be caught by initQuiz
    }
}

// Display Error Message
function showError(message) {
    quizContainer.innerHTML = `
        <div class="error-message">
            <h3>⚠️ Error Loading Quiz</h3>
            <p>${message}</p>
            <button class="retry-btn" onclick="window.location.reload()">
                Try Again
            </button>
        </div>
    `;
}

// [Rest of your existing quiz functions (showQuestion, selectAnswer, etc.)...]

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initQuiz);