import {
  Container,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { propertyWorkingLoadingOff } from "../../features/property/propertyWorkingSlice";
import { getCurrentProp } from "../../actions/propertyAction";
import { newReservation } from "../../actions/reservationAction";
import Loading from "../../components/Loading";

function HotelInfo() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const propertyData = useSelector((state) => state.propertyWorking);
  const { loading, propertyInfo, propertyCurrent } = propertyData;
  const userData = useSelector((state) => state.userLogin);
  const { userInfo } = userData;
  const reservationData = useSelector((state) => state.reservationCreate);
  const { reservationError, reservationInfo } =
    reservationData;
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(propertyCurrent?.propRate);
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(1);
  const [elderCount, setElderCount] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getCurrentProp(id, propertyInfo));
      if (propertyCurrent?.propImages !== []) {
        dispatch(propertyWorkingLoadingOff());
        console.log("propertyCurrent:", propertyCurrent);
        console.log("userInfo:", userInfo);
      }
      if (checkin && checkout) {
        if (checkin.getMonth() === checkout.getMonth()) {
          if (checkout.getDate() - checkin.getDate() !== 0) {
            console.log(checkout.getDate() - checkin.getDate());
            setTotalPrice(
              propertyCurrent?.propRate *
                (checkout.getDate() - checkin.getDate()) +
                (propertyCurrent?.propRate / 2) * childCount +
                (adultCount > 1
                  ? propertyCurrent?.propRate * adultCount - 5000
                  : 0) +
                (propertyCurrent?.propRate / 2) * elderCount
            );
          }
          console.log(totalPrice);
        }
      }
    }
  }, [
    propertyCurrent,
    totalPrice,
    checkin,
    checkout,
    childCount,
    adultCount,
    elderCount,
  ]);

  const handleCheckinChange = (newValue) => {
    setCheckin(newValue);
    if (checkin && checkout) {
      if (checkin.getMonth() === checkout.getMonth()) {
        if (checkout.getDate() - checkin.getDate() !== 0) {
          console.log(checkout.getDate() - checkin.getDate());
          setTotalPrice(
            propertyCurrent?.propRate * (checkout.getDate() - checkin.getDate())
          );
        }
        console.log(totalPrice);
      }
    }
  };
  const handleCheckoutChange = (newValue) => {
    setCheckout(newValue);
    if (checkin && checkout) {
      if (checkin.getMonth() === checkout.getMonth()) {
        if (checkout.getDate() - checkin.getDate() !== 0) {
          console.log(checkout.getDate() - checkin.getDate());
          setTotalPrice(
            propertyCurrent?.propRate * (checkout.getDate() - checkin.getDate())
          );
        }
        console.log(totalPrice);
      }
    }
  };
  const handleReset = () => {
    setChildCount(0);
    setAdultCount(1);
    setElderCount(0);
  };
  const handleReserveSubmit = async () => {
    const userId = userInfo._id;
    const propId = propertyCurrent._id;
    const hostId = propertyCurrent.hostId;
    const propRate = propertyCurrent.propRate;
    const guest = {
      children: childCount,
      adult: adultCount,
      elder: elderCount,
    };
    console.log(
      userId,
      propId,
      hostId,
      propRate,
      totalPrice,
      checkin,
      checkout,
      guest
    );
    setOpen(!open);
    await dispatch(
      newReservation(
        userId,
        propId,
        hostId,
        propRate,
        totalPrice,
        checkin,
        checkout,
        guest
      )
    );
    handleClose();
    navigate('/payments')
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <Backdrop open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <div style={{ height: "5rem" }}></div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Typography
              marginLeft="3rem"
              marginTop="4rem"
              variant="h3"
              gutterBottom
            >
              {propertyCurrent?.propName}
            </Typography>
            <Typography
              marginLeft="3rem"
              marginTop="4rem"
              variant="p"
              gutterBottom
            >
              By:{propertyCurrent?.hostName}
            </Typography>

            {/* <Divider
            sx={{
              borderBottomWidth: 5,
              bgcolor: "black",
              borderRadius: "1rem",
            }}
            style={{ marginLeft: "3rem", width: "15rem" }}
          /> */}
            {propertyCurrent && (
              <Container className="p-10">
                <div class=" columns-1 md:columns-2 lg:columns-2">
                  <img
                    alt=""
                    class="mb-4"
                    src={propertyCurrent?.propImages[0]}
                  />

                  <div class="columns-1 md:columns-2 lg:columns-2">
                    <img
                      alt=""
                      class="mb-4"
                      src={propertyCurrent?.propImages[1]}
                    />
                    <img
                      alt=""
                      class="mb-4"
                      src={propertyCurrent?.propImages[2]}
                    />
                    <img
                      alt=""
                      class="mb-4"
                      src={propertyCurrent?.propImages[3]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Typography variant="h3">Description</Typography>
                    {/* <Divider
                    sx={{
                      borderBottomWidth: 5,
                      bgcolor: "black",
                      borderRadius: "4px",
                    }}
                    style={{ width: "15rem" }}
                  /> */}
                    <div
                      className="w-5/6 my-5"
                      dangerouslySetInnerHTML={{
                        __html: propertyCurrent?.propDescription,
                      }}
                    />
                    <div>Type:{propertyCurrent?.propType}</div>
                    {/*  */}
                    {/* <div className="columns-2 md:columns-2 lg:columns-2 justify-between">  */}
                    <>
                      <Typography variant="h3">Address</Typography>
                      {/* <Divider
                      sx={{
                        borderBottomWidth: 5,
                        bgcolor: "black",
                        borderRadius: "4px",
                      }}
                      style={{ width: "15rem" }}
                    /> */}
                      {propertyCurrent?.address?.map((item, index) => {
                        return (
                          <>
                            <div key={index}>
                              City:{propertyCurrent?.address[0]?.city}
                            </div>
                            <div>
                              Street:{propertyCurrent?.address[0]?.street}
                            </div>
                            <div>
                              Pin Code:{propertyCurrent?.address[0]?.pinno}
                            </div>
                          </>
                        );
                      })}
                    </>
                    <>
                      <Typography variant="h3">Contact Info</Typography>
                      {/* <Divider
                      sx={{
                        borderBottomWidth: 5,
                        bgcolor: "black",
                        borderRadius: "4px",
                      }}
                      style={{ width: "15rem" }}
                    /> */}
                      <div>Host:{propertyCurrent?.hostName}</div>
                      <div>Phone:{propertyCurrent?.phone}</div>
                    </>

                    {/*  */}
                  </div>
                  <div>
                    {/*  */}
                    {/* <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                    <div class="relative py-3 sm:max-w-xl sm:mx-auto"> */}
                    <div class="px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                      <div class="max-w-md mx-auto">
                        <div class="flex items-center space-x-5">
                          <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                            i
                          </div>
                          {/* Rating */}
                          <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                            <h2 class="leading-relaxed">
                              ₹
                              {checkout?.getDate() === checkin?.getDate()
                                ? "Invalid"
                                : totalPrice}
                              /night
                            </h2>
                            <div class="flex items-center">
                              <svg
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                class="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                class="w-5 h-5 text-gray-300 dark:text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                        <div class="divide-y divide-gray-200">
                          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex items-center space-x-4">
                              <div class="flex flex-col">
                                <label class="leading-loose">Check-in</label>

                                <DesktopDatePicker
                                  label=""
                                  value={checkin}
                                  onChange={handleCheckinChange}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </div>
                              <div class="flex flex-col">
                                <label class="leading-loose">Check-out</label>

                                <DesktopDatePicker
                                  label=""
                                  value={checkout}
                                  onChange={handleCheckoutChange}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </div>
                            </div>
                            <div class="flex flex-col">
                              {/*  */}
                              <details class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                <summary class="flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer">
                                  <span class="text-sm font-medium">
                                    {" "}
                                    Guests:{" "}
                                  </span>

                                  <span class="transition group-open:-rotate-180">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-4 h-4"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                      />
                                    </svg>
                                  </span>
                                </summary>

                                <div class="bg-white border-t border-gray-200">
                                  <header class="flex items-center justify-between p-4">
                                    <span class="text-sm text-gray-700">
                                      {" "}
                                      Maximum number of tenents :{" "}
                                    </span>

                                    <button
                                      type="button"
                                      class="text-sm text-gray-900 underline underline-offset-4"
                                      onClick={handleReset}
                                    >
                                      Reset
                                    </button>
                                  </header>

                                  <div class="p-4 border-t border-gray-200">
                                    <div class="flex justify-between gap-4">
                                      <label class="leading-loose">
                                        Children:{" "}
                                      </label>

                                      <div class="flex items-center border-gray-100">
                                        <span
                                          onClick={() => {
                                            setChildCount((obj) => obj - 1);
                                            // decreaseChildCount();
                                          }}
                                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          -{" "}
                                        </span>
                                        <input
                                          class="h-8 w-8 border bg-white text-center text-xs outline-none appearance-none"
                                          type="number"
                                          value={childCount}
                                          min="1"
                                        />
                                        <span
                                          onClick={() => {
                                            setChildCount((obj) => obj + 1);
                                            // increaseChildCount();
                                          }}
                                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          +{" "}
                                        </span>
                                      </div>
                                    </div>
                                    {/*  */}
                                    <div class="flex justify-between gap-4">
                                      <label class="leading-loose">
                                        Adult:{" "}
                                      </label>

                                      <div class="flex items-center border-gray-100">
                                        <span
                                          onClick={() => {
                                            setAdultCount((obj) => obj - 1);
                                          }}
                                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          -{" "}
                                        </span>
                                        <input
                                          class="h-8 w-8 border bg-white text-center text-xs outline-none appearance-none"
                                          type="number"
                                          value={adultCount}
                                          min="1"
                                        />
                                        <span
                                          onClick={() => {
                                            setAdultCount((obj) => obj + 1);
                                          }}
                                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          +{" "}
                                        </span>
                                      </div>
                                    </div>
                                    {/*  */}
                                    <div class="flex justify-between gap-4">
                                      <label class="leading-loose">
                                        Elder:{" "}
                                      </label>

                                      <div class="flex items-center border-gray-100">
                                        <span
                                          onClick={() => {
                                            setElderCount((obj) => obj - 1);
                                          }}
                                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          -{" "}
                                        </span>
                                        <input
                                          class="h-8 w-8 border bg-white text-center text-xs outline-none appearance-none"
                                          type="number"
                                          value={elderCount}
                                          min="1"
                                        />
                                        <span
                                          onClick={() => {
                                            setElderCount((obj) => obj + 1);
                                          }}
                                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          {" "}
                                          +{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </details>
                              {/*  */}
                            </div>
                          </div>
                          <div class="pt-4 flex items-center space-x-4">
                            <button
                              onClick={handleReserveSubmit}
                              class="bg-black flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                            >
                              Reserve Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div>
                  </div> */}
                    {/*  */}
                  </div>
                </div>
              </Container>
            )}
          </>
        )}
      </>
    </LocalizationProvider>
  );
}

export default HotelInfo;
