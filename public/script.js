// script.js

async function fetchTriviaQuestions() {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      
      // Handle and display trivia questions
      console.log(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  
  // Call the function to fetch questions
  fetchTriviaQuestions();
  