import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slice/AuthSlice";
import { IconButton } from "@mui/material";
import { AppBar, Toolbar, Typography, Menu, MenuItem, Avatar } from '@mui/material';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const profilePic=localStorage.getItem('image')
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };
  console.log(`${process.env.REACT_APP_BASE_URL}${profilePic}`);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleMenuOpen = (event) => {
	setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
	setAnchorEl(null);
};
  return (
    <>
      <header className="header">
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-5 col-12">
                <ul className="top-link">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Doctors</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <ul className="top-contact">
                  <li>
                    <i className="fa fa-phone"></i>+880 1234 56789
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <a href="mailto:support@yourmail.com">
                      support@yourmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="logo">
                    <a href="index.html">
                      <img src="/img/logo.png" alt="#" />
                    </a>
                  </div>

                  <div className="mobile-nav"></div>
                </div>
                <div className="col-lg-7 col-md-9 col-12">
                  <div className="main-menu">
                    <nav className="navigation">
                      <ul className="nav menu">
                        <li className={isActive("/")}>
                          <Link to="/">Home</Link>
                        </li>
                        <li className={isActive("/about")}>
                          <Link to="/about">About </Link>
                        </li>
                        <li className={isActive("/doctors")}>
                          <Link to="/doctors">Doctos </Link>
                        </li>
                        <li className={isActive("/services")}>
                          <Link to="/services">Services </Link>
                        </li>
                        <li className={isActive("/blogs")}>
                          <Link to="/blogs">Blogs</Link>
                        </li>
                        <li className={isActive("/contact")}>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        {!localStorage.getItem("token") && (
                          <li className={isActive("/login")}>
                            <Link to="/login">Login</Link>
                          </li>
                        ) }

                       {localStorage.getItem('token') && <div >
                          <IconButton onClick={handleMenuOpen} color="inherit">
                            <Avatar
                              alt=''
                               src={`${process.env.REACT_APP_BASE_URL}${profilePic}`}
                              
                            />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => {
                                navigate("/dashboard");
                                handleMenuClose();
                              }}
                            >
                              Dashboard
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleLogout();
                                handleMenuClose();
                              }}
                            >
                              Logout
                            </MenuItem>
                          </Menu>
                        </div>}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-lg-2 col-12">
                  <div className="get-quote">
                    <Link to="/select-service" className="btn">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

