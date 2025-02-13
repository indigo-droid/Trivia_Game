async function loadQuestion() {
    try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        displayQuestion(data.results[0]); // Show first question
    } catch (error) {
        console.error("Error loading question:", error);
    }
}

function displayQuestion(questionData) {
    document.getElementById("question").textContent = questionData.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = ""; // Clear previous answers

    const answers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);
    
    answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, questionData.correct_answer);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("Correct!");
    } else {
        alert("Wrong! The correct answer was: " + correct);
    }
    loadQuestion(); // Load a new question after answering
}

loadQuestion();
