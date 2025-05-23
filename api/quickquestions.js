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


async function quickgamefetch2() {
    try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();

        if (data.length > 0) {
            const question = data[0]; // Get the first question

            // Display the question
            document.querySelector('.quick_main').innerHTML = `
                <h3>${question.question.text}</h3>
                <ul>
                    ${question.answers.map(answer => `<li>${answer}</li>`).join('')}
                </ul>
            `;
        }
    } catch (error) {
        console.error('Error fetching trivia data:', error);
    }
}