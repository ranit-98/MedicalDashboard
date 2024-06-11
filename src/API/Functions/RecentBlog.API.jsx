import { createAsyncThunk } from "@reduxjs/toolkit"
import { endpoints } from "../EndPoint/EndPoint"
import axiosInstance from "../AxiosInstance"

export const fetchRecentBlogsData=createAsyncThunk('recentBlogs/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.recentBlog)
    return response.data
})