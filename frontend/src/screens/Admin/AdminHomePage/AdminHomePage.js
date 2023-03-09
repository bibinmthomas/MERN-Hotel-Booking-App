import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import Loading from "../../../components/Loading";
import { Button } from "@mui/material";

function AdminHomePage({ admin, setAdmin }) {
  // useEffect(() => {
  //   console.log("setAdmin", setAdmin);
  // },[]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const logoutHandler = async () => {
    await dispatch(logout());
    setAdmin(false);
    // localStorage.removeItem("userInfo");
    navigate("/admin");
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ color: "black", justifyItems: "end" }}
        onClick={() => {
          logoutHandler();
        }}
        textalign="center"
      >
        Logout
      </Button>
      Admin Main Page
      {loading && <Loading />}
    </>
  );
}

export default AdminHomePage;
