import React from 'react'
import { fetchDoctorDetailsData } from '../../../API/Functions/Doctor.APi';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import { Grid, Paper, Typography, Avatar, CardMedia } from '@mui/material';
import Loading from '../../../Layout/Loading';
const SingleDoctor = () => {
    const {id}=useParams()
    const dispatch = useDispatch();

    const fetchSingleDoctor = async () => {
      const response = await dispatch(fetchDoctorDetailsData(id));
      return response?.payload.data;
    };
  
    const { data: doctor, isLoading } = useQuery({
      queryKey: ["singledoctors"],
      queryFn: fetchSingleDoctor,
    });
    console.log(doctor);
  return (
    <>
    <Layout>
      {isLoading && <Loading/>}
     {!isLoading && <Grid container spacing={3} style={{marginTop:'4rem'}}>
      {/* Grid for Image and Name */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            <CardMedia
                      component="img"
                      image={`https://doctor-service.onrender.com/${doctor?.image}`}
                      alt={doctor?.name}
                      sx={{ objectFit: 'fill', height: '15rem' }}
                    />
            </Grid>
            <Grid item>
              <Typography variant="h6">{doctor?.name}</Typography>
              <div className="button">
                      <Link to={`/appointment/${doctor?._id}`} className="btn"><Typography style={{color:'white'}}>Get Appointment</Typography></Link>
                    </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Grid for Details */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Doctor Details</Typography>
          <Typography variant="body1">{doctor?.description}</Typography>
          <Typography variant="body2">
            Department: {doctor?.department_id.departmentName}
          </Typography>
          <Typography variant="body2">
            Aperture Time: {doctor?.aperture_time}
          </Typography>
          <Typography variant="body2">
            Departure Time: {doctor?.departure_time}
          </Typography>
        </Paper>
      </Grid>
    </Grid> }
    </Layout>
    </>
  )
}

export default SingleDoctor
