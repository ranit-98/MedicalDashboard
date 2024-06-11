import logo from "./logo.svg";
import Header from "./Layout/Header";
import Home from "./Page/CMS/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Services from "./Page/CMS/Service";
import About from "./Page/CMS/About";
import Blogs from "./Page/CMS/Blogs";
import BlogDetails from "./Page/CMS/BlogDetails";
import Login from "./Page/Auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Page/Auth/Register";
import Contact from "./Page/CMS/Contact";
import SelectService from "./Page/CMS/Appointment/SelectService";
import SelectDoctor from "./Page/CMS/Appointment/SelectDoctor";
import SingleDoctor from "./Page/CMS/Appointment/SingleDoctor";
import Appointment from "./Page/CMS/Appointment/Appointment";
import Dashboard from "./Page/CMS/Dashboard";
import AllDoctors from "./Component/AllDoctors";
import Doctor from "./Page/CMS/Doctor";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { check_token } from "./Redux/Slice/AuthSlice";
import Aos from "aos";
import "aos/dist/aos.css";
const queryClient = new QueryClient();

Aos.init();

function App() {
  const dispatch = useDispatch();
  const ProtectedRoute = ({ children }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/login" />
         {/* {toast.error("Kindly log in to access this")} */}
      </>
    );
  };
  const private_route = [
    {
      path: "/select-service",
      component: <SelectService />,
    },
    {
      path: "/select-doctor/:id",
      component: <SelectDoctor />,
    },
    {
      path: "/doctor-details/:id",
      component: <SingleDoctor />,
    },
    {
      path: "/appointment/:id",
      component: <Appointment />,
    },
    {
      path: "/dashboard",
      component: <Dashboard />,
    },
  ];
  const public_route = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/about",
      component: <About />,
    },
    {
      path: "/services",
      component: <Services />,
    },
    {
      path: "/doctors",
      component: <Doctor />,
    },
    {
      path: "/blog",
      component: <Blogs />,
    },
    {
      path: "/blogDetail/:id",
      component: <BlogDetails />,
    },
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "/register",
      component: <Register />,
    },
    {
      path: "/contact",
      component: <Contact />,
    },
  ];

  useEffect(() => {
    dispatch(check_token());
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Router>
          <Routes>
            {public_route?.map((item, index) => (
              <Route key={index} path={item.path} element={item.component} />
            ))}
            ,
            {private_route?.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<ProtectedRoute>{item.component}</ProtectedRoute>}
              />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
