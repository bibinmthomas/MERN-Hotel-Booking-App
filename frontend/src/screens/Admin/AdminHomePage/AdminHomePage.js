import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import Loading from "../../../components/Loading";
import PieChartComponent1 from "../../../components/PieChart/PieChart1";
import PieChartComponent2 from "../../../components/PieChart/PieChart2";
import { getChartStats, getCounts } from "../../../actions/adminAction";

function AdminHomePage({ admin, setAdmin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminStats = useSelector((state) => state.adminStats);
  const {
    adminStatsloading,
    adminStatserror,
    bookingCount,
    scheduleCount,
    checkinCount,
    checkoutCount,
  } = adminStats;
  // const adminCharts = useSelector((state) => state.userLogin);
  // const { adminChartloading, hotelChart, blogChart, adminCharterror } =
  //   adminCharts;

  useEffect(() => {
    dispatch(getCounts());
    dispatch(getChartStats());
  }, []);

  const logoutHandler = async () => {
    await dispatch(logout());
    setAdmin(false);
    navigate("/admin");
  };

  return (
    <>
      {adminStatsloading && <Loading />}
      {loading && <Loading />}
      <main class="">
        <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
          <div class="grid grid-cols-12 gap-6">
            <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              {/* cards */}
              <div class="col-span-12 mt-8">
                <div class="flex items-center h-10 intro-y">
                  <h2 class="mr-5 text-lg font-medium truncate black">
                    Dashboard
                  </h2>
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
                </div>
                <div class="grid grid-cols-12 gap-6 mt-5">
                  <a
                    class="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div class="p-5 ">
                      <div class="flex justify-between">
                        <svg
                          class="h-10 w-10 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.98 2.442H8.02L0 10.46h2.275l6.882-6.88 6.881 6.881H24l-8.02-8.018m-.492 9.348L9.157 5.459 4.01 10.605v4.987a1.33 1.33 0 001.329 1.329h6.077l4.637 4.637v-4.637h2.598a1.33 1.33 0 001.33-1.33V11.79h-4.494z"
                          />
                        </svg>
                        <div class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span class="flex items-center black">30%</span>
                        </div>
                      </div>
                      <div class="ml-2 w-full flex-1">
                        <div>
                          <div class="mt-3 text-3xl font-bold leading-8 black">
                            {bookingCount}
                          </div>

                          <div class="mt-1 text-base text-gray-600 black">
                            Bookings
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    class="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div class="p-5">
                      <div class="flex justify-between">
                        <svg
                          class="h-10 w-10 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M12 14a1 1 0 10-1-1 1 1 0 001 1zm5 0a1 1 0 10-1-1 1 1 0 001 1zm-5 4a1 1 0 10-1-1 1 1 0 001 1zm5 0a1 1 0 10-1-1 1 1 0 001 1zM7 14a1 1 0 10-1-1 1 1 0 001 1zM19 4h-1V3a1 1 0 00-2 0v1H8V3a1 1 0 00-2 0v1H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 15a1 1 0 01-1 1H5a1 1 0 01-1-1v-9h16zm0-11H4V7a1 1 0 011-1h14a1 1 0 011 1zM7 18a1 1 0 10-1-1 1 1 0 001 1z"
                          />
                        </svg>
                        <div class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span class="flex items-center black">30%</span>
                        </div>
                      </div>
                      <div class="ml-2 w-full flex-1">
                        <div>
                          <div class="mt-3 text-3xl font-bold leading-8 black">
                            {scheduleCount}
                          </div>

                          <div class="mt-1 text-base text-gray-600 black">
                            Scheduled Room
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div class="p-5">
                      <div class="flex justify-between">
                        <svg
                          class="h-10 w-10 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M6 3.5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-2a.5.5 0 00-1 0v2A1.5 1.5 0 006.5 14h8a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-8A1.5 1.5 0 005 3.5v2a.5.5 0 001 0v-2z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M11.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H1.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"
                          />
                        </svg>
                        <div class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span class="flex items-center black">30%</span>
                        </div>
                      </div>
                      <div class="ml-2 w-full flex-1">
                        <div>
                          <div class="mt-3 text-3xl font-bold leading-8 black">
                            {checkinCount}
                          </div>

                          <div class="mt-1 text-base text-gray-600 black">
                            Check-In
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div class="p-5">
                      <div class="flex justify-between">
                        <svg
                          class="h-10 w-10 text-pink-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0v2z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"
                          />
                        </svg>
                        <div class="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span class="flex items-center black">30%</span>
                        </div>
                      </div>
                      <div class="ml-2 w-full flex-1">
                        <div>
                          <div class="mt-3 text-3xl font-bold leading-8 black">
                            {checkoutCount}
                          </div>

                          <div class="mt-1 text-base text-gray-600 black">
                            Check-Out
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              {/* cards end */}
              {/* charts */}
              <div class="col-span-12 mt-5">
                <div class="grid gap-2 grid-cols-1 lg:grid-cols-2">
                  <div class="bg-white shadow-lg p-4" id="chartline">
                    <PieChartComponent1 />
                  </div>
                  <div class="bg-white shadow-lg" id="chartpie">
                    <PieChartComponent2 />
                  </div>
                </div>
              </div>
              {/* charts end */}
              {/* table */}
              {/* <div class="col-span-12 mt-5">
                <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                  <div class="bg-white p-4 shadow-lg rounded-lg">
                    <h1 class="font-bold text-base black">Latest Blogs</h1>
                    <div class="mt-4">
                      <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto">
                          <div class="py-2 align-middle inline-block min-w-full">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                              <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div class="flex cursor-pointer">
                                        <span class="mr-2  black">
                                          Blog Name
                                        </span>
                                      </div>
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div class="flex cursor-pointer">
                                        <span class="mr-2  black">Likes</span>
                                      </div>
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div class="flex cursor-pointer">
                                        <span class="mr-2  black">STATUS</span>
                                      </div>
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      <div class="flex cursor-pointer">
                                        <span class="mr-2  black">ACTION</span>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 black">
                                      <p>blogName</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5  black">
                                      <p>number</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                      <div class="flex text-green-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          class="w-5 h-5 mr-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        <p>Active</p>
                                      </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                      <div class="flex space-x-4">
                                        <a
                                          href="#"
                                          class="text-blue-500 hover:text-blue-600"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                          </svg>
                                          <p>Edit</p>
                                        </a>
                                        <a
                                          href="#"
                                          class="text-red-500 hover:text-red-600"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 mr-1 ml-3"
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
                                          <p>Delete</p>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* table end */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminHomePage;
