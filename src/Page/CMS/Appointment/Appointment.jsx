
import React from 'react';
import { Container, Grid, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Layout from '../../../Layout/Layout';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDoctorDetailsData } from '../../../API/Functions/Doctor.APi';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {createApointment} from '../../../API/Functions/Appointment.API'
import { toast } from 'react-toastify';
import Loading from '../../../Layout/Loading';
const AppointmentSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const userName = localStorage.getItem('name');
  const userId=localStorage.getItem('userId')

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["singledoctors"],
    queryFn: fetchDoctorDetailsData(id),
  });

  const { register, handleSubmit, formState: { errors },reset } = useForm();

  const onSubmit = (data) => {
    const appointmentData = {
      ...data,
      user_id:userId,
      department_id:doctor?.department_id._id,
      doctor_id:id
    };
    const res=dispatch(createApointment(appointmentData))
    console.log(res);
    toast.success(res.message)
    console.log(JSON.stringify(appointmentData));
     navigate("/dashboard")
   
  };
console.log(doctor);
  return (
    <Layout>
      {isLoading && <Loading/>}
     {!isLoading && 
     <section className="appointment section"  style={{ backgroundImage: `url('/video/appointment.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Container>
          <Grid container spacing={3}>
            {/* Emergency Call Section */}
            <Grid item xs={12} md={4}>
              <div className="mt-3">
                <div className="feature-icon mb-3">
                  <i className="icofont-support text-lg" ></i>
                </div>
                <Typography variant="h5">Call for an Emergency Service!</Typography>
                <Typography variant="h4" className="text-color mt-3">+70 016 00 532 </Typography>
              </div>
            </Grid>

            {/* Appointment Form Section */}
            <Grid item xs={12} md={8}>
              <div className="appointment-wrap mt-5 mt-lg-0 pl-lg-5">
                <Typography variant="h2" className="mb-2 title-color">Book an appointment</Typography>
                <Typography variant="body1" className="mb-4">
                  Mollitia dicta commodi est recusandae iste, natus eum asperiores corrupti qui velit . Iste dolorum atque similique praesentium soluta.
                </Typography>
                <form id="#" className="appointment-form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="personal-care-label" InputProps={{
                            style: {
                              padding: '10px', 
                              color:'black',
                              backgroundColor:'white'
                            },
                            disableUnderline: true,
                          }} >{doctor?.department_id?.departmentName}</InputLabel>
                        <Select
                          labelId="personal-care-label"
                          id="personal-care"
                          defaultValue={doctor?.department_id?.departmentName}
                          
                        >
                          <MenuItem value={doctor?.department_id?.departmentName}>{doctor?.department_id?.departmentName}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        label="Department"
                        defaultValue={doctor?.department_id?.departmentName}
                        InputProps={{
                          style: {
                            padding: '10px', 
                            color:'black',
                            backgroundColor:'white'
                          },
                          disableUnderline: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        label="Doctor"
                        defaultValue={doctor?.name}
                        InputProps={{
                          style: {
                            padding: '10px', 
                            color:'black',
                            backgroundColor:'white'
                          },
                          disableUnderline: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        label="Date"
                        defaultValue={doctor?.date.slice(0, 10)}
                        InputProps={{
                          style: {
                            height: '50px', 
                            backgroundColor:'white'// Set your desired height here
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        label="Appointment Time"
                        defaultValue={`${doctor?.aperture_time} - ${doctor?.departure_time}`}
                        InputProps={{
                          style: {
                            height: '50px', 
                            backgroundColor:'white'// Set your desired height here
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        label="Full Name"
                        defaultValue={userName}
                        InputProps={{
                          style: {
                            height: '50px',
                            backgroundColor:'white' // Set your desired height here
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        multiline
                        type="number"
                        label="Phone Number"
                        id="phone"
                        required
                        {...register("phone", { required: true })}
                        InputProps={{
                          style: {
                            height: '50px',
                            backgroundColor:'white' // Set your desired height here
                          },
                        }}
                      />
                      {errors.phoneNumber && <span>This field is required</span>}
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Your Message"
                    required
                    InputProps={{
                      style: {
                        marginTop: '2rem',
                        backgroundColor:'white'
                      },
                    }}
                    {...register("message", { required: true })}
                  />
                  <Button variant="contained" color="primary" fullWidth type="submit" style={{marginTop:'2rem'}}>
                    Make Appointment
                    <i className="icofont-simple-right ml-2"></i>
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>}
    </Layout>
  );
};

export default AppointmentSection;
