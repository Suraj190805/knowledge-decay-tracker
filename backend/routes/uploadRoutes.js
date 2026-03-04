const express = require("express");
const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const { extractTextFromPDF } = require("../utils/extractText");
const generateQuizFromText = require("../utils/generateQuiz");
const fs = require("fs");
const generateSummaryFromText = require("../utils/generateSummary");
const router = express.Router();
// Configure storage
const storage = multer.diskStorage({
destination: path.join(__dirname, "..", "uploads"),
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

/* ================= TEST PDF EXTRACTION ================= */

router.get("/test/:filename", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "uploads", req.params.filename);

    const text = await extractTextFromPDF(filePath);

    console.log("Extracted text length:", text.length);

    res.json({
      message: "Text extracted successfully",
      preview: text.slice(0, 1000),
    });
  } catch (err) {
    console.error("PDF extraction error:", err);
    res.status(500).json({ error: "Failed to extract text" });
  }
});


/* ================= GENERATE QUIZ ================= */

router.post("/generate-quiz/:filename", async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.params.filename
    );

    const text = await extractTextFromPDF(filePath);

const quiz = await generateQuizFromText(text);
    res.json({
      message: "Quiz generated successfully",
      totalQuestions: quiz.length,
      quiz,
    });

  } catch (err) {
    console.error("Quiz generation error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
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

router.delete("/delete/:filename", async (req, res) => {
  try {
    console.log("Delete request for:", req.params.filename);

    const file = await File.findOne({ filename: req.params.filename });

    console.log("File found:", file);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    

    // Delete file from uploads folder
    const filePath = path.join(__dirname, "..", "uploads", file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await File.deleteOne({ filename: req.params.filename });

    res.json({ message: "File deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete file" });
  }
});
 
// ================= SUMMARIZE PDF =================
router.post("/summarize/:filename", async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.params.filename
    );

    if (!req.params.filename.endsWith(".pdf")) {
      return res.status(400).json({
        error: "Summarization supported only for PDF files"
      });
    }

    const text = await extractTextFromPDF(filePath);

    const summary = await generateSummaryFromText(text);

    res.json({
      message: "Summary generated successfully",
      summary
    });

  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ error: "Failed to summarize file" });
  }
});

module.exports = router;