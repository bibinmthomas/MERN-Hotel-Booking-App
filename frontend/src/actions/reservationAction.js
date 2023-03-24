import axiosConfig from "../axiosConfig";

import {
  reservationCreateFail,
  reservationCreateLoadingOff,
  reservationCreateReq,
  reservationCreateSuccess,
} from "../features/reservation/reservationCreateSlice";

import {
  reservationCheckFail,
  reservationCheckLoadingOff,
  reservationCheckReq,
  reservationCheckSuccess,
} from "../features/reservation/reservationCheckSlice";
import {
  reservationWorkingReq,
  reservationWorkingFail,
  reservationWorkingLoadingOff,
  reservationWorkingSuccess,
} from "../features/reservation/reservationWorkingSlice";

export const checkValidDates = (id, dateArray) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(reservationCheckReq());
    var currentDateArray = [];
    dateArray.map((date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      currentDateArray.push(formattedDate);
    });
    // console.log("in Actions", id, currentDateArray);
    const { data } = await axiosConfig.post(
      `/checkValidDates`,
      {
        id,
        currentDateArray,
      },
      config
    );
    console.log("Recieved from backend:", data);
    if (data.message === "Invalid") {
      await dispatch(reservationCheckFail(data));
    } else {
      await dispatch(reservationCheckSuccess(data));
    }
    dispatch(reservationCheckLoadingOff());
  } catch (error) {
    console.log(error.message);
  }
};

export const newReservation =
  (userId, propId, hostId, propRate, totalPrice, checkin, checkout, guest) =>
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
      dispatch(reservationCreateReq());
      const { data } = await axiosConfig.post(
        `/postReservation`,
        {
          // userId,
          propId,
          hostId,
          propRate,
          totalPrice,
          checkin,
          checkout,
          guest,
        },
        config
      );
      console.log("Recieved from backend:", data);
      await dispatch(reservationCreateSuccess(data));
      dispatch(reservationCreateLoadingOff());
    } catch (error) {
      console.log(error.message);
    }
  };
export const confirmPayment = (id) => async (dispatch) => {
  try {
    console.log("in dispatch:", id);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axiosConfig.post(
      `/confirmPayment`,
      {
        id,
      },
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const reservationFetch = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log("in dispatch:", id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await dispatch(reservationWorkingReq());
    const { data } = await axiosConfig.get(`/reservationFetch`, config);
    console.log("Recieved from backend:", data);
    await dispatch(reservationWorkingSuccess(data));
    dispatch(reservationWorkingLoadingOff());
  } catch (error) {
    console.log(error.message);
  }
};
export const HostReservationFetch = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log("in dispatch:", id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await dispatch(reservationWorkingReq());
    const { data } = await axiosConfig.get(`/HostReservationFetch`, config);
    console.log("Recieved from backend:", data);
    await dispatch(reservationWorkingSuccess(data));
    dispatch(reservationWorkingLoadingOff());
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteReservation = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log("in dispatch:", id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await dispatch(reservationWorkingReq());
    const { data } = await axiosConfig.post(
      `/deleteReservation`,
      {
        id,
      },
      config
    );
    console.log("Recieved from backend:", data);
    await dispatch(reservationWorkingFail(data));
    dispatch(reservationWorkingLoadingOff());
  } catch (error) {
    console.log(error.message);
  }
};
