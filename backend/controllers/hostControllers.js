const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateTokens");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Blog = require("../models/blogModel");
const Property = require("../models/propertyModel");

module.exports = {
  postBlog: asyncHandler(async (req, res) => {
    try {
      // console.log(req.body);
      const { host, title, content, URL } = req.body;
      // console.log(host, title, content, URL);
      const hostExists = await User.findOne({ _id: host });
      if (hostExists) {
        const blog = await Blog.create({
          user: host,
          blogTitle: title,
          blogContent: content,
          blogPic: URL,
        });

        if (blog) {
          res.status(201).json({
            host: blog.user,
            title: blog.blogTitle,
            content: blog.blogContent,
            URL: blog.blogPic,
          });
        } else {
          res.status(400);
          throw new Error("Error Occured!");
        }
      } else {
        res.status(400);
        throw new Error("host not found.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }),
  getBlogs: asyncHandler(async (req, res) => {
    // const blogData = await Blog.find();
    // res.json(blogData);
    try {
      const blogData = await Blog.find({});
      if (blogData) {
        res.json(blogData);
      } else {
        res.status(400);
        throw new Error("Error Occured!");
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error.message);
    }
  }),
  deleteBlog: asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      console.log("id:", id);
      const BlogExists = await Blog.deleteOne({ _id: id });
      console.log("Deleted:", BlogExists);
      res.json({ message: "Blog Deleted...." });
    } catch (error) {
      console.log(error.message);
    }
  }),
  updateBlog: asyncHandler(async (req, res) => {
    console.log(req.body);
    const blog = await Blog.findOne({ _id: req.body.blogId });
    console.log(blog);
    if (blog) {
      blog.blogTitle = req.body.title || blog.blogTitle;
      blog.blogContent = req.body.content || blog.blogContent;
      blog.blogPic = req.body.URL || blog.blogPic;
      const updatedBlog = await blog.save();
      res.json({
        message: "Blog Edited...",
      });
    } else {
      res.status(404);
      throw new Error("Blog Not Found!");
    }
  }),
  addComment: asyncHandler(async (req, res) => {
    try {
      const { blogId, userId, userName, userPic, commentContent } = req.body;
      console.log(blogId, userId, userName, userPic, commentContent);
      const blogData = await Blog.findOne({ _id: blogId });
      if (blogData) {
        blogData.comments.push({
          user: userId,
          userName,
          userPic,
          content: commentContent,
        });
        await blogData.save();
        res.json({
          _id: blogData._id,
          user: blogData.user,
          userName,
          userPic,
          content: commentContent,
          createdAt: blogData.createdAt,
        });
      } else {
        res.status(404);
        throw new Error("Something went wrong...");
      }
    } catch (error) {
      console.log(error.message);
    }
  }),
  deleteComment: asyncHandler(async (req, res) => {
    try {
      const { blogId, index } = req.body;
      console.log(blogId, index);
      const BlogExists = await Blog.findOne({ _id: blogId });
      if (BlogExists) {
        console.log("found the blog!!!", BlogExists.comments[index]);
        BlogExists.comments.splice(index, 1);
        await BlogExists.save();
        res.json({ message: "Comment Deleting...." });
      }
    } catch (error) {
      console.log(error.message);
    }
  }),
  postProperty: asyncHandler(async (req, res) => {
    try {
      const {
        hostId,
        hostName,
        propName,
        propType,
        propPhone,
        propDescription,
        propStreet,
        propCity,
        propPin,
        propRate,
        propImages,
      } = req.body;
      const hostExists = await User.findOne({ _id: hostId });
      if (hostExists) {
        const address = {
          city: propCity,
          street: propStreet,
          pinno: propPin,
        };
        const property = await Property.create({
          hostId,
          hostName,
          propName,
          propType,
          phone: propPhone,
          propDescription,
          address,
          propRate,
          propImages,
        });

        if (property) {
          res.status(201).json({ message: "Property Added." });
        } else {
          res.status(400);
          throw new Error("Error Occured!");
        }
      } else {
        res.status(400);
        throw new Error("host not found.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }),
  getProperty:asyncHandler(async (req, res) => {
    try {
      const propertyData = await Property.find({});
      if (propertyData) {
        res.json(propertyData);
      } else {
        res.status(400);
        throw new Error("Error Occured!");
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error.message);
    }
  }),
};
