import {
  blogCreateFail,
  blogCreateLoadingOff,
  blogCreateReq,
  blogCreateSuccess,
} from "../features/blogs/blogCreateSlice";

import axiosConfig from "../axiosConfig";

export const newBlog = (host, title, content, URL) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(blogCreateReq());
    console.log("In dispatch", host, title, content, URL);

    const { data } = await axiosConfig.post(
      `/postBlog`,
      {
        host,
        title,
        content,
        URL,
      },
      config
    );
    console.log("Recieved from backend:", data);
    // dispatch(blogCreateSuccess(data));
    dispatch(blogCreateLoadingOff());
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(blogCreateFail(errorIs));
  }
};
