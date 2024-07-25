import React from 'react';
import { FaYelp } from 'react-icons/fa';
import { Button } from "@/components/ui/button";  // Ensure you import your button component correctly

const YelpIcon = () => (
  <Button 
    onClick={() => window.open('  https://www.yelp.com/biz/alpine-auto-sales-bayfield-3', '_blank')}
    className="w-12 h-12 flex items-center justify-center rounded bg-red-600 hover:bg-red-700">
    <FaYelp className="text-white" />
  </Button>
);

export default YelpIcon;