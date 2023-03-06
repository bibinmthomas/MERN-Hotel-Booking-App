import axiosConfig from "../axiosConfig";

import {
  reservationCreateFail,
  reservationCreateLoadingOff,
  reservationCreateReq,
  reservationCreateSuccess,
} from "../features/reservation/reservationCreateSlice";

export const newReservation =
  (userId, propId, hostId, propRate, totalPrice, checkin, checkout, guest) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      dispatch(reservationCreateReq());
      const { data } = await axiosConfig.post(
        `/postReservation`,
        {
          userId,
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
