

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogsData } from "../API/Functions/Blogs.API";
import { fetchSearchBlogsData } from "../API/Functions/Searching.API";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchRecentBlogsData } from "../API/Functions/RecentBlog.API";

const SideBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRecentBlogs = async () => {
    const response = await dispatch(fetchRecentBlogsData());
    return response.payload.data;
  };
  
  const { data: blogsData, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["recentblogs"],
    queryFn: fetchRecentBlogs,
  });

  const fetchSearchBlogs = async (query) => {
    const response = await dispatch(fetchSearchBlogsData(query));
    return response.payload.data;
  };

  const { data: searchBlogsData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["searchblogs", searchQuery],
    queryFn: () => fetchSearchBlogs(searchQuery),
    enabled: !!searchQuery, // Only run query if searchQuery is not empty
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <>
      <div className="main-sidebar">
        <div className="single-widget search">
          <div className="form">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <a className="button" href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
          {searchBlogsData?.slice(0, 4).map((blog) => (
            <div className="single-post" key={blog._id}>
              <div className="image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${blog?.image}`}
                  alt="#"
                />
              </div>
              <div className="content">
                <h5>
                  <Link to={`/blogDetail/${blog?._id}`}>{blog?.title}</Link>
                </h5>
                <ul className="comment">
                  <li>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    {blog?.createdAt.split("T")[0]}
                  </li>
                  <li>
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>35
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="single-widget recent-post">
          <h3 className="title">Recent post</h3>
          {blogsData?.map((blog) => (
            <div className="single-post" key={blog._id}>
              <div className="image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${blog?.image}`}
                  alt="#"
                />
              </div>
              <div className="content">
                <h5>
                  <Link to={`/blogDetail/${blog?._id}`}>{blog?.title}</Link>
                </h5>
                <ul className="comment">
                  <li>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    {blog?.createdAt.split("T")[0]}
                  </li>
                  <li>
                    <i className="fa fa-commenting-o" aria-hidden="true"></i>35
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </>
  );
};

export default SideBar;
