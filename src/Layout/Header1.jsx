

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Slice/AuthSlice";

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
import AdbIcon from "@mui/icons-material/Adb";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
const INITIAL_PAGES = ["Home", "About", "Services" ,"Doctors","Blog","Contact", "Login"];
const AUTH_PAGES = ["Home", "About", "Services", "Doctors","Blog","Contact"];
const SETTINGS = ["Dashboard", "Logout"];

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {Logouttoggle} = useSelector((state) => state?.auth) || {};
    const name = localStorage.getItem("name") || {};
    const user=name
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");
        // navigate("/login");
    };

    const pages = Logouttoggle ? AUTH_PAGES : INITIAL_PAGES;

    return (
        <>
        <header className="header">
        {/* <div className="topbar" >
           <div className="container topbar-container">
           
            <ul className="top-contact">
               <li ><i className="fa fa-phone" ></i>+880 1234 56789</li>
               <li ><i className="fa fa-envelope" ></i><a href="mailto:support@yourmail.com">support@yourmail.com</a></li>
             </ul>
             <div className="get-quote" style={{margin:'0'}}>
               <Link to="/select-service" className="btn">Get Appointment</Link>
             </div>
            
           </div>
         </div> */}
        </header>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo and AppBar Brand */}
                    <MedicalServicesIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
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
                        Lifeline 
                    </Typography>

                    {/* Mobile Navigation Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page}>
                                    <Link
                                     to={page !== 'Home' ? `/${page.toLowerCase()}` : '/'}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo for Mobile View */}
                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
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
                        LOGO
                    </Typography>

                    {/* Desktop Navigation Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={page !== 'Home' ? `/${page.toLowerCase()}` : '/'}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block", textDecoration: "none" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* User Account Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        {Logouttoggle && (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt={localStorage.getItem('name')}
                                       // src={`https://restapinodejs.onrender.com/${user.photo}`}
                                        src='/video/profilepic.png'
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
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
                            {Logouttoggle && SETTINGS.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}
                                    component={Link}
                                    to={(setting !== "Logout" && `/${setting.toLowerCase().replace(" ", "-")}`) || `/`}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}

export default ResponsiveAppBar;