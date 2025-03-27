const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiResponse = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    
    if (!apiResponse.ok) {
      throw new Error(`Trivia API responded with ${apiResponse.status}`);
    }
    
    const data = await apiResponse.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch questions',
      details: error.message
    });
  }
};