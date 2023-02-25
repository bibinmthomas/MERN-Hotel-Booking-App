import { createSlice } from "@reduxjs/toolkit";

const blogInfoFromStorage = localStorage.getItem("blogInfo")
  ? JSON.parse(localStorage.getItem("blogInfo"))
  : null;

const initialState = {
  loading: false,
  blogInfo: blogInfoFromStorage,
  error: null,
};

const blogWorkingSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogWorkingReq: (state, action) => {
      state.loading = true;
    },
    blogWorkingSuccess: (state, action) => {
      state.loading = false;
      state.blogInfo = action.payload;
    },
    blogWorkingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    blogWorkingLoadingOff: (state, action) => {
      state.loading = false;
    },
  },
});
export default blogWorkingSlice.reducer;
export const { blogWorkingReq, blogWorkingSuccess, blogWorkingFail,blogWorkingLoadingOff } =
blogWorkingSlice.actions;