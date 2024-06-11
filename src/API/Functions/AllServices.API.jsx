import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"


export const fetchServicesData=createAsyncThunk('allService/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.service)
    return response.data
})