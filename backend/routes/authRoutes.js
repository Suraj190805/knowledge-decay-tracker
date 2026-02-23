
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/authController");

const router = express.Router();

/* ================= NORMAL AUTH ================= */

router.post("/register", register);
router.post("/login", login);

/* ================= GOOGLE AUTH ================= */

// ✅ Step 1 — Start Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// ✅ Step 2 — Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const host = req.headers.host;

    let frontendURL;

    if (host.includes("localhost")) {
      frontendURL = "http://localhost:5173";
    } else {
      frontendURL = `https://${host}`;
    }

    res.redirect(`${frontendURL}/oauth-success?token=${token}`);
  }
);

/* ================= FACEBOOK AUTH ================= */

// ✅ Step 3 — Start Facebook Login
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

// ✅ Step 4 — Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const host = req.headers.host;

    let frontendURL;

    if (host.includes("localhost")) {
      frontendURL = "http://localhost:5173";
    } else {
      frontendURL = `https://${host}`;
    }

    res.redirect(`${frontendURL}/oauth-success?token=${token}`);
  }
);
/* ===========================
   REGISTER
=========================== */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;