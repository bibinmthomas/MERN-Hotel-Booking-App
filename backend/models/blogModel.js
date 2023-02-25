const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    userPic: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      // required: true,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
    blogPic: {
      type: String,
      default: "",
    },
    likes: {
      id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
      ],
      default:0
    },
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        userPic: String,
        userName:String,
        content: String,
        createdAt:{
          type:Date,
          immutable:true,
          default:()=>Date.now()
      }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blogs", blogSchema);
module.exports = Blog;
