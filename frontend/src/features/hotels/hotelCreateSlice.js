import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const hotelCreateSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    hotelCreateReq: (state, action) => {
      state.loading = true;
    },
    hotelCreateSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    hotelCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //   userLogout: (state, action) => {
    //     state.userInfo = null;
    //     state.error = null;
    //   },
  },
});

export default hotelCreateSlice.reducer;
export const { hotelCreateReq, hotelCreateSuccess, hotelCreateFail } =
  hotelCreateSlice.actions;
