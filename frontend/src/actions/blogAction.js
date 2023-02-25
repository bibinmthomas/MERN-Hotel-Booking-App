import {
  blogWorkingReq,
  blogWorkingLoadingOff,
} from "../features/blogs/blogWorkingSlice";

import axiosConfig from "../axiosConfig";
import {
  blogCreateFail,
  blogCreateSuccess,
} from "../features/blogs/blogCreateSlice";

export const getBlogData = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axiosConfig.get(`/blogFetch`, config);
    localStorage.setItem("blogInfo", JSON.stringify(data));
    dispatch(blogCreateSuccess(data));
    // console.log("New blog Data :", data);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(blogCreateFail(errorIs));
  }
};

export const deleteBlogAction = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("id:", id);
    const { data } = await axiosConfig.delete(`/deleteBlog/${id}`, config);
    console.log("From backend:", data);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(blogCreateFail(errorIs));
  }
};
export const editBlogAction =
  (blogId, title, content, URL) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("In dispatch", blogId, title, content, URL);
      const { data } = await axiosConfig.post(
        `/editBlog`,
        {
          blogId,
          title,
          content,
          URL,
        },
        config
      );
      console.log("From backend:", data);
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(blogCreateFail(errorIs));
    }
  };
export const addComment =
  (blogId, userId, userName, userPic, commentContent) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(
        "In dispatch",
        blogId,
        userId,
        userName,
        userPic,
        commentContent
      );
      const { data } = await axiosConfig.post(
        `/addComment`,
        {
          blogId,
          userId,
          userName,
          userPic,
          commentContent,
        },
        config
      );
      console.log("From backend:", data);
      localStorage.setItem("newComment", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteCommentAction = (blogId, index) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("In dispatch", blogId, index);
    const { data } = await axiosConfig.post(
      `/deleteComment`,
      {
        blogId,
        index,
      },
      config
    );
    console.log("From backend:", data);
  } catch (error) {
    console.log(error.message);
  }
};
export const likeBlogAction = (blogId, likeData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("In dispatch", blogId, likeData);
    const { data } = await axiosConfig.post(
      `/likeBlog`,
      {
        blogId,
        likeData,
      },
      config
    );
    console.log("From backend:", data);
  } catch (error) {
    console.log(error.message);
  }
};
