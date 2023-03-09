import React from "react";
import { Route, Routes } from "react-router-dom";
// import Sidebar from "../components/Sidebar/Sidebar";
import AdminHomePage from "../screens/Admin/AdminHomePage/AdminHomePage";
import AdminUserManagement from "../screens/Admin/AdminUserManagement/AdminUserManagement"
import AdminHotelManagement from "../screens/Admin/AdminHotelManagement/AdminHotelManagement"
import AdminPropertyManagement from "../screens/Admin/AdminPropertyManagement/AdminPropertyManagement"
import AdminBlogManagement from "../screens/Admin/AdminBlogManagement/AdminBlogManagement"
function adminRoutes({admin, setAdmin}) {
  return (
    <Routes>
      <Route path="/" element={<AdminHomePage admin setAdmin={setAdmin} />} />
      <Route path="/user-approvals" element={<AdminUserManagement/>} />
      <Route path="/hotel-approvals" element={<AdminHotelManagement/>} />
      <Route path="/properties-approvals" element={<AdminPropertyManagement/>} />
      <Route path="/blog-reports" element={<AdminBlogManagement/>} />
    </Routes>
    
  );
}

export default adminRoutes;
