const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const propertySchema = mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "hotel",
    },
    hostName: {
      type: String,
      required: true,
    },
    propName: {
      type: String,
      required: true,
    },
    propType: {
      type: String,
      required: true,
    },
    propRate: {
      type: Number,
      min: 3000,
    },
    villaDetails: {},
    apartmentDetails: {},
    sharedDetails: {},
    roomTypes: {
      livingRoom: Number,
      view: Number,
      bedRoom: Number,
      kitchen:Boolean,
    },
    propDescription: {
      type: String,
      required: true,
    },
    propFeatures: [
      {
        view: String,
        bedtype: String,
        amenities: [
          {
            type: String,
          },
        ],
      },
    ],
    propImages: [
      {
        type: String,
      },
    ],
    phone: String,
    address: [
      {
        city: String,
        street: String,
        pinno: Number,
      },
    ],

    propStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Property = mongoose.model("property", propertySchema);

module.exports = Property;
