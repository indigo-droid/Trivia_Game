// api/quickgame.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trivia questions' });
  }
}