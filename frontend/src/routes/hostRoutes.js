import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HotelProfile from "../screens/Host/HostProfile/HotelProfile";
import NewHost from "../screens/User/NewHost/NewHost";

function hostRoutes(userInfo) {
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
    </Routes>
  );
}

export default hostRoutes;
