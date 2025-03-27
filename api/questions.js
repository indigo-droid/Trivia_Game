const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // First, send headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Then fetch data
    const apiResponse = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    
    if (!apiResponse.ok) {
      throw new Error(`Trivia API failed with status ${apiResponse.status}`);
    }
    
    const data = await apiResponse.json();
    
    // Finally, send response
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch questions',
      details: error.message 
    });
  }
};