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


function Categoriegamefetch(category){
fetch('https://the-trivia-api.com/v2/questions?categories=category')
  .then(response => response.json())
  .then(data => {
    fs.writeFile('music.json', JSON.stringify(data, null, 2), (err) => {
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