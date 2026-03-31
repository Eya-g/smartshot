const Screenshot = require("../models/Screenshot");

// ── POST /api/screenshots/upload ─────────────────────────────
// Accepts a multipart/form-data request with an image file + optional title
exports.uploadScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const title = req.body.title || req.file.originalname;

    const screenshot = new Screenshot({ title, imageUrl });
    await screenshot.save();

    res.status(201).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ── GET /api/screenshots ─────────────────────────────────────
// Returns all screenshots, sorted newest first
exports.getScreenshots = async (req, res) => {
  try {
    const screenshots = await Screenshot.find().sort({ createdAt: -1 });
    res.status(200).json(screenshots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/screenshots/:id ──────────────────────────────────
exports.getScreenshotById = async (req, res) => {
  try {
    const screenshot = await Screenshot.findById(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    res.status(200).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE /api/screenshots/:id ───────────────────────────────
exports.deleteScreenshot = async (req, res) => {
  try {
    const screenshot = await Screenshot.findByIdAndDelete(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    res.status(200).json({ message: "Screenshot deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── PATCH /api/screenshots/:id/favorite ──────────────────────
exports.toggleFavorite = async (req, res) => {
  try {
    const screenshot = await Screenshot.findById(req.params.id);
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    screenshot.isFavorite = !screenshot.isFavorite;
    await screenshot.save();
    res.status(200).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
