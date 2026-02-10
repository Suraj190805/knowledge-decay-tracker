const express = require("express");
const { markAsRevised } = require("../controllers/learningController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id", authMiddleware, markAsRevised);

module.exports = router;