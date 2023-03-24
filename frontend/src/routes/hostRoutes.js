import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getHostDetails } from "../actions/adminAction";
import Reservations from "../components/Reservations/Reservations";
import HotelProfile from "../screens/Host/HostProfile/HotelProfile";
import HotelReservations from "../screens/Host/HostProfile/HotelReservations";
import NewHost from "../screens/User/NewHost/NewHost";
import UserProfile from "../screens/User/UserProfile/UserProfile";

function HostRoutes() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const hostData = useSelector((state) => state.hotelWorking);
  const { hostInfo } = hostData;
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log("check:", check);
    dispatch(getHostDetails());
    if (hostInfo) {
      hostInfo.map((item) => {
        if (item.user === userInfo?._id) {
          setCheck(item.blocked);
        }
      });
    }
  }, [check]);
  return (
    <Routes>
      <Route
        path="Newhost"
        element={userInfo ? <NewHost /> : <Navigate to="/" />}
      />

      <Route
        path="hotel-profile"
        element={
          userInfo?.role === "Hotel" ? (
            <HotelProfile />
          ) : (
            <Navigate to="/user-profile" />
          )
        }
      />
      <Route
        path="hotel-profile/reservation/:id"
        element={
          userInfo?.role === "Hotel" ? <Reservations /> : <Navigate to="/" />
        }
      />
      <Route
        path="hotel-profile/reservations/:id"
        element={
          userInfo?.role === "Hotel" ? <HotelReservations /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default HostRoutes;
