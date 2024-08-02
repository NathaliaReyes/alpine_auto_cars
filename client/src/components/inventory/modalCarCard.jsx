import React from 'react';
import { Carousel } from "@material-tailwind/react";
import { formatPrice } from "../../utils/helpers";



const ModalCar = ({ isOpen, onClose, carInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-11/12">
      <button onClick={onClose} className="w-7 h-7 border-2 border-red-500 absolute top-13 right-20 text-red-500 hover:bg-red-700 hover:text-gray-400 transition-colors rounded-full pb-2">✕</button>
        <h2 className="text-xl font-bold mb-4 text-center">{carInfo.year} {carInfo.make} {carInfo.model}</h2>

        <div className='grid grid-cols-1 sm:flex-row gap-4'>
          <div className='w-full'>
            <Carousel className="rounded-xl ">
              {carInfo.images.map((image, index) => (
                <div key={index} className=" overflow-hidden overflow-y-scroll overflow-x-scroll relative h-full w-full carousel-slide">
                  <img src={image} alt="image 1" className="h-[50rem] w-full object-cover" />
                </div>
              ))}
            </Carousel>          </div>
          <div className='grid grid-cols-3'>
            <p><strong>Year:</strong> {carInfo.year}</p>
            <p><strong>Make:</strong> {carInfo.make}</p>
            <p><strong>Model:</strong> {carInfo.model}</p>
            {carInfo.description ? (
              <p><strong>Description:</strong> {carInfo.description}</p>
            ) : ''}
            <p><strong>Mileage:</strong> {carInfo.mileage}</p>
            <p><strong>Color:</strong> {carInfo.color}</p>
            <p><strong>Trim:</strong> {carInfo.trim}</p>
            <p><strong>Vehicle/Cab Type:</strong> {carInfo.vehicleType}</p>
            <p><strong>Engine Size:</strong> {carInfo.engine}</p>
            <p><strong>Engine Type:</strong> {carInfo.engineType}</p>
            <p><strong>Transmission:</strong> {carInfo.transmission}</p>
            <p><strong>Drive Train:</strong> {carInfo.driveTrain}</p>
            <p><strong>VIN:</strong> {carInfo.vin}</p>
            <p><strong>Stock No.:</strong> {carInfo.stock}</p>
            <p><strong>Retail Price:</strong> ${formatPrice(carInfo.retail_price)}</p>
            <p><strong>Asking Price:</strong> ${formatPrice(carInfo.asking_price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCar;