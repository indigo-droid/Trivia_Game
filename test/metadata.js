const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://the-trivia-api.com/v2/metadata')
  .then(response => response.json())
  .then(data => {
    fs.writeFile('meta.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error saving file:', err);
      } else {
        console.log('Meta Data of Trivia questions saved to meta.json');
      }
    });
  })
  .catch(error => {
    console.error('Error fetching trivia data:', error);
  });
