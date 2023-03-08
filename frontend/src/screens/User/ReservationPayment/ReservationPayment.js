import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import App from "./App";

function ReservationPayment() {
  const navigate = useNavigate();
  const reservationData = useSelector((state) => state.reservationCreate);
  const { reservationLoading, reservationError, reservationInfo } =
    reservationData;
  const propertyData = useSelector((state) => state.propertyWorking);
  const { loading, propertyCurrent } = propertyData;
  const [paymentOption, setPaymentOption] = useState("PayTm");
  useEffect(() => {
    localStorage.setItem("reservationInfo", JSON.stringify(reservationInfo));
    console.log("propertyCurrent:", propertyCurrent);
    console.log("reservationInfo:", reservationInfo);
    console.log("paymentOption", paymentOption);
    if (Object.keys(reservationInfo).length == 0) {
      navigate(`/hotel-info/${propertyCurrent._id}`);
    }
  }, [paymentOption]);
  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <>
      <body class="flex items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800 p-8">
        {/* <!-- Component Start --> */}
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
          <div class="lg:col-span-2">
            <h2 class="text-sm font-medium">Payment Method</h2>

            <div class="bg-white rounded mt-4 shadow-lg">
              <div class="flex items-center px-8 py-5">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={paymentOption}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="PayTm"
                      control={<Radio />}
                      label="PayTm"
                    />
                    <FormControlLabel
                      value="Credit Card"
                      control={<Radio />}
                      label="Credit Card"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-sm font-medium">Purchase Summary</h2>
            {/*  */}
            {paymentOption === "PayTm" ? (
              <div class="bg-white rounded mt-4 shadow-lg py-6">
                <div class="px-8">
                  <div class="flex items-end">
                    <div>{propertyCurrent?.propName}</div>
                    <span class="text-sm ml-auto font-semibold">
                      ₹{reservationInfo?.propRate}
                    </span>
                  </div>
                </div>
                <div class="px-8 mt-4 border-t pt-4">
                  <div class="flex items-end justify-between">
                    <span class="font-semibold">Total Payment:</span>
                    <span class="font-semibold">
                      ₹{reservationInfo?.totalPrice}
                    </span>
                  </div>
                  <div className="grid col-span-2">
                    <span class="text-xs text-gray-500 mt-2">
                      Childrens:{reservationInfo?.guest?.children}
                    </span>
                    <span class="text-xs text-gray-500 mt-2">
                      Adults:{reservationInfo?.guest?.adult}
                    </span>
                    <span class="text-xs text-gray-500 mt-2">
                      Elders:{reservationInfo?.guest?.elder}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500 mt-2">Dates:</span>
                </div>
                <span class="text-xs text-gray-500 mt-2 mx-4">
                  {reservationInfo?.checkin}-{reservationInfo?.checkout}
                </span>
                <div class="flex items-center px-8 mt-8">
                  <input id="termsConditions" type="checkbox" />
                  <label
                    class="text-xs text-gray-500 ml-2"
                    for="termsConditions"
                  >
                    I agree to the terms and conditions.
                  </label>
                </div>
                <div class="flex flex-col px-8 pt-4">
                  <button class="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">
                    Reserve Now
                  </button>
                  <button class="text-xs text-blue-500 mt-3 underline">
                    Have a coupon code?
                  </button>
                </div>
              </div>
            ) : (
              <App />
            )}
            {/*  */}
          </div>
        </div>
        {/* <!-- Component End  --> */}
      </body>
    </>
  );
}

export default ReservationPayment;
