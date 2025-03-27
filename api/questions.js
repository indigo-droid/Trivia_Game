import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    console.log('Fetching questions from Trivia API...');
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} questions`);
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({
      error: 'Failed to fetch questions',
      details: error.message
    });
  }
}