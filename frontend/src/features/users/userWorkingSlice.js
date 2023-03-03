import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("usersInfo")
  ? JSON.parse(localStorage.getItem("usersInfo"))
  : null;
const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const userWorkingSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userWorkingReq: (state, action) => {
      state.loading = true;
    },
    userWorkingSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    userWorkingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userWorkingLoadingOff: (state, action) => {
        state.loading = false;
      },
  },
});

export default userWorkingSlice.reducer;
export const { userWorkingReq, userWorkingSuccess, userWorkingFail,userWorkingLoadingOff } =
  userWorkingSlice.actions; 
