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
import { getBlogData } from "../../../actions/blogAction";
import {  useNavigate } from "react-router-dom";

function BlogPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blogCreate);
  const { blogInfo } = blogData;

  useEffect(() => {
    dispatch(getBlogData());
    console.log(blogInfo);
  }, []);

  const handleClick = (item) => {
    navigate("/blog-info", {state:{blogData: item} });
  };
  return (
    <>
      {/* Banner */}
      <div
        style={{
          height: "30rem",
          backgroundImage:
            "url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
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
          marginLeft: "1rem",
          marginBottom: "5rem",
        }}
      >
        <Grid container spacing={1}>
          {blogInfo.map((item, index) => {
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
                      top:"1px",
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
                    <div
                    onClick={()=>handleClick(item)}
                    >
                    <Typography
                      level="h2"
                      fontSize="lg"
                      mb={1}
                      style={{ color: "white" }}
                      >
                      {item.blogTitle}
                    </Typography>
                      </div>
                    {/* <div
                      style={{ color: "white" }}
                      // className="preview"
                      dangerouslySetInnerHTML={{ __html: item.blogContent }}
                    /> */}

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

export default BlogPage;
