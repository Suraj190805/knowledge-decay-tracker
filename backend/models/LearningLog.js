const mongoose = require("mongoose");

const learningLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  strength: {
    type: Number,
    default: 100,
  },

  lastReviewedAt: {
    type: Date,
    default: Date.now,
  },

  decayRate: {
    type: Number,
    default: 0.1,
  },
});

module.exports = mongoose.model("LearningLog", learningLogSchema);