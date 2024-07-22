import React from 'react';

function Footer() {
    return (
      <footer className="bottom-0 w-full flex flex-col items-center justify-center p-3 bg-darkBlue">
        <div className="flex gap-4">
        <p className="mt-3 text-center text-customWhite font-bold text-sm opacity-50">© Alpine Auto Sales. All rights reserved</p>
        </div>
        <p className="text-center text-gray-800 font-bold text-sm opacity-50">made with love, bp</p>
      </footer>
    );
  }
  
  export default Footer;