export function saveHighScore(name, score, difficulty) {
  const entry = {
    name,
    score,
    difficulty,
    date: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem("highscores") || "[]");
  existing.push(entry);

  const top20 = existing
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  localStorage.setItem("highscores", JSON.stringify(top20));
}

export function getHighScores() {
  return JSON.parse(localStorage.getItem("highscores") || "[]");
}
