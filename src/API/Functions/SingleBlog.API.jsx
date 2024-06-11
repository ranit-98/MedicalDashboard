import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"

export const fetchSingleBlogData=createAsyncThunk('singleBlog/fetch',async(id)=>{
    const response=await axiosInstance.get(`${endpoints.cms.singleBlog}/${id}`)
    return response.data
})