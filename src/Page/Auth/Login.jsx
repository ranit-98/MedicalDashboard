


import React, { useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, createTheme, ThemeProvider, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../Layout/Layout';
import Loading from '../../Layout/Loading';
import { loginRequest, redirectToo, RegLog } from '../../Redux/Slice/AuthSlice';

const defaultTheme = createTheme();

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authState = useSelector((state) => state?.auth) || {};
  const { redirectTo, loading } = authState;
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await dispatch(loginRequest(loginData))
      navigate('/')
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success('Login successful');
   
      
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password
    };
    loginMutation.mutate(loginData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate(redirectTo);
    }
  }, [redirectTo, navigate]);

  const reg = () => {
    dispatch(RegLog());
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url('/video/Login.jpg')`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? 'Email is required' : ''}
                  {...register("email", { required: true })}
                  InputProps={{
                    style: {
                      height: '50px', // Set your desired height here
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? 'Password is required' : ''}
                  {...register("password", { required: true })}
                  InputProps={{
                    style: {
                      height: '50px', // Set your desired height here
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ?   <CircularProgress color="inherit"  sx={{ mt: 0.2, mb: 0.2 }} /> : "Sign In"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register' variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
};

export default LogIn;
