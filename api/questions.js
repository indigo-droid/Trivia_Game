const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Fetch from trivia API
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Fallback if API returns empty
    if (!data || data.length === 0) {
      return res.json([{
        question: { text: "What is the capital of France?" },
        correctAnswer: "Paris",
        incorrectAnswers: ["London", "Berlin", "Madrid"],
        category: "Geography"
      }]);
    }
    
    return res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch questions',
      details: error.message 
    });
  }
};