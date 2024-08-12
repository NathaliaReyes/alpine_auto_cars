import React, { useEffect } from "react";
import { FaHandshake, FaCar, FaShieldAlt, FaStar, FaThumbsUp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../styles/fonts.css';

export default function Slogan() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="mx-3 "
    style={{ fontFamily: 'Abel' }}
    >
      <div>
        <p 
          className="text-base md:text-lg text-black font-semibold text-center p-2"
          >
          Your Trusted Partner in Car Deals <span className="inline-block"><FaHandshake /></span>
        </p>
      </div>
      <div className="my-4 rounded border-customWhite border-2 p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {/* Buy */}
          <div 
            className="flex flex-col items-center"
            data-aos="zoom-in-up"
            >
            <FaCar className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3 " />
            <div className="flex items-center">
              <span className="text-black font-bold xl-text">Buy</span>
            </div>
            <p className="text-muted mt-1">Quality Guaranteed</p>
          </div>

          {/* Sell */}
          <div 
            className="flex flex-col items-center"
            data-aos="zoom-in-up"
            >
            <FaStar className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3" />
            <div className="flex items-center">
              <span className="text-black font-bold xl-text">Sell</span>
            </div>
            <p className="text-neutral">Exceptional Deals</p>
          </div>

          {/* Trade */}
          <div 
            className="flex flex-col items-center"
            data-aos="zoom-in-up"
            >
            <FaShieldAlt className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3"/>
            <div className="flex items-center">
              <span className="text-black font-bold xl-text">Trade</span>
            </div>
            <p className="text-neutral">Fair Value</p>
          </div>

          {/* Find */}
          <div 
            className="flex flex-col items-center"
            data-aos="zoom-in-up"
            >
            <FaThumbsUp className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3" />
            <div className="flex items-center">
              <span className="text-black font-bold xl-text">Find</span>
            </div>
            <p className="text-neutral">Your Ideal Car</p>
          </div>
        </div>
      </div>
    </div>
  )
}