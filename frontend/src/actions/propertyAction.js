import {
  propertyCreateReq,
  propertyCreateLoadingOff,
  propertyCreateSuccess,
  propertyCreateFail,
} from "../features/property/propertyCreateSlice";
import {
  propertyWorkingReq,
  propertyWorkingLoadingOff,
  propertyWorkingSuccess,
  propertyWorkingFail,
  propertyWorkingCurrentSuccess,
} from "../features/property/propertyWorkingSlice";

import axiosConfig from "../axiosConfig";

export const newProperty =
  (
    hostName,
    propName,
    propType,
    livingRoom,
    view,
    bedRoom,
    kitchen,
    propPhone,
    propDescription,
    propStreet,
    propCity,
    propPin,
    propRate,
    propImages
  ) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch(propertyCreateReq());
      const { data } = await axiosConfig.post(
        `/postProperty`,
        {
          hostName,
          propName,
          propType,
          livingRoom,
          view,
          bedRoom,
          kitchen,
          propPhone,
          propDescription,
          propStreet,
          propCity,
          propPin,
          propRate,
          propImages,
        },
        config
      );
      console.log("Recieved from backend:", data);
      dispatch(propertyCreateLoadingOff());
    } catch (error) {
      console.log(error.message);
    }
  };
export const getPropertyData = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axiosConfig.get(`/propertyFetch`, config);
    localStorage.setItem("propertyInfo", JSON.stringify(data));
    dispatch(propertyWorkingSuccess(data));
    // console.log("New property Data :", data);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(propertyWorkingFail(errorIs));
  }
};
export const getCurrentProp = (id, propertyInfo) => async (dispatch) => {
  try {
    dispatch(propertyWorkingReq());
    propertyInfo.filter(async (item) => {
      if (item._id == id) {
        await dispatch(propertyWorkingCurrentSuccess(item));
        localStorage.setItem("propertyCurrent", JSON.stringify(item));
      }
    });
    // await dispatch(propertyWorkingLoadingOff())
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(propertyWorkingFail(errorIs));
  }
};
