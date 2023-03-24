const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const reservationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "property",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hotel",
    },
    propRate: {
      type: Number,
      min: 3000,
    },
    totalPrice: {
      type: Number,
      min: 3000,
    },
    checkin: {
      type: Date,
    },
    checkout: {
      type: Date,
    },
    guest: {
      children: Number,
      adult: Number,
      elder: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    paymentIntent: {
      type: Object,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
