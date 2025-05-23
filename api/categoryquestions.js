const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://the-trivia-api.com/v2/questions')
  .then(response => response.json())
  .then(data => {
    fs.writeFile('trivia.json', JSON.stringify(data, null, 2), (err) => {
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
