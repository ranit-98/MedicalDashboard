import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"

export const fetchSearchBlogsData=createAsyncThunk('searchBlogs/fetch',async(query)=>{
    const response=await axiosInstance.get(`${endpoints.cms.searchBlog}/${query}`)
    return response.data
})