const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const GITHUB_REPO = "your-username/feedback-ai-demo";
const GITHUB_TOKEN = "your_personal_token";

app.post("/api/feedback", async (req, res) => {
  const { feedback } = req.body;

  try {
    await axios.post(
      `https://api.github.com/repos/${GITHUB_REPO}/issues`,
      {
        title: "New User Feedback",
        body: feedback,
        labels: ["ai-feedback"]
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "feedback-bot"
        }
      }
    );
    res.status(201).send("Feedback submitted.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(3000, () => console.log("Feedback API running on port 3000"));

