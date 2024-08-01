import React from 'react';

const ModalCar = ({ isOpen, onClose, carInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-11/12 sm:w-11/12 md:w-3/4 lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">{carInfo.model} {carInfo.make}</h2>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <img src={carInfo.images[0]} alt={carInfo.make} className="w-full h-64 object-cover" />
          </div>
          <div className='flex-1'>
            <p><strong>Make:</strong> {carInfo.make}</p>
            <p><strong>Model:</strong> {carInfo.model}</p>
            <p><strong>Year:</strong> {carInfo.year}</p>
            <p><strong>Price:</strong> ${carInfo.price}</p>
            <p><strong>Description:</strong> {carInfo.description}</p>
          </div>
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ModalCar;