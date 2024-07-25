import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Button } from "@/components/ui/button";  // Ensure you import your button component correctly

const GoogleIcon = () => (
  <Button 
    onClick={() => window.open('  https://www.google.com/maps/place/Alpine+Auto+Sales+LLC/@37.2528411,-107.6611271,12.58z/data=!4m6!3m5!1s0x873c21adba3328e5:0xa17770b3fcd18eb9!8m2!3d37.2430787!4d-107.6013486!16s%2Fg%2F11sn_33nfc?entry=ttu', '_blank')}
    className="w-12 h-12 flex items-center justify-center rounded bg-red-500 hover:bg-red-600"
  >
    <FaGoogle className="text-white" />
  </Button>
);

export default GoogleIcon;