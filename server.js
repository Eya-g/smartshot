const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const screenshotRoutes = require("./routes/screenshotRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve local images

// ── Database ──────────────────────────────────────────────────
connectDB();

// ── Routes ────────────────────────────────────────────────────
app.use("/api/screenshots", screenshotRoutes);
app.use("/api/auth", authRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => res.json({ status: "API is running 🚀" }));

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
