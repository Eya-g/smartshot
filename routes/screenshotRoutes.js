const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const screenshotController = require("../controllers/screenshotController");

router.post(
  "/upload",
  upload.single("image"),
  screenshotController.uploadScreenshot,
);
router.get("/", screenshotController.getScreenshots);
router.get("/:id", screenshotController.getScreenshotById);
router.delete("/:id", screenshotController.deleteScreenshot);
router.patch("/:id/favorite", screenshotController.toggleFavorite);

module.exports = router;
