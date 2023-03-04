import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";

import Loading from "../../../components/Loading";
import { newProperty } from "../../../actions/propertyAction";
import {
  propertyWorkingReq,
  propertyWorkingLoadingOff,
} from "../../../features/property/propertyWorkingSlice";

//firebase imports
import { storage_bucket } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useDispatch, useSelector } from "react-redux";

function AddNewProperties({setNewBlogReload,newBlogReload}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const hotelLogin = useSelector((state) => state.userLogin);
  const { userInfo } = hotelLogin;

  const [hostId, setHostId] = useState("");
  const [hostName, setHostName] = useState("");
  const [propName, setPropName] = useState("");
  const [propType, setPropType] = useState("");
  const [propPhone, setPropPhone] = useState("");
  const [propDescription, setPropDescription] = useState("");
  const [propImages, setPropImages] = useState([]);
  const [propStreet, setPropStreet] = useState("");
  const [propCity, setPropCity] = useState("");
  const [propPin, setPropPin] = useState(0);
  const [propRate, setPropRate] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    // console.log(propImages);
    // console.log(imageFiles);
    if (userInfo) {
      setHostId(userInfo._id);
      setHostName(userInfo.name);
    }
  }, [open, propImages, imageFiles]);

  // upload file to firebase
  const uploadFile = (image) => {
    let file = image;
    //create a reference to the file to be uploaded
    let fileRef = ref(storage_bucket, "PropertyPics/" + file.name);
    //upload the file
    const uploadTask = uploadBytesResumable(fileRef, file);
    dispatch(propertyWorkingReq());

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
            setPropImages((prevImg) => [...prevImg, URL]);
            dispatch(propertyWorkingLoadingOff());
          }
        });
      }
    });
  };

  const handlePropertySubmit = async() => {
    if (
      (propName &&
        propType &&
        propPhone &&
        propDescription &&
        propStreet &&
        propCity &&
        propPin &&
        (propRate > 3000 )) !== ""
    ) {
      console.log("propName:", propName);
      console.log("propType:", propType);
      console.log("propPhone:", propPhone);
      console.log("propDescription:", propDescription);
      console.log("propStreet:", propStreet);
      console.log("propCity:", propCity);
      console.log("propPin:", propPin);
      console.log("propImages:", propRate);
      console.log("propImages:", propImages);
    } else {
      console.log("somethings missing...");
    }
    await dispatch(
      newProperty(
        hostId,
        hostName,
        propName,
        propType,
        propPhone,
        propDescription,
        propStreet,
        propCity,
        propPin,
        propRate,
        propImages
      )
    );
    setPropImages([])
    setImageFiles([])
    setNewBlogReload(!newBlogReload)
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const createProperty = (
    <>
      <Grid
        container
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Dialog fullScreen open={open} onClose={handleClose}>
          <DialogContent>
            <section class="bg-gray-100">
              <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                  <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-2 lg:p-12">
                    <input
                      onChange={(e) => {
                        setPropName(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Name"
                      type="text"
                      id="name"
                    />
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        Property Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={propType}
                        onChange={(e) => setPropType(e.target.value)}
                      >
                        <FormControlLabel
                          value="Apartment"
                          control={<Radio />}
                          label="Apartment"
                        />
                        <FormControlLabel
                          value="Villa"
                          control={<Radio />}
                          label="Villa"
                        />
                        <FormControlLabel
                          value="Shared"
                          control={<Radio />}
                          label="Shared"
                        />
                      </RadioGroup>
                      {/* {propType === "Shared" && <>
                      <input
                      onChange={(e) => {
                        setPropStreet(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="No. of tenant"
                      type="text"
                      id="name"
                    />{" "}
                      </>} */}
                    </FormControl>
                    <input
                      onChange={(e) => {
                        setPropStreet(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Street"
                      type="text"
                      id="name"
                    />{" "}
                    <input
                      onChange={(e) => {
                        setPropCity(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="City"
                      type="text"
                      id="name"
                    />{" "}
                    <input
                      onChange={(e) => {
                        setPropPin(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Pin Code"
                      type="number"
                      id="name"
                    />
                    <input
                      onChange={(e) => {
                        setPropPhone(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Phone"
                      type="number"
                      id="name"
                    />
                  </div>

                  <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form action="" class="space-y-4">
                      <div>
                      <input
                      onChange={(e) => {
                        setPropRate(e.target.value);
                      }}
                      class="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Price Rate"
                      type="number"
                      id="name"
                    />
                      </div>
                      <div>
                        <label class="sr-only" for="message">
                          Content
                        </label>

                        <ReactQuill
                          theme="snow"
                          value={propDescription}
                          onChange={setPropDescription}
                          className="edior-input"
                          modules={modules}
                          placeholder="Property Description..."
                        />
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={true}
                          onDrop={(acceptedFiles) => {
                            uploadFile(acceptedFiles[0]);
                            setImageFiles((prevFile) => [
                              ...prevFile,
                              acceptedFiles[0].name,
                            ]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border={`2px dashed blue`}
                              p="1rem"
                              sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />
                              {imageFiles.length === 0 ? (
                                <p style={{ color: "black" }}>
                                  Add Picture Here
                                </p>
                              ) : (
                                <>
                                  <Typography>{imageFiles}</Typography>

                                  {/* <EditOutlinedIcon /> */}
                                  <PhotoCamera />
                                </>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                        {/* {loading && <Loading />} */}
                      </div>

                      <div class="mt-4">
                        <DialogActions>
                          <Button
                            class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            class="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                            onClick={handlePropertySubmit}
                          >
                            Host Now
                          </Button>
                        </DialogActions>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
  return (
    <>
      <Grid item xs={3}>
        <Typography display="inline-block" variant="h5">
          Add Property:
        </Typography>
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineOutlinedIcon fontSize="large" />
        </IconButton>
        {createProperty}
      </Grid>
    </>
  );
}

export default AddNewProperties;
