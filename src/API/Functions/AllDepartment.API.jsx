import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"

export const fetchDepartmentData=createAsyncThunk('allDepeartment/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.department)
    return response.data
})

export const fetchDepartmentWiseDoctorData=createAsyncThunk('departmentWiseDoc/fetch',async(id)=>{
    const response=await axiosInstance.get(`${endpoints.cms.departmentWiseDoctor}/${id}`)
    return response.data
})