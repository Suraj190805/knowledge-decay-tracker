const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= UPLOAD ================= */

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    const newFile = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      subject,
      user: null,
    });

    res.json(newFile);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

/* ================= GET BY SUBJECT ================= */

router.get("/:subject", async (req, res) => {
  try {
    const files = await File.find({ subject: req.params.subject });
    res.json(files);
  } catch (err) {
    console.error("FETCH FILES ERROR:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

module.exports = router;