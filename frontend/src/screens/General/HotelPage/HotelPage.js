import CardCover from "@mui/joy/CardCover";
import { Divider, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IconButton from "@mui/joy/IconButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyData } from "../../../actions/propertyAction";
import { useNavigate } from "react-router-dom";

function HotelPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const propertyData = useSelector((state) => state.propertyWorking);
  const { propertyInfo } = propertyData;

  useEffect(() => {
    dispatch(getPropertyData());
    console.log("In HotelPage : ", propertyInfo);
  }, []);

  const handleClick = (id) => {
    navigate(`/hotel-info/${id}`);
  };

  return (
    <>
      {/* Banner */}
      <div
        style={{
          height: "30rem",
          backgroundImage:
            "url(https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      {/* hotels */}
      <Typography marginLeft="3rem" marginTop="4rem" variant="h3" gutterBottom>
        All Hotel
      </Typography>
      <Divider
        sx={{ borderBottomWidth: 5, bgcolor: "black", borderRadius: "1rem" }}
        style={{ marginLeft: "3rem", width: "10rem" }}
      />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "5rem",
          marginLeft: "1rem",
          marginBottom: "5rem",
        }}
      >
        <Grid container spacing={1}>
          {propertyInfo?.map((item, index) => {
            if (!item.propStatus)
              return (
                <Grid key={index} item xs>
                  <Card sx={{ minHeight: "350px", width: 350 }}>
                    <IconButton
                      aria-label="Like minimal photography"
                      size="md"
                      variant="solid"
                      style={{ backgroundColor: "white" }}
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        right: "1rem",
                        top: "1px",
                        transform: "translateY(50%)",
                      }}
                    >
                      <FavoriteBorderRoundedIcon className="FavPink" />
                    </IconButton>
                    <CardCover>
                      <img
                        src={item.propImages[0]}
                        loading="lazy"
                        alt="lol no pic"
                      />
                    </CardCover>
                    <CardCover
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                      }}
                    />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <div onClick={() => handleClick(item._id)}>
                        <Typography
                          level="h2"
                          fontSize="lg"
                          mb={1}
                          style={{ color: "white" }}
                        >
                          {item.propName}
                        </Typography>
                        <Typography
                          level="h2"
                          fontSize="lg"
                          mb={1}
                          style={{ color: "white" }}
                        >
                          By:{item.hostName}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default HotelPage;
