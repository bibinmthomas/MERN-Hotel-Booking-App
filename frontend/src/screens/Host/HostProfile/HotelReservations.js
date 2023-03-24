import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteReservation,
  HostReservationFetch,
} from "../../../actions/reservationAction";
import Loading from "../../../components/Loading";
import { reservationCreateSuccess } from "../../../features/reservation/reservationCreateSlice";

function HotelReservations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const reservationData = useSelector((state) => state.reservationWorking);
  const { reservationLoading, reservationInfo, reservationError } =
    reservationData;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { propertyInfo } = useSelector((state) => state.propertyWorking);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(!refresh);
    }
    dispatch(HostReservationFetch(id));
  }, [refresh]);

  return (
    <Container sx={{ marginTop: "5rem" }}>
      Host Reservations
      {reservationLoading ? (
        <Loading />
      ) : (
        <Container>
          <div class="overflow-x-auto">
            {/* <div class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden"> */}
            <div class="w-full lg:w-5/6">
              <div class="bg-white shadow-md rounded my-6">
                <table class="min-w-max w-full table-auto">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">Name</th>
                      <th class="py-3 px-6 text-left">Client</th>
                      <th class="py-3 px-6 text-center">Total Cost</th>
                      <th class="py-3 px-6 text-center">Status</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm font-light">
                    {Object.keys(reservationInfo).length !== 0 ? (
                      <>
                        {reservationInfo.map((item, index) => {
                          return (
                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                              <td class="py-3 px-6 text-left whitespace-nowrap">
                                <div class="flex items-center">
                                  <span class="font-medium">
                                    {propertyInfo.map((obj) => {
                                      if (obj._id === item.propId)
                                        return obj.propName;
                                    })}
                                  </span>
                                </div>
                              </td>
                              <td class="py-3 px-6 text-left">
                                <div class="flex items-center">
                                  <div class="mr-2">
                                    <img
                                      class="w-6 h-6 rounded-full"
                                      src={userInfo.pic}
                                      alt="LOL"
                                    />
                                  </div>
                                  <span>{userInfo.name}</span>
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                  <span>{item.totalPrice}</span>
                                </div>
                              </td>
                              <td class="py-3 px-6 text-center">
                                {item.paymentStatus ? (
                                  <span class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                    Scheduled
                                  </span>
                                ) : (
                                  <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                  <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg
                                      // onClick={() => {
                                      //   handleClickOpen(item);
                                      // }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </div>
                                  <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg
                                      onClick={async () => {
                                        await dispatch(
                                          reservationCreateSuccess(item)
                                        );
                                        navigate("/payments");
                                        setRefresh(!refresh);
                                        dispatch(deleteReservation(item));
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <p>No Reservations Made</p>
                    )}
                    {/* </div> */}
                    {/* )} */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </div>
        </Container>
      )}
    </Container>
  );
}

export default HotelReservations;
