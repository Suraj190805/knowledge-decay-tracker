const express = require("express");
const {
  addLearning,
  getLearningStatus,
} = require("../controllers/learningController");

const router = express.Router();

router.post("/", addLearning);
router.get("/:userId", getLearningStatus);

module.exports = router;