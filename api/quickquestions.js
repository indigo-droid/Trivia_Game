const fetch = require('node-fetch');
const fs = require('fs');

function quickgamefetch() {
    fetch('https://the-trivia-api.com/v2/questions')
    .then(response => response.json())
    .then(data => {
        fs.writeFile('quickgame.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving file:', err);
        } else {
            console.log('Trivia questions saved to trivia.json');
        }
        });
    })
    .catch(error => {
        console.error('Error fetching trivia data:', error);
    });
}


export default async function handler(req, res) {
    try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();

        if (data.length > 0) {
            res.status(200).json(data[0]); // Sends one trivia question
        } else {
            res.status(404).json({ error: "No trivia questions found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching trivia data" });
    }
}