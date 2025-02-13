// api/questions.js

const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=5&type=multiple");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
};
