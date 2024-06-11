import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"

export const fetchFeaturedDoctorData=createAsyncThunk('featuredDoctorData/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.featuredDoctor)
    return response.data
})