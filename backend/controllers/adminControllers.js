const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");

const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");

module.exports = {
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),
  getHotels: asyncHandler(async (req, res) => {
    const hotelUsers = await User.find({ role: "Hotel" });
    if (hotelUsers === []) {
      res.status(400);
      throw new Error("No hotels in DB");
    }
    const hotelDetails = await Hotel.find();

    res.json(hotelDetails);
  }),
  hostBlock: asyncHandler(async (req, res) => {
    const { user } = req.body;
    console.log("User Id : ", user);
    const findHost = await Hotel.findOne({ user: user });
    if (findHost.blocked) findHost.blocked = false;
    else findHost.blocked = true;

    await findHost.save();
    if (findHost) res.status(201).json(findHost)
    else res.status(400);
  }),
};
