const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    capacity: Number,

    image: {
      type: String, // image URL
    },

    attendees: {
      type: Number,
      default: 0,
    },

    rsvps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
