import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminStatsloading: false,
  bookingCount: 0,
  scheduleCount: 0,
  checkinCount: 0,
  checkoutCount: 0,
  adminStatserror: null,
};

const adminStatsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    adminStatsReq: (state, action) => {
      state.adminStatsloading = true;
    },
    adminStatsSuccess: (state, action) => {
      state.bookingCount = action.payload.bookingCount;
      state.scheduleCount = action.payload.scheduleCount;
      state.checkinCount = action.payload.checkinCount;
      state.checkoutCount = action.payload.checkoutCount;
      state.adminStatsloading = false;
    },
    adminStatsFail: (state, action) => {
      state.adminStatsloading = false;
      state.adminStatserror = action.payload;
    },
    adminStatsLoadingOff: (state, action) => {
      state.adminStatsloading = false;
    },
  },
});

export default adminStatsSlice.reducer;
export const {
  adminStatsReq,
  adminStatsSuccess,
  adminStatsFail,
  adminStatsLoadingOff,
} = adminStatsSlice.actions;
