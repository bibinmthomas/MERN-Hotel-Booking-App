import { createSlice } from "@reduxjs/toolkit";

const hostInfoFromStorage = localStorage.getItem("hostInfo")
  ? JSON.parse(localStorage.getItem("hostInfo"))
  : null;

const initialState = {
  loading: false,
  hostInfo: hostInfoFromStorage,
  error: null,
};
const hotelWorkingSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    hotelWorkingReq: (state, action) => {
      state.loading = true;
    },
    hotelWorkingSuccess: (state, action) => {
      state.loading = false;
      state.hostInfo = action.payload;
    },
    hotelWorkingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    hotelWorkingLoadingOff:(state, action) =>{
      state.loading = false;
    }
  },
});

export default hotelWorkingSlice.reducer;
export const { hotelWorkingReq, hotelWorkingSuccess, hotelWorkingFail,hotelWorkingLoadingOff } =
hotelWorkingSlice.actions;
