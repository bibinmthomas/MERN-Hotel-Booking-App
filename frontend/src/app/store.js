import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../features/users/userLoginSlice";
import userRegisterReducer from "../features/users/userRegisterSlice";
import hotelCreateReducer from "../features/hotels/hotelCreateSlice";
import hotelWorkingReducer from "../features/hotels/hotelWorkingSlice";
import blogCreateReducer from "../features/blogs/blogCreateSlice";
import blogWorkingReducer from "../features/blogs/blogWorkingSlice";
import propertyCreateReducer from "../features/property/propertyCreateSlice";
import propertyWorkingReducer from "../features/property/propertyWorkingSlice";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    hotelCreate:hotelCreateReducer,
    hotelWorking:hotelWorkingReducer,
    blogCreate:blogCreateReducer,
    blogWorking:blogWorkingReducer,
    propertyCreate:propertyCreateReducer,
    propertyWorking:propertyWorkingReducer,

  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
