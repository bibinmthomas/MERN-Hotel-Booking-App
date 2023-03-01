import {
  Box,
  Button,
  Container,
  Divider,
  Icon,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { propertyWorkingLoadingOff } from "../../features/property/propertyWorkingSlice";
import { getCurrentProp } from "../../actions/propertyAction";
import Loading from "../../components/Loading";

function HotelInfo() {
  const dispatch = useDispatch();
  const propertyData = useSelector((state) => state.propertyWorking);
  const { loading, propertyInfo, propertyCurrent } = propertyData;
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getCurrentProp(id, propertyInfo));
      if (propertyCurrent?.propImages !== []) {
        dispatch(propertyWorkingLoadingOff());
        console.log(propertyCurrent)
      }
    }
  }, [propertyCurrent]);

  return (
    <>
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
                <img alt="" class="mb-4" src={propertyCurrent?.propImages[0]} />

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
                  <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div class="max-w-md mx-auto">
                      <div class="flex items-center space-x-5">
                        <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                          i
                        </div>
                        {/* Rating */}
                        <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                          <h2 class="leading-relaxed">
                          ₹{propertyCurrent?.propRate}/night
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
                              <div class="relative focus-within:text-gray-600 text-gray-400">
                                <input
                                  type="text"
                                  class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder="25/02/2020"
                                />
                                <div class="absolute left-3 top-2">
                                  <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div class="flex flex-col">
                              <label class="leading-loose">Check-out</label>
                              <div class="relative focus-within:text-gray-600 text-gray-400">
                                <input
                                  type="text"
                                  class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder="26/02/2020"
                                />
                                <div class="absolute left-3 top-2">
                                  <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex flex-col">
                            <label class="leading-loose">
                              Event Description
                            </label>
                            <input
                              type="text"
                              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Optional"
                            />
                          </div>
                        </div>
                        <div class="pt-4 flex items-center space-x-4">
                          <button class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                            <svg
                              class="w-6 h-6 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>{" "}
                            Cancel
                          </button>
                          <button class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                            Create
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
  );
}

export default HotelInfo;
