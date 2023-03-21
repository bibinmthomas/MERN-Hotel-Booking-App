const express = require("express");

const {
  registerUser,
  authUser,
  newHost,
  getUserById,
  updateUserProfile,
  likeFunction,
  addReservation,
  confirmPayment,
  checkValidDates,
  searchHotels,
  searchBlogs,
} = require("../controllers/userControllers");
const {
  postBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  addComment,
  deleteComment,
  postProperty,
  getProperty,
} = require("../controllers/hostControllers");
const {
  getUsers,
  getReservation,
  deleteReservation,
} = require("../controllers/adminControllers");
const protect = require("../middlewares/authUserMiddleware");
//stripe implementation...
const stripe = require("stripe")(
  "sk_test_51Mh9aoSDG98Dc7SRtK3axJd6Apa3JOMhKt0gzJ4AzHuLANTkPIObic1JhuOjsXgLV9HNPTRcgt6j8dJGNbS3720C00rUdXcSrt"
);
const Reservation = require("../models/reservationModel");
const calculateOrderAmount = (totalPrice) => {
  console.log("totalPrice", totalPrice);
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return totalPrice;
};

const router = express.Router();
router.route("/getUsers").get(getUsers);
router.route("/blogFetch").get(getBlogs);
router.route("/propertyFetch").get(getProperty);
router.route("/reservationFetch/").get(protect, getReservation);
router.route("/:id").get(getUserById);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/Newhost").post(protect, newHost);
router.route("/updateProfile").post(protect, updateUserProfile);

router.route("/postBlog").post(protect, postBlog);
router.route("/profileUpdate").post(updateUserProfile);
router.route("/deleteBlog/:id").delete(deleteBlog);
router.route("/editBlog").post(updateBlog);
router.route("/addComment").post(addComment);
router.route("/likeBlog").post(likeFunction);
router.route("/postProperty").post(protect, postProperty);
router.route("/editProperty").post();
router.route("/deleteProperty").post();
router.route("/postReservation").post(protect, addReservation);
router.route("/checkValidDates").post(checkValidDates);
router.route("/create-payment-intent").post(async (req, res) => {
  console.log(req.body);
  const { totalPrice } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalPrice),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
router.route("/confirmPayment").post(confirmPayment);
router.route("/deleteReservation").post(protect, deleteReservation);
router.route("/searchHotels").post(searchHotels);
router.route("/searchBlogs").post(searchBlogs);
module.exports = router;
