import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import Button from "@mui/material/Button";
import AdminHotelManagement from "../AdminHotelManagement/AdminHotelManagement";
import Loading from "../../components/Loading";
import { getHostDetails } from "../../actions/adminAction";

const drawerWidth = 240;

function AdminHomePage(props) {
  const [option, setOption] = useState("Dashboard");

  const setAdmin = props.setAdmin;
  const sidebarOptions = [
    "Dashboard",
    "User Management",
    "Hotel Management",
    "Blog Management",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setAdmin(false);
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // useEffect(() => {
  //   console.log(option);
  // }, [option]);

  const drawer = (
    <div>
      <Toolbar></Toolbar>
      <Divider />
      <List>
        {sidebarOptions.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                setOption(text);
                if(text === "Hotel Management"){
                  dispatch(getHostDetails())
                }
              }}
            >
              {text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {option ? "Admin Dashboard" : null}
          </Typography>

          <Button
            variant="outlined"
            style={{ color: "white", justifyItems: "end" }}
            onClick={() => {
              logoutHandler();
            }}
            textalign="center"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <>
        {loading && <Loading />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {option === "Dashboard" && "1"}
          {option === "User Management" && "2"}
          {option === "Hotel Management" && <AdminHotelManagement />}
          {option === "Blog Management" && "4"}
        </Box>
      </>
    </Box>
  );
}

export default AdminHomePage;
