const LearningLog = require("../models/LearningLog");
const calculateDecayScore = require("../utils/decayCalculator");

// Add a new learning topic
const addLearning = async (req, res) => {
  try {
    const { userId, topic } = req.body;

    const log = await LearningLog.create({
      user: userId,
      topic,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get learning status with decay score
const getLearningStatus = async (req, res) => {
  try {
    const logs = await LearningLog.find({
      user: req.params.userId,
    });

    const result = logs.map((log) => ({
      topic: log.topic,
      decayScore: calculateDecayScore(log),
      lastReviewedAt: log.lastReviewedAt,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLearning,
  getLearningStatus,
};