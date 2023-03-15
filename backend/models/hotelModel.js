const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hotelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotelName: {
      type: String,
      required: true,
    },
    adhaarno: {
      type: String,
      required: true,
    },
    URL: {
      type: String,
      default: "",
    },
    address: [
      {
        city: String,
        street: String,
        pinno: String,
      },
    ],
    blocked: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
