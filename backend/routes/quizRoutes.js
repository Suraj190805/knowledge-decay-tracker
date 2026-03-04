const express = require("express");
const router = express.Router();
const QuizAttempt = require("../models/QuizAttempt");

// Save quiz attempt
router.post("/save", async (req, res) => {
    console.log("REQ.USER:", req.user);
  try {
    // 🔒 Make sure user is logged in
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { subject, pdfName, score, totalQuestions } = req.body;

    const attempt = await QuizAttempt.create({
      user: req.user._id,   // ✅ THIS IS WHERE IT GOES
      subject,
      pdfName,
      score,
      totalQuestions,
    });

    res.json({ message: "Quiz attempt saved", attempt });

  } catch (err) {
    console.error("Save quiz error:", err);
    res.status(500).json({ error: "Failed to save attempt" });
  }
});

module.exports = router;