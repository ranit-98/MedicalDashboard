import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance";
import { endpoints } from "../EndPoint/EndPoint";

export const fetchDashboard=createAsyncThunk('dashboard/fetch',async(id)=>{
    const response=await axiosInstance.get(`${endpoints.cms.userdashboard}/${id}`)
    return response.data
})