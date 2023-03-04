import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
} from "@mui/material";
import {
  deleteBlogAction,
  editBlogAction,
  getBlogData,
} from "../../../actions/blogAction";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Loading from "../../../components/Loading";
import {
  blogCreateLoadingOff,
  blogCreateReq,
} from "../../../features/blogs/blogCreateSlice";

//firebase imports
import { storage_bucket } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function BasicMenu({ item,setNewBlogReload,newBlogReload }) {
  const [blogId, setBlogId] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState(item.blogTitle);
  const [blogContent, setBlogContent] = useState(item.blogContent);
  const [URL, setURL] = useState("");

  const dispatch = useDispatch();
  const blogWorking = useSelector((state) => state.blogWorking);
  const { loading, error, blogInfo } = blogWorking;

  useEffect(() => {
    setBlogId(item._id);
  }, [blogId, open]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const deleteBlog = async() => {
    console.log(item._id);
    await dispatch(deleteBlogAction(item._id));
    setNewBlogReload(!newBlogReload)
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
      ],
      // handlers: {
      //   image: imageHandler,
      // },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // upload file to firebase
  const uploadFile = (e) => {
    let file = e.target.files[0];
    //create a reference to the file to be uploaded
    let fileRef = ref(storage_bucket, "BlogPics/" + file.name);
    //upload the file
    const uploadTask = uploadBytesResumable(fileRef, file);
    dispatch(blogCreateReq());
    //track progress of file upload
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + "% done.");
      if (progress === 100) {
        console.log(file.name);
        //to get back the link....
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          console.log(URL);
          if (URL) {
            console.log("in!!!!");
            setURL(URL);
            dispatch(blogCreateLoadingOff());
          }
        });
      }
    });
  };

  const handleBlogSubmit = () => {
    if ((blogTitle || blogContent || URL) !== "") {
      console.log("Blog Title:", blogTitle);
      console.log("Blog Content:", blogContent);
      console.log("URL:", URL);
      console.log(blogId);
    } else {
      console.log("somethings missing...");
    }
    dispatch(editBlogAction(blogId, blogTitle, blogContent, URL));
    handleClose();
    handleClose1()
  };

  const editBlog = (
    <Grid
      container
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogContent>
          <section class="bg-gray-100">
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
              <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div class="lg:col-span-2 lg:py-12">
                  <img
                    style={{
                      height: "28rem",
                      width: "25rem",
                      borderRadius: "0.5rem",
                    }}
                    src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="lol no pic"
                  />
                </div>

                <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                  <form action="" class="space-y-4">
                    <div>
                      <label class="sr-only" for="name">
                        Blog Title
                      </label>
                      <input
                        value={blogTitle}
                        onChange={(e) => {
                          setBlogTitle(e.target.value);
                        }}
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Blog Title"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div>
                      <label class="sr-only" for="message">
                        Content
                      </label>

                      <ReactQuill
                        theme="snow"
                        value={blogContent}
                        onChange={setBlogContent}
                        className="edior-input"
                        modules={modules}
                        placeholder="Type something..."
                      />
                      {/* <textarea
                        onChange={(e) => {
                          setBlogContent(e.target.value);
                        }}
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Content"
                        rows="8"
                        id="message"
                      ></textarea> */}

                      <span>Add Images? Click Here! </span>
                      <IconButton
                        onChange={uploadFile}
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                      </IconButton>
                      {loading && <Loading />}
                    </div>

                    <div class="mt-4">
                      <DialogActions>
                        <Button
                          class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                          onClick={handleBlogSubmit}
                        >
                          POST
                        </Button>
                      </DialogActions>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </Grid>
  );

  return (
    <div>
      <IconButton
        style={{ backgroundColor: "white" }}
        sx={{
          position: "absolute",
          zIndex: 2,
          borderRadius: "50%",
          right: "1rem",
          top: "1px",
          transform: "translateY(50%)",
        }}
        id="basic-button"
        aria-controls={open1 ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClickOpen}>edit</MenuItem>
        <MenuItem onClick={deleteBlog}>Delete</MenuItem>
      </Menu>
      {editBlog}
    </div>
  );
}
