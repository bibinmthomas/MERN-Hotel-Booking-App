import "./BlogInfo.css";
import {
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  blogWorkingReq,
  blogWorkingLoadingOff,
} from "../../../features/blogs/blogWorkingSlice";

import React, { useEffect, useState } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addComment, deleteCommentAction, likeBlogAction } from "../../../actions/blogAction";
import Loading from "../../../components/Loading";
import DOMPurify from "dompurify";

function BlogInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const blogData = useSelector((state) => state.blogWorking);
  const { loading } = blogData;

  const userData = useSelector((state) => state.userLogin);
  const { userInfo } = userData;

  const [commentContent, setcommentContent] = useState("");
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    console.log("BlogData:", state.blogData);
    console.log("UserInfo:", userInfo);
    if (state.blogData.likes.id.includes(userInfo?._id)) setLikeState(true);
  }, [likeState]);

  const blogId = state.blogData._id;
  const userId = userInfo?._id;
  const userPic = userInfo?.pic;
  const userName = userInfo?.name;

  const handleCommentSubmit = async () => {
    if (commentContent !== "") {
      dispatch(blogWorkingReq());
      await dispatch(
        addComment(blogId, userId, userName, userPic, commentContent)
      );
      const commentData = localStorage.getItem("newComment");
      console.log("newComment : ", JSON.parse(commentData));
      setcommentContent("");
      state.blogData.comments.push(JSON.parse(commentData));
      console.log(state.blogData.comments);
      dispatch(blogWorkingLoadingOff());

      navigate("/blog-info", { state: { blogData: state.blogData } });
    }
  };

  const deleteComment = async (index) => {
    dispatch(blogWorkingReq());
    state.blogData.comments.splice(index, 1);
    await dispatch(deleteCommentAction(blogId, index));
    dispatch(blogWorkingLoadingOff());
    navigate("/blog-info", { state: { blogData: state.blogData } });
  };
  const likeFn = async () => {
    if(!likeState){
      state.blogData.likes.id.push(userInfo?._id)
      setLikeState(true)
    }else{
      state.blogData.likes.id = state.blogData.likes.id.filter(id => id !== userInfo?._id)
      setLikeState(false)
    }
    const likeData = state.blogData.likes.id
    await dispatch(likeBlogAction(blogId,likeData))
  };
  return (
    <>
      <div style={{ height: "5rem" }}></div>
      <Typography marginLeft="3rem" marginTop="4rem" variant="h3" gutterBottom>
        {state.blogData.blogTitle}
      </Typography>
      <Divider
        sx={{ borderBottomWidth: 5, bgcolor: "black", borderRadius: "1rem" }}
        style={{ marginLeft: "3rem", width: "15rem" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr" }}>
        <div
          className="w-"
          style={{
            paddingTop: "1rem",
          }}
        >
          <img
            style={{
              marginLeft: "2rem",
              display: "flex",
              width: "60%",
              alignItems: "center",
              justifyContent: "center",
            }}
            src={state.blogData.blogPic}
            loading="lazy"
            alt=""
          />
          <Container
            sx={{ maxWidth: "2rem", marginLeft: "2rem", marginTop: "1rem" }}
          >
            <IconButton onClick={likeFn}>
              {likeState ? (
                <ThumbUpAltIcon fontSize="large" style={{ fill: "blue" }} />
              ) : (
                <ThumbUpAltIcon fontSize="large" />
              )}{" "}
              {state.blogData.likes.id.length}
            </IconButton>
          </Container>
        </div>

        <div
          className="w-5/6"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(state.blogData.blogContent) }}
        />
      </div>

      {/* Comment Section... */}
      <Container>
        {/* add comments */}
        <div
          class="flex mx-auto items-center justify-center shadow-lg mt-56 mb-4 max-w-lg"
          style={{ marginTop: "0rem" }}
        >
          <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div class="flex flex-wrap -mx-3 mb-6">
              <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Add a new comment
              </h2>
              <div class="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                  onChange={(e) => setcommentContent(e.target.value)}
                ></textarea>
              </div>
              <div class="w-full md:w-full flex items-start px-3">
                <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                <div class="-mr-1">
                  <Button
                    onClick={handleCommentSubmit}
                    class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    value="Post Comment"
                  >
                    POST
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Comments */}
        {state.blogData.comments.map((item, index) => {
          return (
            <div key={index} class="flex justify-center relative top-1/3">
              {loading ? (
                <Loading />
              ) : (
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                  <div class="relative flex gap-4">
                    <img
                      src={item.userPic}
                      class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                      alt=""
                      loading="lazy"
                    />
                    <div class="flex flex-col w-full">
                      <div class="flex flex-row justify-between">
                        <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">
                          {item.userName}
                        </p>
                        {item.user === userInfo?._id ? (
                          <>
                            <IconButton
                              style={{ backgroundColor: "white" }}
                              sx={{
                                position: "absolute",
                                zIndex: 2,
                                borderRadius: "50%",
                                right: "-1rem",
                              }}
                            >
                              <DeleteForeverIcon
                                color="warning"
                                onClick={() => {
                                  deleteComment(index);
                                }}
                              />
                            </IconButton>
                          </>
                        ) : null}
                      </div>
                      <p class="text-gray-400 text-sm">
                        {formatDistanceToNow(parseISO(item.createdAt))}
                        {/* {formatDistanceToNow(new Date(),format(item.createdAt, 'yyyy-MM-dd').toString())} */}
                      </p>
                    </div>
                  </div>
                  <p class="-mt-4 text-gray-500">{item.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default BlogInfo;
