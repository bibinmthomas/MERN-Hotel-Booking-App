import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../features/users/userLoginSlice";
import userRegisterReducer from "../features/users/userRegisterSlice";
import userWorkingReducer from "../features/users/userWorkingSlice";
import hotelCreateReducer from "../features/hotels/hotelCreateSlice";
import hotelWorkingReducer from "../features/hotels/hotelWorkingSlice";
import blogCreateReducer from "../features/blogs/blogCreateSlice";
import blogWorkingReducer from "../features/blogs/blogWorkingSlice";
import propertyCreateReducer from "../features/property/propertyCreateSlice";
import propertyWorkingReducer from "../features/property/propertyWorkingSlice";
import reservationCreateReducer from "../features/reservation/reservationCreateSlice";
import reservationCheckReducer from "../features/reservation/reservationCheckSlice";
import reservationWorkingReducer from "../features/reservation/reservationWorkingSlice";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userWorking: userWorkingReducer,
    hotelCreate: hotelCreateReducer,
    hotelWorking: hotelWorkingReducer,
    blogCreate: blogCreateReducer,
    blogWorking: blogWorkingReducer,
    propertyCreate: propertyCreateReducer,
    propertyWorking: propertyWorkingReducer,
    reservationCreate: reservationCreateReducer,
    reservationCheck: reservationCheckReducer,
    reservationWorking: reservationWorkingReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
