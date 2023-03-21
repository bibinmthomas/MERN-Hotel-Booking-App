import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Reservations from "../components/Reservations/Reservations";
import BlogInfo from "../screens/General/BlogInfo/BlogInfo";
import BlogPage from "../screens/General/BlogPage/BlogPage";
import HomePage from "../screens/General/HomePage/HomePage";
import HotelInfo from "../screens/General/HotelInfo/HotelInfo";
import HotelPage from "../screens/General/HotelPage/HotelPage";
import ReservationPayment from "../screens/User/ReservationPayment/ReservationPayment";
import ReservationSuccess from "../screens/User/ReservationSuccess/ReservationSuccess";
import UserProfile from "../screens/User/UserProfile/UserProfile";

function UserRoutes() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog-info" element={<BlogInfo />} />
      <Route path="/hotels" element={<HotelPage />} />
      <Route path="/hotel-info/:id" element={<HotelInfo />} />
      <Route path="/payments" element={<ReservationPayment />} />
      <Route path="/paymentSuccess/:id" element={<ReservationSuccess />} />
      <Route
        path="user-profile"
        element={
          userInfo?.role === "User" ? <UserProfile /> : <Navigate to="/" />
        }
      />
      <Route
        path="user-profile/reservation/:id"
        element={
          userInfo?.role === "User" ? <Reservations /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default UserRoutes;
