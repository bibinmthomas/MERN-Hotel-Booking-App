import { createSlice } from "@reduxjs/toolkit";

const propertyInfoFromStorage = localStorage.getItem("propertyInfo")
  ? JSON.parse(localStorage.getItem("propertyInfo"))
  : null;

const initialState = {
  loading: false,
  propertyInfo: propertyInfoFromStorage,
  error: null,
};
const propertyCreateSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    propertyCreateReq: (state, action) => {
      state.loading = true;
    },
    propertyCreateSuccess: (state, action) => {
      state.loading = false;
      state.propertyInfo = action.payload;
    },
    propertyCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    propertyCreateLoadingOff: (state, action) => {
      state.loading = false;
    },
  },
});
export default propertyCreateSlice.reducer;
export const {
  propertyCreateReq,
  propertyCreateSuccess,
  propertyCreateFail,
  propertyCreateLoadingOff,
} = propertyCreateSlice.actions;
