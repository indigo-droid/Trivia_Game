// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public')); // serve index.html from /public

app.get('/api/quickgame', async (req, res) => {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
