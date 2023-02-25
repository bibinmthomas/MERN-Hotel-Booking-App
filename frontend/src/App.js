import React, { useEffect, useState } from "react";
import "./App.css";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import AdminHomePage from "./screens/AdminHomePage/AdminHomePage";
import Header from "./components/Header/Header";
import UserProfile from "./screens/UserProfile/UserProfile";
import HotelProfile from "./screens/HostProfile/HotelProfile";
import NewHost from "./screens/NewHost/NewHost";
import AdminHotelManagement from "./screens/AdminHotelManagement/AdminHotelManagement"
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import BlogPage from "./screens/BlogPage/BlogPage";
import BlogInfo from "./screens/BlogInfo/BlogInfo";
import HotelPage from "./screens/HotelPage/HotelPage";
import HotelInfo from "./screens/HotelInfo/HotelInfo"

function App() {
  const [admin, setAdmin] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(()=>{
    // console.log(admin);
  },[])
  return (
    <BrowserRouter>
      {admin ? null :<Header />}
      <main style={{ marginTop: "" }}>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog-info" element={<BlogInfo/>} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/hotel-info/:id" element={<HotelInfo/>} />
          <Route path="login" element={userInfo ? <HomePage /> : <LoginScreen setAdmin={setAdmin} />} />
          <Route path="register" element={userInfo ? <HomePage /> :<RegisterScreen />} />
          <Route path="user-profile" element={userInfo?.role === "User" ? <UserProfile />:<Navigate to="/" />} />
          <Route path="hotel-profile" element={userInfo?.role === "Hotel" ?<HotelProfile />:<Navigate to="/" />} />

          <Route path="Newhost" element={userInfo ? <NewHost/> : <Navigate to="/" /> } />
          <Route
            path="admin"
            element={
              admin ? <AdminHomePage setAdmin={setAdmin}/> : <LoginScreen setAdmin={setAdmin} />
            }
          />
          <Route path="admin/hotel-management" element={ admin ? <AdminHotelManagement/> : <LoginScreen setAdmin={setAdmin}/> }/>
        </Routes>
      </main>
      {admin ? null :<Footer />}
    </BrowserRouter>
  );
}

export default App;
