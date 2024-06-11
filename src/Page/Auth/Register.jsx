import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser, RegLog } from "../../Redux/Slice/AuthSlice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const redirectReg = useSelector((state) => state.auth?.redirectReg);

  useEffect(() => {
    if (redirectReg) navigate(redirectReg);
  }, [redirectReg, navigate]);

  const { mutate: registerUserMutation } = useMutation({
    mutationFn: async (formData) => {
      const response = await dispatch(registerUser(formData));
      return response.payload;
    },
    onSuccess: () => {
      dispatch(RegLog());
      reset();
    },
    onError: () => {
      toast.error('Registration failed. Please try again.');
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    formData.append('forget', data.forget);
    if (img) formData.append('image', img);

    registerUserMutation(formData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {['name', 'email', 'phone', 'password', 'forget'].map((field, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                    multiline
                      required
                      fullWidth
                      id={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      type={field === 'password' ? 'password' : 'text'}
                      {...register(field, { required: true })}
                    />
                    {errors[field] && <p>{field.charAt(0).toUpperCase() + field.slice(1)} is required</p>}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <TextField fullWidth type="file" accept="image/*" onChange={handleImageChange} id="image" />
                </Grid>
                {img && (
                  <Grid item xs={12}>
                    <img src={URL.createObjectURL(img)} alt="Selected" style={{ maxWidth: "100%" }} />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default Register;
