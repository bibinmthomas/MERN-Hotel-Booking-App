import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../features/users/userLoginSlice";

import {
  userRegisterReq,
  userRegisterSuccess,
  userRegisterFail,
} from "../features/users/userRegisterSlice";

import {
  hotelCreateReq,
  hotelCreateSuccess,
  hotelCreateFail,
} from "../features/hotels/hotelCreateSlice";

import { searchWorkingSuccess } from "../features/users/searchSlice";

import axiosConfig from "../axiosConfig";

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axiosConfig.post(
      `login`,
      {
        email,
        password,
      },
      config
    );
    console.log(data);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register =
  (name, email, phone, password) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(userRegisterReq());
      console.log(name, email, phone, password);

      const { data } = await axiosConfig.post(
        `/register`,
        {
          name,
          email,
          phone,
          password,
        },
        config
      );

      if (data.message) {
        dispatch(userRegisterFail(data.message));
      } else {
        dispatch(userRegisterSuccess(data));
      }
      dispatch(userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterFail(errorIs));
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userLoginReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosConfig.post(`/updateProfile`, user, config);

    dispatch(userLoginSuccess(data));
    console.log("Recieved from backend:", data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const newHost =
  (user, hotelName, adhaarno, city, street, pinno, URL) =>
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
      dispatch(hotelCreateReq());
      // console.log(user, hotelName, rooms, city, street, pinno, phone);

      const { data } = await axiosConfig.post(
        `/NewHost`,
        {
          hotelName,
          adhaarno,
          city,
          street,
          pinno,
          URL,
        },
        config
      );
      console.log("Recieved from backend:", data);
      // dispatch(hotelCreateSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(hotelCreateFail(errorIs));
    }
  };

export const getNewHostData = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axiosConfig.get(`/${user}`, config);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(userLoginSuccess(data));
    console.log("New Data :", data);
  } catch (error) {
    console.log(error.message);
  }
};
export const searchHotels = (value) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("from Dispatch:", value);
    const { data } = await axiosConfig.post(`searchHotels`, { value }, config);
  } catch (error) {
    console.log(error.message);
  }
};
export const searchBlogs = (value) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("from Dispatch:", value);
    const { data } = await axiosConfig.post(`searchBlogs`, { value }, config);
  } catch (error) {
    console.log(error.message);
  }
};
