import React from 'react';
import '../styles/banner.css';
import img from '../assets/images/justbanner.png';
import { Button } from '@/components/ui/button';
import { BackgroundBeams } from '@/components/ui/background-beams';
// import LoginForm from '@/screens/LoginForm';
import AboutUs from '@/components/homepage/about/AboutUs';
import LocationMap from '@/components/homepage/homepageMap';
import BusinessInfo from '@/components/homepage/about/BusinessInfo';
import CarouselTestimonials from '@/components/homepage/about/testimonials/Review';

function Home() {
  return (
    <>
      <div className="banner-container">
        <img src={img} alt="Banner" className="banner-image" />
        <div className="bannerRes bannerRes2 bannerRes3 bannerRes4 banner-text left">
          <h1 className='sm:text-base text-lg md:text-3xl lg:text-4xl uppercase text-center md:tracking-wider font-bold md:leading-relaxed'>Conquer <br />every road </h1>
          <p className='text-sm md:text-lg text-center tracking-widest leading-4'>with the power<br /> that drives you beyond <br />your limits</p>
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-700 transition-colors mt-2 md:mt-4">
            Check your next car
          </Button>
        </div>
        {/* <div className="banner-text right ">
      <h1 className='uppercase text-center tracking-wider font-bold'>Conquer <br />every road </h1>
        <h2></h2>
        <p className='text-center tracking-widest leading-4'>with the power<br /> that drives you beyond <br />your limits</p>
      </div> */}
      <BackgroundBeams className="bg-black absolute inset-0 z-[-1]" />
      <AboutUs />
      </div>
      <BusinessInfo />
      <CarouselTestimonials />
      <LocationMap />
    </>
  )
}

export default Home;