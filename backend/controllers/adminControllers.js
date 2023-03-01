const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");

const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Property = require("../models/propertyModel");

module.exports = {
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find({ role: "User", isAdmin: false });
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
  getProps: asyncHandler(async (req, res) => {
    const hotelUsers = await User.find({ role: "Hotel" });
    if (hotelUsers === []) {
      res.status(400);
      throw new Error("No hotels in DB");
    }
    const propDetails = await Property.find();

    res.json(propDetails);
  }),
  userBlock: asyncHandler(async (req, res) => {
    const { _id } = req.body;
    console.log("User Id : ", _id);
    const findUser = await User.findOne({ _id: _id });
    if (findUser.blocked) findUser.blocked = false;
    else findUser.blocked = true;

    await findUser.save();
    if (findUser) res.status(201).json(findUser);
    else res.status(400);
  }),
  hostBlock: asyncHandler(async (req, res) => {
    const { user } = req.body;
    console.log("Host Id : ", user);
    const findHost = await Hotel.findOne({ user: user });
    if (findHost.blocked) findHost.blocked = false;
    else findHost.blocked = true;

    await findHost.save();
    if (findHost) res.status(201).json(findHost);
    else res.status(400);
  }),
  propBlock: asyncHandler(async (req, res) => {
    const { _id } = req.body;
    console.log("User Id : ", _id);
    const findProp = await Property.findOne({ _id: _id });
    if (findProp.propStatus) findProp.propStatus = false;
    else findProp.propStatus = true;

    await findProp.save();
    if (findProp) res.status(201).json(findProp);
    else res.status(400);
  }),
};
