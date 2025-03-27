import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=10');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
}