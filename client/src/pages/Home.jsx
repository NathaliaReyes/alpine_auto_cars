import React from 'react';
import '../styles/banner.css';
import img from '../assets/images/justbanner.png';
import { Button } from '@/components/ui/button';
import { BackgroundBeams } from '@/components/ui/background-beams';
// import LoginForm from '@/screens/LoginForm';
import AboutUs from '@/components/homepage/about/AboutUs';
import Slogan from '@/components/slogan/Slogan';
import LocationMap from '@/components/homepage/homepageMap';
import BusinessInfo from '@/components/homepage/about/BusinessInfo';
import CarouselTestimonials from '@/components/homepage/about/testimonials/Review';
// import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const reviewLink = 'https://www.google.com/search?q=alpine+auto+sales+bayfield+co+owner&sca_esv=584386099&rlz=1C5CHFA_enUS939US939&sxsrf=AM9HkKkmP-xu8fhTBWHs3DzZ1bZZImAGtw%3A1700606556120&ei=XDJdZY3mBrClqtsPifCUOA&ved=0ahUKEwiNhLiNldaCAxWwkmoFHQk4BQcQ4dUDCBE&uact=5&oq=alpine+auto+sales+bayfield+co+owner&gs_lp=Egxnd3Mtd2l6LXNlcnAiI2FscGluZSBhdXRvIHNhbGVzIGJheWZpZWxkIGNvIG93bmVyMgUQIRigATIFECEYoAEyBRAhGKABSK0jUKwCWNQhcAJ4AJABAJgBcqAB_gWqAQM1LjO4AQPIAQD4AQHCAg4QLhiABBjHARivARiwA8ICBhAAGBYYHsICBRAhGKsCwgIHECEYoAEYCuIDBBgBIEGIBgGQBgE&sclient=gws-wiz-serp#ip=1&lrd=0x873c21adba3328e5:0xa17770b3fcd18eb9,1,,,,';


function Home() {
  return (
    <>
      <div className="banner-container">
        <img src={img} alt="Banner" className="banner-image" />
        <div className="hidden md:block bannerRes bannerRes2 bannerRes3 bannerRes4 banner-text left">
          <h1 className='sm:text-base text-lg md:text-3xl lg:text-4xl uppercase text-center md:tracking-wider font-bold md:leading-relaxed roboto600' >Conquer <br />every road </h1>
          <p className='text-sm md:text-lg text-center tracking-widest leading-4' style={{ fontFamily: 'Abel' }}>with the power<br /> that drives you beyond <br />your limits</p>
          <Button className="w-full bg-red-600 text-white hover:bg-red-900 transition-colors mt-2 md:mt-4" style={{ fontFamily: 'Abel' }}>
            <Link to='/Inventory'>Browse for your next car</Link>
          </Button>
          <Button className="w-full bg-red-600 text-white hover:bg-red-900 transition-colors mt-2 md:mt-4" style={{ fontFamily: 'Abel' }}>
            <Link to='/Contact'>Looking to sell a vehicle? Let us help!</Link>
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
      <Slogan />
      <CarouselTestimonials />
      <div className="flex justify-center text-lg md:text-xl font-semibold" style={{ fontFamily: 'Abel' }}>
        <a href={reviewLink} target="_blank" rel="noopener noreferrer" className='w-11/12 md:w-1/3 bg-red-500 text-white hover:bg-red-700 transition-colors p-4 rounded-lg mt-2 md:mt-4 mb-4 md:mb-0 text-center'>Worked with us before? Let us know how we did!</a>
      </div>
      <BusinessInfo />
      <LocationMap />
    </>
  )
}

export default Home;