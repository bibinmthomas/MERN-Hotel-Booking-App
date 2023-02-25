import {
  hotelWorkingFail,
  hotelWorkingReq,
  hotelWorkingSuccess,
  hotelWorkingLoadingOff,
} from "../features/hotels/hotelWorkingSlice";

import axiosConfig from "../axiosConfig";

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
    dispatch(hotelWorkingSuccess(data));
    localStorage.setItem("hostInfo", JSON.stringify(data));
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
