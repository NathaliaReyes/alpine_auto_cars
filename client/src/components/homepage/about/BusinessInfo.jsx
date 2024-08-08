import React from "react";
import FacebookIcon from "../socialMedia/Facebook";
import GoogleIcon from "../socialMedia/Google";
import YelpIcon from "../socialMedia/Yelp";
import { PhoneIcon, LocationMarkerIcon, ClockIcon } from '@heroicons/react/solid';

function BusinessInfo() {
  return (
    <div className="flex flex-col items-center md:flex-row justify-evenly md:mt-4 space-y-4 md:space-y-0 md:p-8">
      <div className="flex gap-2 flex-row">
        <FacebookIcon />
        <GoogleIcon />
        <YelpIcon />
      </div>

        <div className="flex flex-col font-semibold">
          <a href="tel:+19704264356" className="flex justify-center items-center">
            <PhoneIcon className="w-5 h-5 mr-2 text-red-600 mb-2" />
            970-426-4356
          </a>
          <a href="https://www.google.com/maps/dir//Alpine+Auto+Sales+LLC+828+Co+Rd+501+Bayfield,+CO+81122/@37.2430787,-107.6013486,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x873c21adba3328e5:0xa17770b3fcd18eb9" target="_blank" rel="noopener noreferrer" className="flex items-center text-center leading-normal">
            <LocationMarkerIcon className="w-5 h-5 mr-2 text-red-600" />
            828 Co Rd 501 <br />Bayfield, CO 81122
          </a>
        </div>

        <div className="flex font-semibold justify-center items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-red-600" />
          <div className="flex flex-col ">
            <a href="tel:+19704264356">Monday - Friday 8:00am - 5:00pm</a>
            <a href="tel:+19704264356">Saturday - By Appt Only</a>
          </div>
        </div>
    </div>
  )
}

export default BusinessInfo;