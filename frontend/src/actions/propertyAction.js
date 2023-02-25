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
} from "../features/property/propertyWorkingSlice";

import axiosConfig from "../axiosConfig";


export const newProperty =
  (
    hostId,
    hostName,
    propName,
    propType,
    propPhone,
    propDescription,
    propStreet,
    propCity,
    propPin,
    propImages
  ) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      dispatch(propertyCreateReq());
      const { data } = await axiosConfig.post(
        `/postProperty`,
        {
          hostId,
          hostName,
          propName,
          propType,
          propPhone,
          propDescription,
          propStreet,
          propCity,
          propPin,
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
      await dispatch(propertyWorkingSuccess(data));
      // console.log("New property Data :", data);
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(propertyWorkingFail(errorIs));
    }
  };
