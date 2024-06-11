import { createAsyncThunk } from "@reduxjs/toolkit"
import { endpoints } from "../EndPoint/EndPoint"
import axiosInstance from "../AxiosInstance"

export const createContact=createAsyncThunk('contact/fetch',async(data)=>{
    const response=await axiosInstance.post(endpoints.cms.contact,data)
    return response.data
})