const express = require("express");
const { getUsers,getHotels,hostBlock } = require("../controllers/adminControllers");


const router = express.Router();

router.route("/hotel-management").get(getHotels);
router.route("/changeBlock").post(hostBlock);



module.exports = router;
