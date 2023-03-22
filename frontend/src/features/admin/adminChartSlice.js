import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminChartloading: false,
  hotelChart: null,
  blogChart: null,
  adminCharterror: null,
};

const adminChartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    adminChartReq: (state, action) => {
      state.adminChartloading = true;
    },
    adminChartSuccess: (state, action) => {
      state.hotelChart = action.payload.hotelChart;
      state.blogChart = action.payload.blogChart;
      state.adminChartloading = false;
    },
    adminChartFail: (state, action) => {
      state.adminChartloading = false;
      state.adminCharterror = action.payload;
    },
    adminChartLoadingOff: (state, action) => {
      state.adminChartloading = false;
    },
  },
});

export default adminChartSlice.reducer;
export const {
  adminChartReq,
  adminChartSuccess,
  adminChartFail,
  adminChartLoadingOff,
} = adminChartSlice.actions;
