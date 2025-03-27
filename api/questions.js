// Use CommonJS syntax for better compatibility with Vercel
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Fetch from trivia API
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback questions if API fails
    const fallbackQuestions = [{
      question: { text: "What is the capital of France?" },
      correctAnswer: "Paris",
      incorrectAnswers: ["London", "Berlin", "Madrid"],
      category: "Geography"
    }];
    
    return res.status(200).json(fallbackQuestions);
  }
};