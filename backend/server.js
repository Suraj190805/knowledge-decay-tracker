const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const learningRoutes = require("./routes/learningRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Knowledge Decay Tracker API is running 🚀");
});

// Routes
app.use("/api/learning", learningRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});