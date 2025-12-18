const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  rsvpEvent,
  leaveRSVP,
} = require("../controllers/eventController");

router.post("/", auth, upload.single("image"), createEvent);
router.get("/", getEvents);
router.post("/:id/rsvp", auth, rsvpEvent);
router.post("/:id/leave", auth, leaveRSVP);

module.exports = router;
