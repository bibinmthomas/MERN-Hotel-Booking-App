import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import { Divider } from "@mui/material";
import "./Header.css";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const [scrollOffset,setScrollOffset] = useState(0)
  // const [render, setRender]=useState()

  // useEffect(() => {
  //   renderFun()
  //   setScrollOffset(window.scrollY)
  // },[render]);

  // const renderFun = ()=>{
  //   if(scrollOffset <=409.6000061035156){
  //     let x = Math.random() * 100;
  //     setRender(x)
  //   }else{
  //     let x = Math.random() * 100;
  //     setRender(x)
  //   }
  
  // }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   console.log(userInfo ? userInfo : "None");
  // }, [userInfo]);

 
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
    navigate("/");
  };
  
  return (
      <AppBar className="px-3" color="transparent" position="absolute">
        {/* <Container > */}
          <Toolbar color="transparent" disableGutters>
            {/* PUT ICON HERE */}
            <Link
            className="justify-start"
              to={userInfo ? (userInfo.isAdmin ? "/admin" : "/") : "/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                // href={userInfo ? (userInfo.isAdmin ? "/admin" : "/") : "/"}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO MAX
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                color="inherit"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                style={{ color: "black" }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Button color="inherit">
                <Link style={{textDecoration:"none"}} to="/hotels">Hotels</Link>
                </Button>
                <Button color="inherit">
                  <Link style={{textDecoration:"none"}} to="/blogs">Blogs</Link>
                </Button>
                <Button color="inherit">
                  Hot Deals
                </Button>
                <Button color="inherit">
                  Trip Planner
                </Button>
                <Button color="inherit">
                  About
                </Button>
              </Menu>
            </Box>
            {/* PUT ICON HERE */}
            <Link
              to={userInfo ? (userInfo.isAdmin ? "/admin" : "/") : "/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h5"
                noWrap
                component="a"
                // href={userInfo ? (userInfo.isAdmin ? "/admin" : "/") : "/"}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO MIN
              </Typography>
            </Link>
            <Box
              marginLeft="24rem"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link style={{textDecoration:"none"}} to="/hotels">Hotels</Link>
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link style={{textDecoration:"none"}} to="/blogs">Blogs</Link>
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Hot Deals
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Trip Planner
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                About
              </Button>
            </Box>
            {userInfo ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    
                    <Avatar src={userInfo.pic} alt={userInfo?.name}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    {userInfo?.isAdmin ? null : userInfo.role === "User" ? (
                      <Link
                        to="/user-profile"
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="inherit" textalign="center">
                          Profile
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to="/hotel-profile"
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="inherit" textalign="center">
                          Profile
                        </Button>
                      </Link>
                    )}
                    <Button
                      color="inherit"
                      onClick={() => {
                        logoutHandler();
                      }}
                      textalign="center"
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    color="inherit"
                    sx={{ my: 2, display: "block" }}
                    textalign="center"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    color="inherit"
                    sx={{ my: 2, display: "block" }}
                    textalign="center"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        {/* </Container> */}
      </AppBar>
  );
}
export default ResponsiveAppBar;
