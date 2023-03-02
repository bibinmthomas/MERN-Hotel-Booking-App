import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationLoading: false,
  reservationInfo: {},
  reservationError: null,
};
const reservationCreateSlice = createSlice({
  name: "reservationCreate",
  initialState,
  reducers: {
    reservationCreateReq: (state, action) => {
      state.reservationLoading = true;
    },
    reservationCreateSuccess: (state, action) => {
      state.reservationLoading = false;
      state.reservationInfo = action.payload;
    },
    reservationCreateFail: (state, action) => {
      state.reservationLoading = false;
      state.reservationError = action.payload;
    },
    reservationCreateLoadingOff: (state, action) => {
      state.reservationLoading = false;
    },
  },
});
export default reservationCreateSlice.reducer;
export const {
  reservationCreateReq,
  reservationCreateSuccess,
  reservationCreateFail,
  reservationCreateLoadingOff,
} = reservationCreateSlice.actions;
