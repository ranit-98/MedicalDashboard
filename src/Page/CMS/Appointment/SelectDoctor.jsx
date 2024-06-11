import React from 'react'
import Layout from '../../../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchDepartmentWiseDoctorData } from '../../../API/Functions/AllDepartment.API'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Loading from '../../../Layout/Loading'

const SelectDoctor = () => {
    const {id}=useParams()
    const dispatch = useDispatch();

    const fetchDoctor = async () => {
      const response = await dispatch(fetchDepartmentWiseDoctorData(id));
      return response?.payload.data;
    };
  
    const { data: doctors, isLoading } = useQuery({
      queryKey: ["doctors"],
      queryFn: fetchDoctor,
    });
    console.log(doctors);
  return (
    <>
    <Layout>
      {isLoading && <Loading/>}
   { !isLoading &&
    <Container maxWidth="md" style={{marginTop:'2rem'}}>
    <Typography variant="h4" component="h2" gutterBottom style={{display:'flex',justifyContent:'center'}}>
            Select Doctor
          </Typography>
    <Grid container spacing={4} style={{marginTop:'3rem'}}>
        
              {doctors?.map(doctor => (
                <Grid item xs={12} md={4} key={doctor.id}>
                  <Card sx={{ height: '100%',width:'17rem' }}>
                    <CardMedia
                      component="img"
                      image={`https://doctor-service.onrender.com/${doctor.image}`}
                      alt={doctor.name}
                      sx={{ objectFit: 'fill', height: '15rem' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h4" gutterBottom>
                        {doctor.name}
                      </Typography>
                      <Typography variant="body2">
                        {doctor.specialization}
                      </Typography>
                      <Typography variant="body2">
                        {doctor.description.slice(0, 100)}
                      </Typography>
                      <div className="button pt-3 ">
                      <Link to={`/doctor-details/${doctor._id}`} className="btn"><Typography style={{color:'white'}}>Get Appointment</Typography></Link>
                    </div>
                    </CardContent>
                  
                  </Card>
                </Grid>
              ))}
            </Grid>
            </Container>}
    </Layout>
    </>
  )
}

export default SelectDoctor
