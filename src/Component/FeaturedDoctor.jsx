import React from "react";
import { useDispatch } from "react-redux";
import { fetchFeaturedDoctorData } from "../API/Functions/FeaturedDoctor.API";
import { useQuery } from "@tanstack/react-query";
import styles from "../Page/CMS/About";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
const FeaturedDoctor = () => {
  const dispatch = useDispatch();

  const fetchFeaturedDoctor = async () => {
    const response = await dispatch(fetchFeaturedDoctorData());
    return response.payload.data;
  };

  const { data: featuredDoctor, isLoading } = useQuery({
    queryKey: ["feature"],
    queryFn: fetchFeaturedDoctor,
  });
  console.log(featuredDoctor);
  return (
    <>
      <Container className={styles.container}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          className={styles.sectionTitle}
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem" ,
            color: "#00796b" ,
            textAlign: "center",
            textTransform: "uppercase"
          }}
        >
          Our Specialist Doctor
        </Typography>
        <Grid container spacing={4}>
          {featuredDoctor?.map((doctor) => (
            <Grid item xs={12} md={4} key={doctor.id}>
              <Box key={doctor._id} sx={{ mb: 4 }}>
                <Card className={styles.card} style={{ maxWidth: "300px" }}>
                  <Box className={styles.cardCurvedBg} />
                  <CardMedia
                    component="img"
                    image={`https://doctor-service.onrender.com/${doctor.image}`}
                    alt={doctor.name}
                    style={{ height: "15rem" }}
                    className={styles.cardMedia}
                  />
                  <CardContent className={styles.cardContent}>
                    <Typography
                      variant="h6"
                      component="h4"
                      gutterBottom
                      className={styles.cardTitle}
                    >
                      {doctor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.cardSpecialization}
                    >
                      {doctor.specialization}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={styles.cardDescription}
                    >
                      {doctor.description.slice(0, 100)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FeaturedDoctor;
