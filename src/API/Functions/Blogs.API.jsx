import { createAsyncThunk } from "@reduxjs/toolkit"
import { endpoints } from "../EndPoint/EndPoint"
import axiosInstance from "../AxiosInstance"

export const fetchBlogsData=createAsyncThunk('allBlogs/fetch',async()=>{
    const response=await axiosInstance.get(endpoints.cms.blogs)
    return response.data
})



// export const fetchBlogsData = createAsyncThunk(
//     'allBlogs/fetch',
//     async ({ page = 1, limit = 2 }) => {
//       const response = await axiosInstance.get(endpoints.cms.blogs, {
//         params: { page, limit },
//       });
//       return response.data;
//     }
//   );