const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint to fetch trivia questions
app.get("/api/trivia", async (req, res) => {
    try {
        const response = await fetch("https://the-trivia-api.com/api/questions?limit=1");
        const data = await response.json();
        res.json(data[0]); // Send the first trivia question
    } catch (error) {
        console.error("Error fetching trivia:", error);
        res.status(500).json({ error: "Failed to fetch trivia question" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
