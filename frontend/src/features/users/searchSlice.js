import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  searchInfo: [],
  searchType: "",
  error: null,
};

const searchWorkingSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchWorkingReq: (state, action) => {
      state.loading = true;
    },
    searchWorkingSuccess: (state, action) => {
      state.searchInfo = action.payload.filteredProducts;
      state.searchType = action.payload.value;
      state.loading = false;
    },
    searchWorkingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchWorkingLoadingOff: (state, action) => {
      state.loading = false;
    },
  },
});

export default searchWorkingSlice.reducer;
export const {
  searchWorkingReq,
  searchWorkingSuccess,
  searchWorkingFail,
  searchWorkingLoadingOff,
} = searchWorkingSlice.actions;
