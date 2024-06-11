


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleBlogData } from "../../API/Functions/SingleBlog.API";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SideBar from "../../Component/SideBar";
import Layout from "../../Layout/Layout";
import BreadCrumbs from "../../Layout/BreadCrumbs";
import { fetchCommentData, postBlogComment, postComment } from "../../API/Functions/Comments.API";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageIcon from '@mui/icons-material/Message';
import PostComment from "../../Component/PostComment";
import Loading from '../../Layout/Loading'
const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const initialCommentLimit=0
  const loadPerClick=10
  const [commentLimit,setCommentLimit]=useState(initialCommentLimit)

  
  const fetchBlogDetails = async () => {
    const response = await dispatch(fetchSingleBlogData(id));
    return response.payload.data;
  };

  const fetchComments = async () => {
    const response = await dispatch(fetchCommentData(id));
    return response.payload.data;
  };

  const { data: singleBlogData, isLoading: blogLoading } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: fetchBlogDetails,
  });

  const { data: commentData, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: fetchComments,
  });

  const mutation = useMutation({
    mutationFn: async(comment)=>{
      const newComment = {
        blog_Id:id,
        user_id: localStorage.getItem('userId'),
        ...comment
        //comment: comment.comment
      };
      
     await dispatch(postBlogComment(newComment))
      return newComment
 
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', id], (old) => [...old, data]);
    },
  });
  
  const handlePostComment = (comment) => {
    mutation.mutate( comment );
  };
  
  const handleLoadMore=()=>{
    setCommentLimit((prev)=>prev+loadPerClick)
}

  if (blogLoading || commentsLoading) return <><Layout><Loading/></Layout></>;

  return (
    <Layout>
      <BreadCrumbs data="Blog Details" />
      <section className="news-single section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="single-main">
                    <div className="news-head">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}${singleBlogData?.image}`}
                        alt="#"
                      />
                    </div>
                    <h1 className="news-title">{singleBlogData?.title}</h1>
                    <div className="meta">
                      <div className="meta-left">
                        <span className="author">
                          <a href="#">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}${singleBlogData?.image}`}
                              alt="#"
                            />
                            Naimur Rahman
                          </a>
                        </span>
                        <span className="date">
                          <i className="fa fa-clock-o"></i>
                          {singleBlogData?.createdAt?.slice(0, 10)}
                        </span>
                      </div>
                      <div className="meta-right">
                        <span className="comments">
                          <a href="#">
                            <i className="fa fa-comments"></i>
                            {commentData?.length}
                          </a>
                        </span>
                        <span className="views">
                          <i className="fa fa-eye"></i>33K Views
                        </span>
                      </div>
                    </div>
                    <div className="news-text">{singleBlogData?.description}</div>
                    <div className="blog-bottom">
                      <ul className="social-share">
                        <li className="facebook">
                          <a href="#">
                            <i className="fa fa-facebook"></i>
                            <span>Facebook</span>
                          </a>
                        </li>
                        <li className="twitter">
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li className="google-plus">
                          <a href="#">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                        <li className="linkedin">
                          <a href="#">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li className="pinterest">
                          <a href="#">
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="blog-comments">
                    {commentLimit>0 && <h2>{commentData?.length} Comments</h2>}
                    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
                      {commentData?.slice().reverse().slice(initialCommentLimit,commentLimit)?.map((data) => (
                        <Paper
                          key={data.id}
                          elevation={3}
                          sx={{ p: 1, mb: 3, borderRadius: 2 }}
                          data-aos="zoom-in-up"
                        > 
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          
                          >
                            <Avatar
                              src={`${process.env.REACT_APP_BASE_URL}${data?.user_id.image}`}
                              alt={data?.user_id?.name}
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                              >
                                {data?.user_id?.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  color: "text.secondary",
                                }}
                              >
                                <CalendarTodayIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {data?.createdAt?.slice(0, 10)}
                                </Typography>
                                <AccessTimeIcon
                                  fontSize="small"
                                  sx={{ ml: 2 }}
                                />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {data?.createdAt?.slice(11, 16)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Divider sx={{ mb: 2 }} />
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {data?.comment}
                          </Typography>
                         
                        </Paper>
                      ))}
                      {commentLimit<=commentData?.length && <Button variant="contained" onClick={handleLoadMore} style={{marginLeft: "1rem"}}>{commentLimit===0?<><MessageIcon/> View Comments({commentData?.length})</>:"Load More"}</Button>}
                     </Box>
                  </div>
                </div>
                <PostComment  handlePostComment={handlePostComment} />
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <SideBar />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
