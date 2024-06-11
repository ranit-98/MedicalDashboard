import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"


export const fetchDoctorData=createAsyncThunk('doctorData/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.allDoctor)
    return response.data
})

export const fetchDoctorDetailsData=createAsyncThunk('doctorDetails/fetch',async(id)=>{
    const response=await axiosInstance.get(`${endpoints.cms.doctorDetails}/${id}`)
    return response.data
})