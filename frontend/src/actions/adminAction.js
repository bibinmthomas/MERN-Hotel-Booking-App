import {
  hotelWorkingFail,
  hotelWorkingReq,
  hotelWorkingSuccess,
  hotelWorkingLoadingOff,
} from "../features/hotels/hotelWorkingSlice";

import {
  propertyWorkingReq,
  propertyWorkingLoadingOff,
  propertyWorkingSuccess,
} from "../features/property/propertyWorkingSlice";

import {
  userWorkingReq,
  userWorkingSuccess,
  userWorkingLoadingOff,
} from "../features/users/userWorkingSlice";

import axiosConfig from "../axiosConfig";

export const getUserDetails = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userWorkingReq());
    const { data } = await axiosConfig.get("/admin/user-management", config);
    console.log("User Data :", data);
    await dispatch(userWorkingSuccess(data));
    localStorage.setItem("usersInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
export const getHostDetails = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(hotelWorkingReq());
    const { data } = await axiosConfig.get("/admin/hotel-management", config);
    console.log("Host Data :", data);
    await dispatch(hotelWorkingSuccess(data));
    localStorage.setItem("hostInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
export const getPropDetails = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(propertyWorkingReq());
    const { data } = await axiosConfig.get(
      "/admin/property-management",
      config
    );
    console.log("Property Data :", data);
    await dispatch(propertyWorkingSuccess(data));
    localStorage.setItem("propertyInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
export const userBlock = (_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userWorkingReq());
    const { data } = await axiosConfig.post(
      "/admin/userBlock",
      { _id },
      config
    );

    dispatch(getUserDetails());
    dispatch(userWorkingLoadingOff());
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
export const hostBlock = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(hotelWorkingReq());
    const { data } = await axiosConfig.post(
      "/admin/changeBlock",
      { user },
      config
    );

    dispatch(getHostDetails());
    dispatch(hotelWorkingLoadingOff());
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
export const propBlock = (_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(propertyWorkingReq());
    const { data } = await axiosConfig.post(
      "/admin/propBlock",
      { _id },
      config
    );

    dispatch(getPropDetails());
    dispatch(propertyWorkingLoadingOff());
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hotelWorkingFail(errorIs));
  }
};
