import React, { useEffect, useState } from "react";
import "./App.css";
import LoginScreen from "./screens/General/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/General/RegisterScreen/RegisterScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/General/HomePage/HomePage";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import UserRoutes from "./routes/userRoutes";
import HostRoutes from "./routes/hostRoutes";
import AdminRoutes from "./routes/adminRoutes";
import Sidebar from "./components/Sidebar/Sidebar";
function App() {
  const [admin, setAdmin] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log("admin", admin);
    // console.log("userInfo", userInfo);
  }, []);
  return (
    <BrowserRouter>
      {admin ? null : <Header />}
      <>
        <Routes>
          <Route
            path="login"
            element={
              userInfo ? <HomePage /> : <LoginScreen setAdmin={setAdmin} />
            }
          />
          <Route
            path="register"
            element={userInfo ? <HomePage /> : <RegisterScreen />}
          />
          <Route
            path="admin/*"
            element={
              admin ? (
                <Sidebar>
                  <AdminRoutes admin setAdmin={setAdmin} />
                </Sidebar>
              ) : (
                <LoginScreen admin setAdmin={setAdmin} />
              )
            }
          />
        </Routes>
        <UserRoutes />
        <HostRoutes />
      </>
      {admin ? null : <Footer />}
    </BrowserRouter>
  );
}

export default App;
