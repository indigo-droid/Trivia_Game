import { saveHighScore, getHighScores } from './scores.js';

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty");

  let apiURL = `https://the-trivia-api.com/v2/questions?limit=10`;
  if (category) apiURL += `&categories=${category}`;
  if (difficulty) apiURL += `&difficulty=${difficulty}`;

  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let questionscore = 0;

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextButton = document.getElementById("nextButton");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const endButtons = document.getElementById("endButtons");
  const scoreEl = document.getElementById("score");

  function showQuestion() {
    const q = questions[currentIndex];
    questionEl.textContent = q.question.text;
    answersEl.innerHTML = "";

    const answers = [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5);
    answers.forEach(answer => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.className = "answer";
      li.onclick = () => {
        document.querySelectorAll(".answer").forEach(el => el.classList.add("disabled"));
        if (answer === q.correctAnswer) {
          li.classList.add("correct");
          score++;
          switch (q.difficulty) {
            case "easy": questionscore += 10; break;
            case "medium": questionscore += 20; break;
            case "hard": questionscore += 30; break;
            scoreEl.textContent = questionscore;
          }
        } else {
          li.classList.add("incorrect");
          [...answersEl.children].forEach(child => {
            if (child.textContent === q.correctAnswer) child.classList.add("correct");
          });
        }
        scoreEl.textContent = questionscore;
        nextButton.style.display = "inline-block";
      };
      answersEl.appendChild(li);
    });

    nextButton.style.display = "none";
  }

  nextButton.onclick = () => {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showEndScreen();
    } else {
      showQuestion();
    }
  };

  function showEndScreen() {
    questionEl.textContent = `Quiz completed! Your score: ${score} / ${questions.length}`;
    answersEl.innerHTML = "";
    scoreDisplay.textContent = `Total Score: ${questionscore}`;
    scoreDisplay.style.display = "block";
    nextButton.style.display = "none";
    endButtons.innerHTML = "";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Score";
    submitBtn.onclick = () => {
      const name = prompt("Enter your name:");
      if (name && name.trim() !== "") {
        saveHighScore(name, questionscore, difficulty);
        location.href = "highscores.html";
      }
    };

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.onclick = () => location.href = "quiz.html";

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select Category";
    selectBtn.onclick = () => location.href = "categorygame.html";

    endButtons.appendChild(submitBtn);
    endButtons.appendChild(restartBtn);
    endButtons.appendChild(selectBtn);
    endButtons.style.display = "flex";
  }

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      questions = data;
      if (!questions.length) {
        questionEl.textContent = "No questions found.";
        return;
      }
      scoreDisplay.style.display = "block"; // 👈 Make score visible
      scoreEl.textContent = questionscore;   // 👈 Show initial score (0)
      showQuestion();
    })

});
