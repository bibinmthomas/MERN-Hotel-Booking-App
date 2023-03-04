import React, { useEffect } from "react";

import { Divider, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IconButton from "@mui/joy/IconButton";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getBlogData } from "../../../actions/blogAction";
function HomePage() {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blogCreate);
  const { loading, error, blogInfo } = blogData;
  useEffect(() => {
    console.log("Before dispatch...");
    dispatch(getBlogData());
    if (blogInfo) {
      console.log("bloginfo:",blogInfo);
    }
  }, []);
  let first4 = blogInfo?.slice(0, 4);
  const hotels = [
    {
      title: "Good Apartment 1",
      pic: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address: "California,USA",
    },
    {
      title: "Good Apartment 2",
      pic: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address: "Miami,LA,USA",
    },
    {
      title: "Good Apartment 3",
      pic: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address: "California,USA",
    },
    {
      title: "Good Apartment 4",
      pic: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address: "Miami,LA,USA",
    },
  ];

  return (
    <>
      {/* Banner */}
      <div
        style={{
          height: "30rem",
          backgroundImage:
            "url(https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Hotels */}
      <Typography marginLeft="3rem" marginTop="4rem" variant="h3" gutterBottom>
        Top Rated Hotels
      </Typography>
      <Divider
        sx={{ borderBottomWidth: 5, bgcolor: "black", borderRadius: "1rem" }}
        style={{ marginLeft: "3rem", width: "10rem" }}
      />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "5rem",
          marginLeft: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Grid container spacing={1}>
          {hotels.map((item, index) => {
            return (
              <Grid key={index} item xs>
                <Card sx={{ minHeight: "300px", width: 260 }}>
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
                      bottom: "17rem",
                      transform: "translateY(50%)",
                    }}
                  >
                    <FavoriteBorderRoundedIcon className="FavPink" />
                  </IconButton>
                  <CardCover>
                    <img src={item.pic} loading="lazy" alt="lol no pic" />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                  />
                  <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      mb={1}
                      style={{ color: "white" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography style={{ color: "white" }}>
                      {item.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* Blogs */}
      <Typography marginLeft="3rem" marginTop="4rem" variant="h3" gutterBottom>
        Hotel Rental Guides and Tips
      </Typography>
      <Divider
        sx={{ borderBottomWidth: 5, bgcolor: "black", borderRadius: "1rem" }}
        style={{ marginLeft: "3rem", width: "10rem" }}
      />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "5rem",
          marginLeft: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Grid container spacing={1}>
          {first4?.map((item, index) => {
            return (
              <Grid key={index} item xs>
                <Card sx={{ minHeight: "300px", width: 260 }}>
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
                      bottom: "17rem",
                      transform: "translateY(50%)",
                    }}
                  >
                    <FavoriteBorderRoundedIcon className="FavPink" />
                  </IconButton>
                  <CardCover>
                    <img src={item.blogPic} loading="lazy" alt="lol no pic" />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                  />
                  <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      mb={1}
                      style={{ color: "white" }}
                    >
                      {item.blogTitle}
                    </Typography>
                    <Typography style={{ color: "white" }}>
                      {/* {item.address} */}
                      {item.blogContent.slice(0, 15) + "..."}
                    </Typography>

                      

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

export default HomePage;
