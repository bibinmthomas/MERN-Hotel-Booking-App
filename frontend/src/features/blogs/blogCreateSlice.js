import { createSlice } from "@reduxjs/toolkit";

const blogInfoFromStorage = localStorage.getItem("blogInfo")
  ? JSON.parse(localStorage.getItem("blogInfo"))
  : null;

const initialState = {
  loading: false,
  blogInfo: blogInfoFromStorage,
  error: null,
};

const blogCreateSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogCreateReq: (state, action) => {
      state.loading = true;
    },
    blogCreateSuccess: (state, action) => {
      state.loading = false;
      state.blogInfo = action.payload;
    },
    blogCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    blogCreateLoadingOff: (state, action) => {
      state.loading = false;
    },
  },
});
export default blogCreateSlice.reducer;
export const { blogCreateReq, blogCreateSuccess, blogCreateFail,blogCreateLoadingOff } =
  blogCreateSlice.actions;