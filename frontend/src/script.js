// Updated to use our backend API
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

// ... rest of your existing frontend code remains the same ...