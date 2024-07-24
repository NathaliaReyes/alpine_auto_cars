import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';

const ResponsiveIframe = () => {
  // Initial state for iframe height
  const [iframeHeight, setIframeHeight] = useState('300px'); // Default height

  useEffect(() => {
    // Function to update height based on window width
    const updateHeight = () => {
      if (window.innerWidth < 640) { // Example breakpoint for 'sm'
        setIframeHeight('200px'); // Smaller screens
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) { // 'md' to 'lg'
        setIframeHeight('300px'); // Medium screens
      } else {
        setIframeHeight('400px'); // Larger screens
      }
    };

    // Update height on mount and window resize
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.1949030812925!2d-107.60392888817842!3d37.24308294249249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873c21adba3328e5%3A0xa17770b3fcd18eb9!2sAlpine%20Auto%20Sales%20LLC!5e0!3m2!1ses!2sus!4v1721853230579!5m2!1ses!2sus" 
        width="400" 
        height={iframeHeight}
        className="border-0 w-full ml-2 mr-2 shadow-lg"
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  );
};

const LocationMap = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center ">
      {/* Map section */}
      <div className="md:w-5/12 md:mx-2">
        <ResponsiveIframe />
        {/* Text section */}
        <div className="text-center mt-3">
          <p className="text-lg mt-4 ml-3 mr-3 text-white mb-3">
            To schedule an appointment, you can reach us by phone, <a href="https://wa.me/19704264356" target="_blank" rel="noopener noreferrer" className=" text-green-500 hover:text-green-600">WhatsApp</a>, or fill out the form in our <a href="/Contact" className="text-blue-600 ">Contact</a> section. <br /><br />We appreciate you choosing Alpine Auto Sales, LLC!
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="md:w-5/12 md:mx-2 w-full flex justify-center">
        <Card className="max-w-lg w-full rounded overflow-hidden shadow-lg m-1 flex flex-col text-center justify-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            <i className="fas fa-map-marker-alt mr-2"></i>Location
          </h2>
          <p>
            828 Co Rd 501 <br />
            Bayfield, CO 81122<br />
            <a className="text-blueMedium" href="https://www.google.com/maps/dir//828+Co+Rd+501,+Bayfield,+CO+81122/@37.2430502,-107.6837496,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x873c21adba3328e5:0xa17770b3fcd18eb9!2m2!1d-107.6013486!2d37.2430787?entry=ttu" target="_blank" rel="noopener noreferrer">Get Directions ⭢</a>
          </p>
          <h2 className="text-xl md:text-2xl font-semibold">
            <i className="fas fa-phone mr-2"></i>Phone
          </h2>
          <p>
            <a className="text-blueMedium" href="tel:+18134686878">+1 (813) 468-6878</a>
          </p>
          <h2 className="text-xl md:text-2xl font-semibold">
            <i className="fas fa-clock mr-2"></i>Hours
          </h2>
          <ul className="list-none">
            <li><span className="font-medium">Monday - Friday</span> 8:00 - 17:00</li>
            <li><span className="font-medium">Saturday - By Appt Only</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default LocationMap;