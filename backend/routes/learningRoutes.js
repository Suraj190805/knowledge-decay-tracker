const express = require("express");
const {
  addLearning,
  getLearningStatus,
} = require("../controllers/learningController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addLearning);
router.get("/", authMiddleware, getLearningStatus);

module.exports = router;