const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");

const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Blog = require("../models/blogModel");
const Property = require("../models/propertyModel");
const Reservation = require("../models/reservationModel");

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate);
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

module.exports = {
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find({ role: "User", isAdmin: false });
    res.json(users);
  }),
  getReservation: asyncHandler(async (req, res) => {
    const reservation = await Reservation.find({ userId: req.user._id });
    res.json(reservation);
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
  deleteReservation: asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log("Id:", id);
    const reservationDelete = await Reservation.deleteOne({ _id: id });
    console.log("Deleted:", reservationDelete);
    res.json({ message: "Reservation Deleted...." });
  }),
  getCounts: asyncHandler(async (req, res) => {
    var allDatesFull = [];
    var bookingCount = 0;
    var scheduleCount = 0;
    var checkinCount = 0;
    var checkoutCount = 0;
    var todayFull = new Date();
    const todayDay = todayFull.getDate().toString().padStart(2, "0");
    const todayMonth = (todayFull.getMonth() + 1).toString().padStart(2, "0");
    const todayYear = todayFull.getFullYear();
    const today = `${todayDay}-${todayMonth}-${todayYear}`;
    const reservationData = await Reservation.find();
    if (reservationData) {
      bookingCount = reservationData.length;
      reservationData.map((obj) => {
        if (obj.paymentStatus) {
          scheduleCount++;
        }
        let temp = getDates(obj.checkin, obj.checkout);
        temp.map((item) => {
          const day = item.getDate().toString().padStart(2, "0");
          const month = (item.getMonth() + 1).toString().padStart(2, "0");
          const year = item.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          allDatesFull.push(formattedDate);
        });
        const checkInDay = obj.checkin.getDate().toString().padStart(2, "0");
        const checkInMonth = (obj.checkin.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const checkInYear = obj.checkin.getFullYear();
        const checkIn = `${checkInDay}-${checkInMonth}-${checkInYear}`;
        const checkOutDay = obj.checkout.getDate().toString().padStart(2, "0");
        const checkOutMonth = (obj.checkout.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const checkOutYear = obj.checkout.getFullYear();
        const checkOut = `${checkOutDay}-${checkOutMonth}-${checkOutYear}`;
        if (today >= checkOut) {
          checkoutCount++;
        } else if (today <= checkIn) {
          checkinCount++;
        }
      });

      console.log("today:", today);
      console.log("allDatesFull:", allDatesFull);
      res.json({
        bookingCount,
        scheduleCount,
        checkinCount,
        checkoutCount,
      });
    }
  }),
  getChartData: asyncHandler(async (req, res) => {
    try {
      hotelReserved = [];
      blogLiked = [];
      const reservationData = await Reservation.find();
      const blogData = await Blog.find();
      const propertyData = await Property.find();
      if (reservationData && blogData) {
        reservationData.map((item, index) => {
          if (
            hotelReserved.some(
              (obj) => obj?.propId.toString() === item?.propId.toString()
            )
          ) {
            hotelReserved.map((obj) => {
              if (obj.propId.toString() === item?.propId.toString()) {
                obj.value++;
              }
            });
          } else {
            var name;
            propertyData.map((prop) => {
              if (prop._id.toString() === item?.propId.toString()) {
                name = prop.propName;
              }
            });
            if (name) {
              hotelReserved.push({ propId: item.propId, name: name, value: 1 });
            }
          }
        });
        blogData.map((item, index) => {
          if (item?.likes?.id?.length > 0)
            blogLiked?.push({
              blogId: item?._id,
              name: item?.blogTitle,
              value: item?.likes?.id?.length,
            });
        });

        res.json({ hotelChart: hotelReserved, blogChart: blogLiked });
      }
    } catch (error) {
      console.log(error.message);
    }
  }),
};
