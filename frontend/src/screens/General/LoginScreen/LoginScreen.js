import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../actions/userAction";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if(userInfo.isAdmin){
        props.setAdmin(true)
        navigate("/admin")
        return
      }
      props.setAdmin(false)
      navigate("/");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Box
      sx={{
        marginTop: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form sx={{ mt: 1 }} onSubmit={submitHandler}>
        <span className="text-primary">Email</span>
        <TextField
        sx={{ mt: 1,display:"flex" }}
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="text-primary">Password</span>
        <TextField
        sx={{ mt: 1,display:"flex" }}
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
        sx={{ mt: 1,display:"flex" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Sign in
        </Button>
        <span className="text-center">
          Not a member?{" "}
          <Link to="/Register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </span>
      </form>
    </Box>
  );
};

export default LoginScreen;
