const express = require("express");
const {
  registerUser,
  authUser,
  newHost,
  getUserById,
  updateUserProfile,
  likeFunction
} = require("../controllers/userControllers");
const {
  postBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  addComment,
  deleteComment,
  postProperty,
  getProperty
} = require("../controllers/hostControllers");
const { getUsers } = require("../controllers/adminControllers");
// const protect = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/getUsers").get(getUsers);
router.route("/blogFetch").get(getBlogs);
router.route("/propertyFetch").get(getProperty);
router.route("/:id").get(getUserById);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/Newhost").post(newHost);
router.route("/updateProfile").post(updateUserProfile);

router.route("/postBlog").post(postBlog);
router.route("/profileUpdate").post(updateUserProfile);
router.route("/deleteBlog/:id").delete(deleteBlog);
router.route("/editBlog").post(updateBlog);
router.route("/addComment").post(addComment);
router.route("/likeBlog").post(likeFunction);
router.route("/postProperty").post(postProperty);
router.route("/editProperty").post();
router.route("/deleteProperty").post();



module.exports = router;
