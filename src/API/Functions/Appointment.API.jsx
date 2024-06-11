import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"
import { toast } from "react-toastify"

export const createApointment=createAsyncThunk('appointment/create',async(data)=>{
   try{ const response=await axiosInstance.post(endpoints.cms.createappointment,data)
    toast.success(response?.data.message)
    return response.data
}catch(error){
    console.log(error);
    toast.error( error.response.data.message)
}
})