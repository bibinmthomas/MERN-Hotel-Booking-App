import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { newHost, getNewHostData } from "../../../actions/userAction";

import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";

//firebase imports
import { storage_bucket } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core";

function NewHost() {
  const [user, setUser] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pinno, setPinno] = useState("");
  const [adhaarno, setAdhaarno] = useState("");
  const [URL, setURL] = useState("");

  const [message, setMessage] = useState(null);

  // for onchange event
  const [pdfFileError, setPdfFileError] = useState("");
  const [selectPdfFile, setSelectPdfFile] = useState(null);

  const dispatch = useDispatch();
  const hotelLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = hotelLogin;
  // const navigate = useNavigate();
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    // console.log("selectPdfFile:", selectPdfFile);
    if (userInfo) {
      setUser(userInfo._id);
    } else {
      <Navigate to="/" />;
    }
  }, [userInfo, user, setUser, selectPdfFile]);

  const submitHandler = async (e) => {
    // console.log(user, hotelName, rooms, city, street, pinno, phone);
    e.preventDefault();
    if (!hotelName || !adhaarno || !city || !street || !pinno) {
      setMessage("All fields are mandatory");
      return;
    } else {
      setMessage(null);
      if (dispatch(newHost(user, hotelName, adhaarno, city, street, pinno,URL))) {
        setTimeout(() => {
          dispatch(getNewHostData(userInfo._id));
        }, 5000);
      }
    }
  };

  // upload file to firebase
  const uploadFile = (e) => {
    let file = e.target.files[0];
    //preview start
    const fileObj = ["application/pdf"];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileObj.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setSelectPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setSelectPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    }
    //preview end

    //create a reference to the file to be uploaded
    let fileRef = ref(storage_bucket, "Host-Verification-Proof/" + file.name);
    //upload the file
    const uploadTask = uploadBytesResumable(fileRef, file);
    // dispatch(userLoginReq());
    //track progress of file upload
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + "% done.");
      if (progress === 100) {
        console.log(file.name);
        //to get back the link....
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          console.log(URL);
          if (URL) {
            console.log("in!!!!");
            setURL(URL);
            // dispatch(userLoadingOff());
          }
        });
      }
    });
  };

  return (
    <>
      <div class="bg-white relative lg:py-20">
        <div
          class="w-full lg:pt-20 flex justify-center items-center pt-5 pr-10 pb-20 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 lg:flex-row"
        >
          <div class="w-full flex-row mx-auto mt-20 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div
              class="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10"
            >
              {" "}
              <p class="w-full text-4xl font-medium text-center leading-snug font-serif">
                Sign In to your account
              </p>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              {loading ? (
                <Loading />
              ) : (
                <div class="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div class="relative">
                    <span className="text-primary">HotelName</span>
                    <TextField
                      sx={{ mt: 1, display: "flex" }}
                      label="Hotel Name"
                      variant="outlined"
                      required
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                    />
                  </div>
                  <div class="relative">
                    <span className="text-primary">Adhaar No.</span>
                    <TextField
                      sx={{ mt: 1, display: "flex" }}
                      label="Adhaar no."
                      variant="outlined"
                      required
                      value={adhaarno}
                      onChange={(e) => setAdhaarno(e.target.value)}
                    />
                  </div>
                  <div class="relative">
                    {" "}
                    <span className="text-primary">City</span>
                    <TextField
                      sx={{ mt: 1, display: "flex" }}
                      label="City"
                      variant="outlined"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div class="relative">
                    {" "}
                    <span className="text-primary">Street</span>
                    <TextField
                      sx={{ mt: 1, display: "flex" }}
                      label="Street"
                      variant="outlined"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div class="relative">
                    <span className="text-primary">Pin No.</span>
                    <TextField
                      sx={{ mt: 1, display: "flex" }}
                      label="Pin"
                      variant="outlined"
                      required
                      value={pinno}
                      onChange={(e) => setPinno(e.target.value)}
                    />
                  </div>
                  <div class="relative">
                    <span className="text-primary">Verification Proof:</span>
                    <label class="w-64 flex flex-col justify-center items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span class="mt-2 text-base leading-normal">
                        Select a file
                      </span>
                      <input onChange={uploadFile} type="file" class="hidden" />
                    </label>
                  </div>
                  <div class="relative">
                    <h4>View PDF</h4>
                    <div className="pdf-container">
                      {/* show pdf conditionally (if we have one)  */}
                      {selectPdfFile && (
                        <>
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                              fileUrl={selectPdfFile}
                              plugins={[defaultLayoutPluginInstance]}
                            />
                          </Worker>
                        </>
                      )}

                      {/* if we dont have pdf or viewPdf state is null */}
                      {!selectPdfFile && <>No pdf file choosen </>}
                    </div>
                  </div>
                  <div class="relative">
                    <Button
                      class="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                                          rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                      sx={{ display: "flex" }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={submitHandler}
                    >
                      Register As Host
                    </Button>
                  </div>
                  <p class="bg-white font-medium text-gray-600">
                    Already a Host?{" "}
                    <Link to="/user-profile" style={{ textDecoration: "none" }}>
                      Go Back
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <svg
              viewbox="0 0 91 91"
              class="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"
            >
              <g stroke="none" strokewidth="1" fillrule="evenodd">
                <g fillrule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg
              viewbox="0 0 91 91"
              class="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"
            >
              <g stroke="none" strokewidth="1" fillrule="evenodd">
                <g fillrule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <Box
        sx={{
          marginRight: 10,
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
          {/* <span className="text-primary">HotelName</span>
          <TextField
            sx={{ mt: 1, display: "flex" }}
            label="Hotel Name"
            variant="outlined"
            required
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          /> */}
          {/* <span className="text-primary">Adhaar No.</span>
          <TextField
            sx={{ mt: 1, display: "flex" }}
            label="Adhaar no."
            variant="outlined"
            required
            value={adhaarno}
            onChange={(e) => setAdhaarno(e.target.value)}
          /> */}
          {/* <span className="text-primary">City</span>
          <TextField
            sx={{ mt: 1, display: "flex" }}
            label="City"
            variant="outlined"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          /> */}
          {/* <span className="text-primary">Street</span>
          <TextField
            sx={{ mt: 1, display: "flex" }}
            label="Street"
            variant="outlined"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          /> */}
          {/* <span className="text-primary">Pin No.</span>
          <TextField
            sx={{ mt: 1, display: "flex" }}
            label="Pin"
            variant="outlined"
            required
            value={pinno}
            onChange={(e) => setPinno(e.target.value)}
          /> */}
          {/* <Button
            sx={{ mt: 1, display: "flex" }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={submitHandler}
          >
            Register As Host
          </Button> */}
          {/* <span className="text-center">
            Already a Host?{" "}
            <Link to="/user-profile" style={{ textDecoration: "none" }}>
              Go Back
            </Link>
          </span> */}
        </form>
      </Box>
    </>
  );
}

export default NewHost;
