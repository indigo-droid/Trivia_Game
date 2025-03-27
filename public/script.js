async function fetchTrivia() {
    const apiUrl = "http://localhost:3000/api/trivia";
    try {
        const response = await fetch(apiUrl);
        const trivia = await response.json();
        displayTrivia(trivia);
    } catch (error) {
        console.error("Error fetching trivia:", error);
    }
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
