const Event = require("../models/Event");

/**
 * CREATE EVENT
 */
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      capacity: req.body.capacity,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch {
    res.status(500).json({ message: "Event creation failed" });
  }
};

/**
 * GET ALL EVENTS
 */
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/**
 * RSVP EVENT (ATOMIC + NO OVERBOOKING)
 */
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $lt: "$capacity" },
        rsvps: { $ne: req.user.id },
      },
      {
        $inc: { attendees: 1 },
        $push: { rsvps: req.user.id },
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event full or already RSVP'd",
      });
    }

    res.json({
      message: "RSVP successful",
      attendees: event.attendees,
    });
  } catch {
    res.status(500).json({ message: "RSVP failed" });
  }
};

/**
 * LEAVE RSVP
 */
exports.leaveRSVP = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    if (!event.rsvps.includes(req.user.id))
      return res.status(400).json({ message: "Not RSVP'd yet" });

    event.rsvps = event.rsvps.filter(
      (id) => id.toString() !== req.user.id
    );
    event.attendees -= 1;

    await event.save();

    res.json({
      message: "RSVP removed",
      attendees: event.attendees,
    });
  } catch {
    res.status(500).json({ message: "Leave RSVP failed" });
  }
};
