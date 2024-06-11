

import React from "react";
import { useDispatch } from "react-redux";
import { fetchDoctorData } from "../API/Functions/Doctor.APi";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CssBaseline,
  Box,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";

const AllDoctors = () => {
  const dispatch = useDispatch();

  const fetchDoctors = async () => {
    const response = await dispatch(fetchDoctorData());
    return response.payload.data;
  };

  const { data: doctors, isLoading } = useQuery({
    queryKey: ["allDocs"],
    queryFn: fetchDoctors,
  });

  return (
    <>
      <CssBaseline />
      
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
             <Loading/>
            </Box>
          ) : (
            <>
              <div
                style={{
                  position: "relative",
                  marginBottom: "15px",
                  width: "100%",
                  height: "400px",
                  marginTop: "0px",
                }}
              >
                <video
                  src="/video/doctor.mp4"
                  autoPlay
                  loop
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />

                <div
                  className="container"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#00796b",
                    textAlign: "center",
                    zIndex: 1,
                  }}
                >
                  <h2 style={{ color: "black" }}>Our Doctors</h2>
                  <ul
                    className="bread-list"
                    style={{ listStyle: "none", padding: 0, margin: 0 }}
                  >
                    <li style={{ display: "inline", fontSize: "20px" }}>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      style={{
                        display: "inline",
                        margin: "0 5px",
                        fontSize: "20px",
                      }}
                    >
                      <i
                        className="icofont-simple-right"
                        style={{ color: "black" }}
                      ></i>
                    </li>
                    <li
                      className="active"
                      style={{
                        display: "inline",
                        color: "black",
                        fontSize: "20px",
                      }}
                    >
                      Doctors
                    </li>
                  </ul>
                </div>
              </div>
              <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, padding: "2rem" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "2rem",
                }}
              >
                Meet Our Specialists
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {doctors?.map((doctor) => (
                  <Grid item key={doctor.id}>
                    <Card
                      sx={{
                        maxWidth: 300,
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Link to={`/doctor-details/${doctor._id}`}>
                      <CardActionArea sx={{ height: "100%" }}>
                        <CardMedia
                          component="img"
                          image={`https://doctor-service.onrender.com/${doctor.image}`}
                          alt={doctor.name}
                          sx={{
                            objectFit: "cover",
                            height: "15rem",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ fontWeight: "bold", color: "#333" }}
                          >
                            {doctor.name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ color: "#00796b" }}
                          >
                            {doctor.department_details[0].departmentName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.description.slice(0, 100)}...
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      </Link>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              </Box>
      </Container>
            </>
          )}
       
    </>
  );
};

export default AllDoctors;
