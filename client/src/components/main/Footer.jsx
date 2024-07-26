import React from 'react';
import AdminLogin from '../../screens/AdminLogin';

function Footer() {
  return (
    <footer className="bottom-0 w-full flex flex-col items-center text-customWhite  p-3 bg-darkBlue">
      <p className="mt-3 text-center font-bold text-sm opacity-50">
        © Alpine Auto Sales. All rights reserved
      </p>

      <AdminLogin />
      
      <p className="text-center text-gray-800 font-bold text-sm opacity-50">
        made with love, bp
      </p>

    </footer>
  );
}

export default Footer;