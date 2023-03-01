const express = require("express");
const {
  getUsers,
  getHotels,
  getProps,
  hostBlock,
  propBlock,
  userBlock,
} = require("../controllers/adminControllers");

const router = express.Router();

router.route("/user-management").get(getUsers);
router.route("/hotel-management").get(getHotels);
router.route("/property-management").get(getProps);
router.route("/changeBlock").post(hostBlock);
router.route("/userBlock").post(userBlock);
router.route("/propBlock").post(propBlock);

module.exports = router;
