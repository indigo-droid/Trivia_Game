const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable CORS and serve static files (frontend)
app.use(cors());
app.use(express.static("public")); // Serve static frontend files from the "public" folder

// API route to fetch trivia questions
app.get("/api/questions", async (req, res) => {
    try {
        const response = await axios.get("https://opentdb.com/api.php?amount=5&type=multiple");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});

// Serve the index.html from the public folder when accessing the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
