import React from 'react'
import Slider from '../../Component/Slider'
import AllDoctors from '../../Component/AllDoctors'
import Services from '../../Component/Services'
import { useDispatch } from 'react-redux'
import { fetchDoctorData } from '../../API/Functions/Doctor.APi'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Layout/Loading'
import Layout from '../../Layout/Layout'
import FeaturedDoctor from '../../Component/FeaturedDoctor'
import Herosection from '../../Component/Herosection'
const Home = () => {
  const dispatch = useDispatch();
  
  const fetchDoctors = async () => {
    const response = await dispatch(fetchDoctorData());
    return response.payload.data;
  };

  const { data,isLoading } = useQuery({
    queryKey: ["allDocs"],
    queryFn: fetchDoctors,
  });
  return (
    <>
    {
      isLoading && <Loading/>
    }
    {!isLoading &&
    <Layout>
    {/* <Slider/> */}
    <Herosection/>
    <FeaturedDoctor/>
    <Services withLayout={false}/>
    </Layout>
    }
    </>
  )
}

export default Home
