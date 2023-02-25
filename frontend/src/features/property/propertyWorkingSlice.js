import { createSlice } from "@reduxjs/toolkit";

const propertyInfoFromStorage = localStorage.getItem("propertyInfo")
  ? JSON.parse(localStorage.getItem("propertyInfo"))
  : null;

const initialState = {
  loading: false,
  propertyInfo: propertyInfoFromStorage,
  error: null,
};
const propertyWorkingSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    propertyWorkingReq: (state, action) => {
      state.loading = true;
    },
    propertyWorkingSuccess: (state, action) => {
      state.loading = false;
      state.propertyInfo = action.payload;
    },
    propertyWorkingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    propertyWorkingLoadingOff: (state, action) => {
      state.loading = false;
    },
  },
});
export default propertyWorkingSlice.reducer;
export const {
  propertyWorkingReq,
  propertyWorkingSuccess,
  propertyWorkingFail,
  propertyWorkingLoadingOff,
} = propertyWorkingSlice.actions;
