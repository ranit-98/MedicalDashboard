import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogsData } from "../../API/Functions/Blogs.API";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../Layout/Layout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Loading from "../../Layout/Loading";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { CardActions } from "@mui/material";
import BreadCrumbs from "../../Layout/BreadCrumbs";
import SideBar from "../../Component/SideBar";
import Pagination from "@mui/material/Pagination";

const Blogs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const fetchBlogs = async () => {
    const response = await dispatch(fetchBlogsData());
    return response.payload.data;
  };

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = blogsData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  console.log(blogsData);

  return (
    <>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* <BreadCrumbs data="Our Blogs" /> */}
            <div
              style={{
                position: "relative",
                marginBottom: "15px",
                width: "100%",
                height: "400px",
                marginTop: "0px",
              }}
            >
              <video
                src="/video/blog.mp4"
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div
                className="container"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#00796b",
                  textAlign: "center",
                  zIndex: 1,
                }}
              >
                <h2 style={{ color: "white" }}>Our Blogs</h2>
                <ul
                  className="bread-list"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  <li style={{ display: "inline", fontSize: "20px" }}>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "inline",
                      margin: "0 5px",
                      fontSize: "20px",
                    }}
                  >
                    <i
                      className="icofont-simple-right"
                      style={{ color: "white" }}
                    ></i>
                  </li>
                  <li
                    className="active"
                    style={{
                      display: "inline",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    Blogs
                  </li>
                </ul>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <div className="row">
                    <div className="col-12">
                      <Box sx={{ flexGrow: 1, margin: "1rem" }}>
                        <Grid container spacing={2}>
                          {paginatedData?.map((data) => (
                            <Grid item xs={12} md={12} xl={12} key={data._id}>
                              <Card
                                sx={{
                                  backgroundColor: "white",
                                  borderRadius: "12px",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                                data-aos="zoom-in"
                              >
                                <CardActionArea
                                  component={Link}
                                  to={`/blogDetail/${data._id}`}
                                >
                                  <CardMedia
                                    component="img"
                                    image={`${process.env.REACT_APP_BASE_URL}${data.image}`}
                                    alt={data.title}
                                    style={{ objectFit: "fill", height: "400" }}
                                  />
                                  <CardContent>
                                    <Typography
                                      variant="h3"
                                      component="h3"
                                      sx={{ mt: 1 }}
                                    >
                                      {data.title}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      color="textSecondary"
                                      gutterBottom
                                    >
                                      {data.description}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <Button
                                      component={Link}
                                      to={`/blogDetail/${data._id}`}
                                      size="small"
                                      variant="contained"
                                      endIcon={
                                        <ArrowForwardIosIcon
                                          style={{ color: "white" }}
                                        />
                                      }
                                    >
                                      <Typography style={{ color: "white" }}>
                                        Read More
                                      </Typography>
                                    </Button>
                                  </CardActions>
                                </CardActionArea>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                      <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                          count={Math.ceil(blogsData.length / itemsPerPage)}
                          page={page}
                          onChange={handlePageChange}
                          color="primary"
                        />
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <SideBar />
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Blogs;
