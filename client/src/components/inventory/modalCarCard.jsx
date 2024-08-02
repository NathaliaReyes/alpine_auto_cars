import React from 'react';
import { Carousel } from "@material-tailwind/react";


const ModalCar = ({ isOpen, onClose, carInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-11/12 sm:w-11/12 md:w-3/4 lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">{carInfo.year} {carInfo.make} {carInfo.model}</h2>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <Carousel className="rounded-xl ">
              {carInfo.images.map((image, index) => (
                <div key={index} className="overflow-hidden relative h-full w-full carousel-slide">
                  <img src={image} alt="image 1" className="h-96 w-full object-cover" />
                </div>
              ))}
            </Carousel>          </div>
          <div className='flex-1'>
            <p><strong>Year:</strong> {carInfo.year}</p>
            <p><strong>Make:</strong> {carInfo.make}</p>
            <p><strong>Model:</strong> {carInfo.model}</p>
            <p><strong>Description:</strong> {carInfo.description}</p>
            <p><strong>Mileage:</strong> {carInfo.mileage}</p>
            <p><strong>Color:</strong> {carInfo.color}</p>
            <p><strong>Trim:</strong> {carInfo.trim}</p>
            <p><strong>Doors:</strong> {carInfo.doors}</p>
            <p><strong>Engine Size:</strong> {carInfo.engine}</p>
            <p><strong>Engine Type:</strong> {carInfo.engineType}</p>
            <p><strong>Transmission:</strong> {carInfo.transmission}</p>
            <p><strong>Drive Train:</strong> {carInfo.driveTrain}</p>
            <p><strong>Cab Type:</strong> {carInfo.cabType}</p>
            <p><strong>VIN:</strong> {carInfo.vin}</p>
            <p><strong>Stock No.:</strong> {carInfo.stock}</p>
            <p><strong>Retail Price:</strong> ${carInfo.retail_price}</p>
            <p><strong>Asking Price:</strong> ${carInfo.asking_price}</p>
          </div>
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ModalCar;