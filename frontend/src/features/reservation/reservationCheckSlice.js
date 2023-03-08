import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationLoading: false,
  reservationAvailable: false,
  reservationCorrectionDates: [],
  reservationError: null,
};
const reservationCheckSlice = createSlice({
  name: "reservationCreate",
  initialState,
  reducers: {
    reservationCheckReq: (state, action) => {
      state.reservationLoading = true;
    },
    reservationCheckSuccess: (state, action) => {
      state.reservationLoading = false;
      state.reservationAvailable = true;
      state.reservationCorrectionDates = action.payload.commonValues;
      state.reservationError = action.payload.message;
    },
    reservationCheckFail: (state, action) => {
      state.reservationLoading = false;
      state.reservationAvailable = false;
      state.reservationCorrectionDates = action.payload.commonValues;
      state.reservationError = action.payload.message;
    },
    reservationCheckLoadingOff: (state, action) => {
      state.reservationLoading = false;
    },
  },
});
export default reservationCheckSlice.reducer;
export const {
  reservationCheckReq,
  reservationCheckSuccess,
  reservationCheckFail,
  reservationCheckLoadingOff,
} = reservationCheckSlice.actions;
