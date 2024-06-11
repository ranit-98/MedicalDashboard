import React from 'react'
import { useDispatch } from "react-redux";
import { fetchServicesData } from "../../../API/Functions/AllServices.API";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import Loading from "../../../Layout/Loading";
import BreadCrumbs from "../../../Layout/BreadCrumbs";
import Layout from '../../../Layout/Layout';
import { Link } from 'react-router-dom';
const SelectService = () => {
    const dispatch = useDispatch();

    const fetchService = async () => {
      const response = await dispatch(fetchServicesData());
      return response.payload.data;
    };
  
    const { data: services, isLoading } = useQuery({
      queryKey: ["service"],
      queryFn: fetchService,
    });
    console.log(services);
  return (
    <>
    <Layout>
      {isLoading && <Loading/>}
     {!isLoading && 
     <section className="pricing-table section">
      <Container>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Select Service
          </Typography>
          <img src="img/section-img.png" alt="#" />
         
        </Box>
        <Grid container spacing={4}>
          {services?.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={`https://doctor-service.onrender.com/${service.image}`}
                  alt={service.departmentName}
                  sx={{ objectFit: "fill", height: "15rem" }}
                />
                <CardContent>
                  <Typography variant="h6" component="h4" gutterBottom>
                    {service.departmentName}
                  </Typography>
                  <Typography variant="body2">
                    {service.description.slice(0, 100)}
                  </Typography>
                  <div className="button">
                      <Link to={`/select-doctor/${service?._id}`} className="btn">Get Appointment</Link>
                    </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>}
    </Layout>
    </>
  )
}

export default SelectService
