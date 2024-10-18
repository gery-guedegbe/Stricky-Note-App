const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    body: {
      type: String,
      required: true,
    },

    colors: {
      type: Object,
      default: {},
    },

    position: {
      type: Object,
      default: { x: 0, y: 0 },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
