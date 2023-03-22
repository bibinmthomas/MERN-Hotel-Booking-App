import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/user-approvals",
      name: "User Approvals",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/hotel-approvals",
      name: "Hotel Approvals",
      icon: <FaRegChartBar />,
    },
    {
      path: "/admin/properties-approvals",
      name: "Properties Approvals",
      icon: <FaCommentAlt />,
    },
    // {
    //   path: "/admin/blog-reports",
    //   name: "Blog Reports",
    //   icon: <FaShoppingBag />,
    // },
    // {
    //   path: "/",
    //   name: "Extra",
    //   icon: <FaThList />,
    // },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars color="white" onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="max-h-screen overflow-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
