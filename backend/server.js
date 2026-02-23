const dotenv = require("dotenv");
dotenv.config(); // MUST be first

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const uploadRoutes = require("./routes/uploadRoutes");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const learningRoutes = require("./routes/learningRoutes");
const revisionRoutes = require("./routes/revisionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "oauthsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/revision", revisionRoutes);
app.use("/api/analytics", analyticsRoutes);

// ✅ File upload routes
app.use("/api/files", uploadRoutes);
app.use("/uploads", express.static("uploads"));

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("Knowledge Decay Tracker API is running 🚀");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});