


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../API/AxiosInstance'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { endpoints } from '../../API/EndPoint/EndPoint';


// Initial state of the authentication slice
const initialState = {
  loading: false,      // to indicate if a request is in progress
  user: {},            // to store user details
  redirectTo: null,    // to handle redirection after login/registration
  Logouttoggle: false, // to track login/logout state
  userName: false,     // to store the user's name
  redirectReg: null    // to handle redirection after registration
}

// Thunk to handle user registration
export const registerUser = createAsyncThunk("/signup", async (user) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.register, user);
    toast.success(response?.data.message)
    console.log(response);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
});

// Thunk to handle user login
export const loginRequest = createAsyncThunk("login", async (user) => {

  try {
    const response = await axiosInstance.post(endpoints.auth.login, user);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
});

// Slice for authentication
export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Check if token exists in local storage
    check_token: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.Logouttoggle = true;
        state.userName = localStorage.getItem("name") || false;
      }
    },
    // Logout the user
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success("Logout successfully");
      state.Logouttoggle = false;
      state.userName = false;
      state.user = {}; // Clear user data
    },
    // Handle user registration and login status reset
    RegLog: (state) => {
      localStorage.removeItem("name");
      state.Logouttoggle = false;
      state.userName = false;
      state.user = {}; // Clear user data
    },
    // Handle redirection after login
    redirectToo: (state, action) => {
      state.redirectTo = action.payload;
    },
    // Handle redirection after registration
    redirectTo_Register: (state, action) => {
      state.redirectReg = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        if (payload.success) {
          localStorage.setItem("name", payload?.data.name);
          state.redirectReg = "/";
          state.user = payload.data;
         
          toast.success(`Hi ${payload?.data?.name}, registration successful!`);
        }
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          localStorage.setItem("token", payload?.token);
          localStorage.setItem("name", payload?.data?.name);
          localStorage.setItem("userId", payload?.data?._id);
          localStorage.setItem("image", payload?.data?.image);
          localStorage.setItem("email", payload?.data?.email);
          localStorage.setItem("phone", payload?.data?.phone);
          state.loading=false
          state.Logouttoggle = true; 
          state.redirectTo = "/services";
          state.user = payload.data;
          state.userName = payload?.data.name || false;
          toast.success(`Hi ${payload?.data.name}, ${payload?.message}`);
        } else {
          state.loading = false;
        }
      })
      .addCase(loginRequest.rejected, (state) => {
        state.loading = false;
      });
  }
});

// Exporting the actions to be used in components
export const {
  check_token,
  logout,
  RegLog,
  redirectToo,
  redirectTo_Register
} = AuthSlice.actions;

// Exporting the reducer to be used in the store
export default AuthSlice