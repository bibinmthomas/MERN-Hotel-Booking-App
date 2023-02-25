const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateTokens");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Blog = require("../models/blogModel")
module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, phone, password } = req.body;
      console.log(name, email, phone, password);
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User Already exists");
      }
      const user = await User.create({
        name,
        email,
        phone,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          pic: user.pic,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Error Occured!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }),

  authUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.blocked) {
        res.status(403);
        throw new Error("You are blocked by the admin");
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        pic: user.pic,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }),
  newHost: asyncHandler(async (req, res) => {
    const { user, hotelName, adhaarno, city, street, pinno } = req.body;

    const findUser = await User.findOne({ _id: user });

    if (!findUser) {
      res.status(400);
      throw new Error("User does not exist");
    } else {
      findUser.role = "Hotel";
      await findUser.save();
    }
    const address = {
      city,
      street,
      pinno,
    };
    const hotel = await Hotel.create({
      user,
      hotelName,
      adhaarno,
      address,
      blocked: true,
    });

    if (hotel) {
      res.status(201).json({
        user: hotel.user,
        hotelName: hotel.hotelName,
        adhaarno: hotel.adhaarno,
        address: hotel.address,
        phone: hotel.phone,
        token: generateToken(hotel._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }),

  getUserById: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (User) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        pic: user.pic,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }),
  updateUserProfile: asyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findById(req.body.userId);
    console.log(user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.URL || user.pic;
      const updatedUser = await user.save();

      res.json({
        token: generateToken(user._id),
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  }),
  likeFunction: asyncHandler(async (req, res) => {
    const { blogId, likeData } = req.body;
    // console.log("BlogID & likeData:",blogId, likeData);
    const blogExists = await Blog.findOne({_id:blogId})
    if(blogExists){
      console.log(blogExists);
      blogExists.likes.id = likeData
      await blogExists.save()
      res.json({message:"LIKES SAVED!!!"})
    }
  }),
};
