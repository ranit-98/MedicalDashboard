
import React from 'react';
import { useDispatch } from 'react-redux';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  CssBaseline,
} from '@mui/material';
import Layout from '../../Layout/Layout';
import { fetchDepartmentData, fetchDepartmentWiseDoctorData } from '../../API/Functions/AllDepartment.API';
import Loading from '../../Layout/Loading';
import BreadCrumbs from '../../Layout/BreadCrumbs';
import styles from './About.module.css';

const About = () => {
  const dispatch = useDispatch();

  const fetchDepartment = async () => {
    const response = await dispatch(fetchDepartmentData());
    return response.payload.data;
  };

  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartment,
  });

  const doctorQueries = useQueries({
    queries: (departments || []).map(department => ({
      queryKey: ['doctors', department._id],
      queryFn: async () => {
        const response = await dispatch(fetchDepartmentWiseDoctorData(department._id));
        return { departmentName: department.departmentName, doctors: response.payload.data };
      },
      enabled: !!departments,
    })),
  });

  const isLoadingDoctors = doctorQueries.some(query => query.isLoading);

  if (isLoadingDepartments || isLoadingDoctors) {
    return (
      <Layout>
        <Container>
          <Loading />
        </Container>
      </Layout>
    );
  }

  const departmentDoctors = doctorQueries.map(query => query.data).filter(Boolean);

  return (
    <Layout>
      <CssBaseline />
      <BreadCrumbs data="About Us" />
      <Container className={styles.container}>
        {departmentDoctors.map(dept => (
          <Box key={dept.departmentName} sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              className={styles.sectionTitle}
            >
              {dept.departmentName}
            </Typography>
            <Grid container spacing={4}>
              {dept.doctors.map(doctor => (
                <Grid item xs={12} md={4} key={doctor.id}>
                  <Card className={styles.card} style={{ maxWidth: "300px" }}>
                    <Box className={styles.cardCurvedBg} />
                    <CardMedia
                      component="img"
                      image={`https://doctor-service.onrender.com/${doctor.image}`}
                      alt={doctor.name}
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
                      <Typography variant="body2" className={styles.cardSpecialization}>
                        {doctor.specialization}
                      </Typography>
                      <Typography variant="body2" className={styles.cardDescription}>
                        {doctor.description.slice(0, 100)}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export default About;
