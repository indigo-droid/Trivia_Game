import { put, get } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, score } = req.body;

    const existing = await get('highscore.json').then(r => r?.blob()).catch(() => null);
    let highscores = [];

    if (existing) {
      const text = await existing.text();
      try {
        highscores = JSON.parse(text);
      } catch (e) {
        highscores = [];
      }
    }

    highscores.push({ name, score, time: new Date().toISOString() });
    highscores.sort((a, b) => b.score - a.score);
    highscores = highscores.slice(0, 10); // Keep top 10

    await put('highscore.json', JSON.stringify(highscores, null, 2), {
      contentType: 'application/json',
    });

    return res.status(200).json({ message: 'Score saved!' });
  }

  if (req.method === 'GET') {
    const file = await get('highscore.json').then(r => r?.blob()).catch(() => null);
    if (!file) {
      return res.status(200).json([]);
    }
    const text = await file.text();
    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      return res.status(200).json([]);
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
