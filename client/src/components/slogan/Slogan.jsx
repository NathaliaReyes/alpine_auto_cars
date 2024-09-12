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
          className="text-base md:text-lg text-black font-semibold text-center p-2 roboto700"
          >
          Your Trusted Partner in Car Sales  <span className="inline-block pl-2 pt-4"><FaHandshake /></span>
        </p>
      </div>
      <div className="my-4 rounded border-customWhite border-2 p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {/* Buy */}
          <div 
            className="flex flex-col items-center font-black"
            data-aos="zoom-in-up"
            >
            <FaCar className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-5 " />
            <div className="flex items-center">
              <span className="text-red-800 text-3xl pr-3 pl-3 pb-3 pt-2">Buy</span>
            </div>
            <p className="text-xl text-red-800 ">Quality Vehicles</p>
          </div>

          {/* Sell */}
          <div 
            className="flex flex-col items-center font-black"
            data-aos="zoom-in-up"
            >
            <FaStar className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3" />
            <div className="flex items- font-black">
              <span className="text-red-800 text-3xl p-3 pt-4 ">Sell</span>
            </div>
            <p className="text-xl text-red-800">Exceptional Deals</p>
          </div>

          {/* Trade */}
          <div 
            className="flex flex-col items-center font-black"
            data-aos="zoom-in-up"
            >
            <FaShieldAlt className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3"/>
            <div className="flex items-center">
              <span className="text-red-800 text-3xl p-3 pt-4 ">Trade</span>
            </div>
            <p className="text-xl text-red-800">Fair Value</p>
          </div>

          {/* Find */}
          <div 
            className="flex flex-col items-center font-black"
            data-aos="zoom-in-up"
            >
            <FaThumbsUp className="text-red-600 text-6xl sm:text-7xl md:text-8xl mt-3" />
            <div className="flex items-center">
              <span className="text-red-800 text-3xl p-3 pt-4">Find</span>
            </div>
            <p className="text-xl text-red-800">Your Ideal Car</p>
          </div>
        </div>
      </div>
    </div>
  )
}