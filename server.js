const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve static frontend files

app.get("/api/questions", async (req, res) => {
    try {
        const response = await axios.get("https://opentdb.com/api.php?amount=5&type=multiple");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
