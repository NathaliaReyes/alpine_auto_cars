import React from 'react';
import CarList from '@/components/inventory/cardCar';

function Inventory() {
  return (
    <>
      <div className="z-1">
        <CarList />
        <div className="flex items-center justify-center bg-gray-100 p-6 lg:mt-28 lg:mx-96">
          <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">Don't see what you're looking for?</h2>
              <p className="mt-4 text-gray-600">
                <a href="tel:9704264356" className="text-blue-500 hover:underline">Give us a call</a> and we can help you find exactly what you are searching for!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
      )
}

      export default Inventory;