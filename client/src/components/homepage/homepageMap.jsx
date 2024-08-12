import React from 'react';

const LocationMap = () => {
  return (
    <div className="flex justify-center ">
      <div className="md:w-70">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.1949030812925!2d-107.60392888817842!3d37.24308294249249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873c21adba3328e5%3A0xa17770b3fcd18eb9!2sAlpine%20Auto%20Sales%20LLC!5e0!3m2!1sen!2sus!4v1721853230579!5m2!1sen!2sus"
          width="400"
          height="400"
          className="border-0 w-full ml-2 mr-2 shadow-lg p-4"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        <div className="text-center mt-3 mb-3">
          <p className="text-neutral-400 lg:max-w-4xl md:max-w-2xl max-w-lg mx-auto my-2 lg:text-lg md:text-base text-sm text-center"
          style={{ fontFamily: 'Abel' }}>
            To schedule an appointment, you can reach us by <a href='tel:9704264256' className='text-blue-500 hover:text-blue-900'>Phone</a>, <a href="mailto:chriswright47@hotmail.com" target="_blank" rel="noopener noreferrer" className=" text-blue-500 hover:text-blue-900">Email</a>, or fill out the form in our <a href="/Contact" className="text-blue-500 hover:text-blue-900">Contact</a> section. <br /><br />We appreciate you choosing Alpine Auto Sales, LLC!
          </p>
        </div>
      </div>

    </div>
  );
};

export default LocationMap;