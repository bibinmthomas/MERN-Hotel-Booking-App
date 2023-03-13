import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationLoading: false,
  reservationInfo: [],
  reservationError: null,
};
const reservationWorkingSlice = createSlice({
  name: "reservationWorking",
  initialState,
  reducers: {
    reservationWorkingReq: (state, action) => {
      state.reservationLoading = true;
    },
    reservationWorkingSuccess: (state, action) => {
      state.reservationLoading = false;
      state.reservationInfo = action.payload;
    },
    reservationWorkingFail: (state, action) => {
      state.reservationLoading = false;
      state.reservationError = action.payload;
    },
    reservationWorkingLoadingOff: (state, action) => {
      state.reservationLoading = false;
    },
  },
});
export default reservationWorkingSlice.reducer;
export const {
    reservationWorkingReq,
    reservationWorkingSuccess,
    reservationWorkingFail,
    reservationWorkingLoadingOff,
} = reservationWorkingSlice.actions;
