import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { newHost, getNewHostData } from "../../../actions/userAction";

import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";

function NewHost() {
  const [user, setUser] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pinno, setPinno] = useState("");
  const [adhaarno, setAdhaarno] = useState("");

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const hotelLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = hotelLogin;
  // const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo._id);
    } else {
      <Navigate to="/" />;
    }
  }, [userInfo, user, setUser]);

  const submitHandler = async (e) => {
    // console.log(user, hotelName, rooms, city, street, pinno, phone);
    e.preventDefault();
    if (!hotelName || !adhaarno || !city || !street || !pinno) {
      setMessage("All fields are mandatory");
      return;
    } else {
      setMessage(null);
      if (dispatch(newHost(user, hotelName, adhaarno, city, street, pinno))) {
        setTimeout(() => {
          dispatch(getNewHostData(userInfo._id));
        }, 5000);
      }
    }
  };

  return (
    <Box
      sx={{
        marginRight:10,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <form sx={{ mt: 1, display: "flex" }} onSubmit={submitHandler}>
        <span className="text-primary">HotelName</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Hotel Name"
          variant="outlined"
          required
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <span className="text-primary">Adhaar No.</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Adhaar no."
          variant="outlined"
          required
          value={adhaarno}
          onChange={(e) => setAdhaarno(e.target.value)}
        />
        <span className="text-primary">City</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="City"
          variant="outlined"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <span className="text-primary">Street</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Street"
          variant="outlined"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <span className="text-primary">Pin No.</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Pin"
          variant="outlined"
          required
          value={pinno}
          onChange={(e) => setPinno(e.target.value)}
        />
        <Button
          sx={{ mt: 1, display: "flex" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Register As Host
        </Button>
        <span className="text-center">
          Already a Host?{" "}
          <Link to="/user-profile" style={{ textDecoration: "none" }}>
            Go Back
          </Link>
        </span>
      </form>
    </Box>
  );
}

export default NewHost;
