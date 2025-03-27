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
    loadingElement.textContent = "Loading questions...";
    const startTime = Date.now();
    
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Request took ${Date.now() - startTime}ms`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Received empty questions array");
    }
    
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    loadingElement.innerHTML = `
      Error loading questions: <strong>${error.message}</strong><br>
      Please try refreshing the page.
    `;
    return [];
  }
}

/* [Rest of your existing quiz logic functions remain the same] */
/* [Include all the remaining functions from previous script.js] */

async function startQuiz() {
    console.log("Starting quiz...");
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = `Score: ${score}`;
    
    questions = await fetchQuestions();
    
    if (questions.length === 0) {
        loadingElement.textContent = "No questions available. Please try again later.";
        return;
    }

    loadingElement.style.display = 'none';
    quizContent.style.display = 'block';
    
    nextButton.addEventListener('click', nextQuestion);
    showQuestion();
}

// Start the quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    startQuiz();
});