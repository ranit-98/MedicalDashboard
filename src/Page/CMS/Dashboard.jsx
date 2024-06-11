import React from "react";
import { useDispatch } from "react-redux";
import { fetchDashboard } from "../../API/Functions/Dashboard.API";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Container,
  Grid,
  IconButton,
  CardContent,
  Divider,
  Card,
  Box,
} from "@mui/material";
import { Edit as EditIcon } from '@mui/icons-material';
import BarbellIcon from '@mui/icons-material/FitnessCenter'
import Loading from "../../Layout/Loading";
const Dashboard = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  const userName=localStorage.getItem('name')
  const email=localStorage.getItem('email')
  const phone=localStorage.getItem('phone')
  const fetchDashboardData = async (id) => {
    const response = await dispatch(fetchDashboard(id));
    return response.payload.data;
  };
  const { data: userdashboard, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardData(id),
  });
  console.log(userdashboard);
  return (
    <>
      <Layout>
        {isLoading && <Loading/>}
       {!isLoading &&
       <>
         <Container maxWidth="xl" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <Grid item lg={6} md={8} sm={10} xs={12}>
          <Card style={{ borderRadius: '1rem', display: 'flex' }}>
            <Grid container>
              <Grid item md={5} xs={12} style={{ backgroundColor: 'rgb(34, 58, 102)', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', textAlign: 'center', color: 'white' }}>
                <Box py={4}>
                  <Avatar
                    alt={userName}
                    src="https://doctor-service.onrender.com/UploadUser/1717339700112.jpg"
                    style={{ width: 120, height: 120, margin: '0 auto', borderRadius: '50%' }}
                  />
                  <Typography variant="h4" component="div" className="text-white" style={{ marginTop: 16 }}>{userName}</Typography>
                  <Typography className="text-white">Email - {email}</Typography>
                  <Typography className="text-white">Contact No - {phone}</Typography>
                  
                </Box>
              </Grid>
              <Grid item md={7} xs={12} style={{ backgroundColor: 'white' }}>
                <CardContent>
                  <Typography variant="h6" className="text-black" >Information</Typography>
                  <Divider style={{ margin: '16px 0' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" className="text-black">Email</Typography>
                      <Typography>{email}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" className="text-black">Phone</Typography>
                      <Typography className="text-black">{phone}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
       <Container>
          <Typography
            variant="h4"
            style={{ display: "flex", justifyContent: "center",color:'white' }} className="btn"
          >
            Your Appointment
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="appointment table">
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell> Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userdashboard?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      <Avatar
                        src={`${process.env.REACT_APP_BASE_URL}${item.doctor_id.image}`}
                        sx={{ mr: 2 }}
                      />
                      {item.doctor_id.name}
                    </TableCell>
                    <TableCell>{item.department_id.departmentName}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {item?.doctor_id.aperture_time}-{ item?.doctor_id.departure_time}
                    </TableCell>
                    <TableCell>
                      {item?.isPending==true? <>pending</>: <>confirm</>} 
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        </>
        }
      </Layout>
    </>
  );
};

export default Dashboard;
