async function fetchTriviaQuestions() {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      // Check if we have questions
      if (data.results && data.results.length > 0) {
        const firstQuestion = data.results[0];
        // Display the question in the element with id "question"
        document.getElementById("question").textContent = firstQuestion.question;
        // Optionally, create buttons for the answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = ""; // clear previous answers
        const answers = [...firstQuestion.incorrect_answers, firstQuestion.correct_answer]
          .sort(() => Math.random() - 0.5);
        answers.forEach(answer => {
          const button = document.createElement("button");
          button.textContent = answer;
          answersDiv.appendChild(button);
        });
      } else {
        document.getElementById("question").textContent = "No questions available.";
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  fetchTriviaQuestions();
  