async function fetchTrivia() {
    const apiUrl = "http://localhost:3000/api/trivia";
    try {
<<<<<<< HEAD
        const response = await fetch(apiUrl);
        const trivia = await response.json();
        displayTrivia(trivia);
=======
      const response = await fetch("/api/questions");
      const data = await response.json();
      // Check if we have questions
      if (data.results && data.results.length > 0) {
        const firstQuestion = data.results[0];
        // Display the question in the element with id "question"
        document.getElementById("question").innerHTML = firstQuestion.question;
        // Create buttons for the answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = ""; // clear previous answers
        // Combine and shuffle the answers
        const answers = [
          ...firstQuestion.incorrect_answers,
          firstQuestion.correct_answer
        ].sort(() => Math.random() - 0.5);
        
        answers.forEach(answer => {
          const button = document.createElement("button");
          button.textContent = answer;
          button.onclick = () => checkAnswer(answer, firstQuestion.correct_answer);
          answersDiv.appendChild(button);
        });
      } else {
        document.getElementById("question").textContent = "No questions available.";
      }
>>>>>>> 87689b5 (seventh commit)
    } catch (error) {
        console.error("Error fetching trivia:", error);
    }
<<<<<<< HEAD
}

function displayTrivia(trivia) {
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const triviaContainer = document.getElementById("trivia");

    questionEl.textContent = trivia.question;

    const allAnswers = [...trivia.incorrectAnswers, trivia.correctAnswer];
    answersEl.innerHTML = "";

    allAnswers.sort(() => Math.random() - 0.5); // Shuffle answers

    allAnswers.forEach(answer => {
        const li = document.createElement("li");
        li.textContent = answer;
        answersEl.appendChild(li);
    });

    triviaContainer.style.display = "block";
}

document.getElementById("getTrivia").addEventListener("click", fetchTrivia);
=======
  }
  
  function checkAnswer(selected, correct) {
    if (selected === correct) {
      alert("Correct!");
    } else {
      alert("Wrong! The correct answer was: " + correct);
    }
    // Optionally, load a new question after answering:
    fetchTriviaQuestions();
  }
  
  // Initial call to fetch and display a question
  fetchTriviaQuestions();
  
>>>>>>> 87689b5 (seventh commit)
