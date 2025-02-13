async function fetchTriviaQuestions() {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
  
      console.log(data); // Handle and display the questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  
  fetchTriviaQuestions();
  