import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Reservations from "../components/Reservations/Reservations";
import HotelProfile from "../screens/Host/HostProfile/HotelProfile";
import NewHost from "../screens/User/NewHost/NewHost";

function HostRoutes() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Routes>
      <Route
        path="Newhost"
        element={userInfo ? <NewHost /> : <Navigate to="/" />}
      />

      <Route
        path="hotel-profile"
        element={
          userInfo?.role === "Hotel" ? <HotelProfile /> : <Navigate to="/" />
        }
      />
      <Route
        path="hotel-profile/reservation/:id"
        element={
          userInfo?.role === "Hotel" ? <Reservations /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default HostRoutes;
