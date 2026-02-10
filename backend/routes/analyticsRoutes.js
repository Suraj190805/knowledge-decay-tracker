const express = require("express");
const router = express.Router();

const { getWeeklyAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/analytics
router.get("/", authMiddleware, getWeeklyAnalytics);

module.exports = router;