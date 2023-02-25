import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage";
// import axios from "axios";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/userAction";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import { authentication } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState();
  const [expendForm, setExpendForm] = useState(false);

  //firebase trial
  // const [otp, setotp] = useState("");
  // const [show, setshow] = useState(false);
  // const [final, setfinal] = useState("");

  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();

  // useEffect(() => {
  //     console.log(OTP);
  // }, [OTP]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    if (phone.length >= 12) {
      setExpendForm(true);
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log(error);
        });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(name,email,password,confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      setMessage("All fields are mandatory");
      return;
    } else if (!(password.length >= 8 && confirmPassword.length >= 8)) {
      setMessage("Password must be atleast 8 characters");
      return;
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else if (name.length < 8) {
      setMessage("Name must be atleast 8 characters");
      return;
    }else if(OTP.length !== 6){
      setMessage("Invalid OTP")
      return
    } else {
      setMessage(null);
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(OTP).then((result) => {

        // User signed in successfully.
        const user = result.user;

        //finally registering
      dispatch(register(name, email, phone, password));
      }).catch((error) => {

        // User couldn't sign in (bad verification code?)
        setMessage("Unable to confirm OTP")
      });

    }
  };

  return (
    <Box
      sx={{
        marginTop: "6rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <form sx={{ mt: 1, display: "flex" }} onSubmit={submitHandler}>
        <span className="text-primary">Username</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Username"
          variant="outlined"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="text-primary">Email</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="text-primary">Phone No.</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Phone"
          variant="outlined"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {expendForm === true ? (
          <>
            <span className="text-primary">Enter OTP:</span>
            <TextField
              sx={{ mt: 1, display: "flex" }}
              label="OTP"
              variant="outlined"
              type="number"
              required
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
          </>
        ) : null}
        {expendForm === false ? (
          <Button
            sx={{ mt: 1, display: "flex" }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={requestOTP}
          >
            Request OTP
          </Button>
        ) : null}

        <span className="text-primary">Password</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Password"
          variant="outlined"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-primary">Confirm Password</span>
        <TextField
          sx={{ mt: 1, display: "flex" }}
          label="Confirm Password"
          variant="outlined"
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Register as?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel value="User" control={<Radio />} label="User" />
            <FormControlLabel value="Hotel" control={<Radio />} label="Hotel" />
          </RadioGroup>
        </FormControl> */}

        <Button
          disabled={expendForm ? false : true}
          sx={{ mt: 1, display: "flex" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Sign up
        </Button>
        <span className="text-center">
          Already a member?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </span>
      </form>
      <div id="recaptcha-container"></div>
    </Box>
  );
};

export default RegisterScreen;
