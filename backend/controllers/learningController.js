const LearningLog = require("../models/LearningLog");
const calculateDecayScore = require("../utils/decayCalculator");

// ===============================
// Add a new learning topic
// ===============================
exports.addLearning = async (req, res) => {
  try {
    const { topic, strength = 70, decayRate = 0.2 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const log = await LearningLog.create({
      user: req.user.id, // ✅ JWT user
      topic,
      strength,
      decayRate,
    });

    res.status(201).json(log);
  } catch (error) {
    console.error("ADD LEARNING ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// Get learning status
// ===============================
exports.getLearningStatus = async (req, res) => {
  try {
    const logs = await LearningLog.find({
      user: req.user.id, // ✅ JWT user
    }).sort({ lastReviewedAt: -1 });

    const result = logs.map((log) => ({
      _id: log._id,
      topic: log.topic,
      strength: log.strength,
      decayScore: calculateDecayScore(log),
      lastReviewedAt: log.lastReviewedAt,
    }));

    res.json(result);
  } catch (error) {
    console.error("GET LEARNING STATUS ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// Mark a topic as revised
// ===============================
exports.markAsRevised = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await LearningLog.findOne({
      _id: id,
      user: req.user.id, // 🔐 secure lookup
    });

    if (!log) {
      return res.status(404).json({ error: "Learning topic not found" });
    }

    // Boost strength (max 100)
    log.strength = Math.min(100, log.strength + 20);
    log.lastReviewedAt = new Date();

    await log.save();

    res.json({
      message: "Topic revised successfully ✅",
      _id: log._id,
      topic: log.topic,
      strength: log.strength,
      lastReviewedAt: log.lastReviewedAt,
    });
  } catch (error) {
    console.error("MARK AS REVISED ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};