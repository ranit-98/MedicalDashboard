import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
  return (
    <>
           <div class="container-fluid bg-primary mb-5  hero-header" style={{ backgroundImage: "url('/video/HeroSection.jpg')",  backgroundSize: "cover" }}>
                    <div class="container py-5">
                        <div class="row justify-content-start">
                            <div class="col-lg-8 text-center text-lg-start">
                                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style={{ borderColor: 'rgba(256, 256, 256, .3) !important' }}>Welcome To Lifeline</h5>
                                {/* <h1 class="display-1 text-white mb-md-4">Best Healthcare Solution In Your City</h1> */}
                                <h1 class="display-3  mb-md-4" >We Provide <span>Medical</span> Services That You Can <span>Trust!</span></h1>
                                <div className="button ">
                                    <Link to="/select-service" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2" style={{color:'white'}}>Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default Herosection
