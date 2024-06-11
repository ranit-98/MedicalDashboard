// import React from "react";
// import { useDispatch } from "react-redux";
// import { fetchServicesData } from "../API/Functions/AllServices.API";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Container,
//   Grid,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Box,
// } from "@mui/material";
// import Loading from "../Layout/Loading";
// import BreadCrumbs from "../Layout/BreadCrumbs";

// const Services = ({ withLayout = true }) => {
//   const dispatch = useDispatch();

//   const fetchService = async () => {
//     const response = await dispatch(fetchServicesData());
//     return response.payload.data;
//   };

//   const { data: services, isLoading } = useQuery({
//     queryKey: ["service"],
//     queryFn: fetchService,
//   });

//   const serviceContent = (
//     <section className="pricing-table section">
//       <Container>
//         <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Typography
//           variant="h2"
//           component="h2"
//           gutterBottom
//           style={{
//             fontWeight: "bold",
//             fontSize: "2.5rem" /* Adjust the font size as needed */,
//             color: "#00796b" /* Teal color */,
//             textAlign: "center",
//             textTransform: "uppercase" /* Convert text to uppercase */,
//           }}
//         >
//            We Provide You The Best Treatment In Reasonable Price
//         </Typography>

//           <img src="img/section-img.png" alt="#" />
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
//             aliquet. pretiumts
//           </Typography>
//         </Box>
//         <Grid container spacing={4}>
//           {services?.map((service) => (
//             <Grid item xs={12} md={4} key={service.id}>
//               <Card sx={{ height: "100%" }}>
//                 <CardMedia
//                   component="img"
//                   image={`https://doctor-service.onrender.com/${service.image}`}
//                   alt={service.departmentName}
//                   sx={{ objectFit: "fill", height: "15rem" }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="h4" gutterBottom>
//                     {service.departmentName}
//                   </Typography>
//                   <Typography variant="body2">
//                     {service.description.slice(0, 100)}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </section>
//   );

//   if (withLayout) {
//     return isLoading ? <Loading /> : <><BreadCrumbs data="Service" />{serviceContent}</>;
//   } else {
//     return <>{serviceContent}</>;
//   }
// };

// export default Services;

import React from "react";
import { useDispatch } from "react-redux";
import { fetchServicesData } from "../API/Functions/AllServices.API";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import Loading from "../Layout/Loading";
import BreadCrumbs from "../Layout/BreadCrumbs";
import { Link } from "react-router-dom";

const Services = ({ withLayout = true }) => {
  const dispatch = useDispatch();

  const fetchService = async () => {
    const response = await dispatch(fetchServicesData());
    return response.payload.data;
  };

  const { data: services, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: fetchService,
  });

  const serviceContent = (
    <section className="pricing-table section">
      <Container>
        <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem" /* Adjust the font size as needed */,
            color: "#00796b" /* Teal color */,
            textAlign: "center",
            textTransform: "uppercase" /* Convert text to uppercase */,
          }}
        >
          We Provide You The Best Treatment In Reasonable Price
        </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
            aliquet. pretiumts
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {services?.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Link to={`/select-doctor/${service?._id}`} >
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={`https://doctor-service.onrender.com/${service.image}`}
                  alt={service.departmentName}
                  sx={{ objectFit: "fill", height: "15rem" }}
                />
                <CardContent>
                  <Typography variant="h6" component="h4" gutterBottom>
                    {service.departmentName}
                  </Typography>
                  <Typography variant="body2">
                    {service.description.slice(0, 100)}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );

  if (withLayout) {
    return isLoading ? (
      <Loading />
    ) : (
      <>
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
        src="/video/servicevid.mp4"
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Text overlay */}
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
        <h2>Services</h2>
        <ul className="bread-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ display: "inline" ,fontSize:'20px'}}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </li>
          <li style={{ display: "inline", margin: "0 5px",fontSize:'20px' }}>
            <i className="icofont-simple-right" style={{ color: "#00796b" }}></i>
          </li>
          <li className="active" style={{ display: "inline", color: "#00796b",fontSize:'20px' }}>
            Services
          </li>
        </ul>
      </div>
    </div>
        {serviceContent}
      </>
    );
  } else {
    return <>{serviceContent}</>;
  }
};

export default Services;
