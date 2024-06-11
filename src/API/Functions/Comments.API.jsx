import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../AxiosInstance"
import { endpoints } from "../EndPoint/EndPoint"

export const fetchCommentData=createAsyncThunk('comment/fetch',async(id)=>{
    const response=await axiosInstance.get(`${endpoints.cms.blogcomment}/${id}`)
    return response.data
})

export const postBlogComment=createAsyncThunk('comment/create',async(data)=>{
    try{const response=await axiosInstance.post(endpoints.cms.createblogcomment,data)
    return response.data
}catch(error){
    console.log(error);
    return error
}
})