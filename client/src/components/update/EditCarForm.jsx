import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';
import '../../styles/EditCarForm.css'; // Import your CSS file

const EditCarForm = ({ closeModal, refetchCars, carData }) => {
  const [updateCar] = useMutation(UPDATE_CAR);

  const [carDetails, setCarDetails] = useState({
    carId: '',
    make: '',
    model: '',
    year: '',
    description: '',
    price: '',
    mileage: '',
    color: '',
    images: []
  });

  useEffect(() => {
    if (carData) {
      setCarDetails(carData);
    }
  }, [carData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'year' || name === 'price' || name === 'mileage' ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setCarDetails({
      ...carDetails,
      images: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
  
    const { __typename, ...filteredCarDetails } = carDetails;
    console.log(filteredCarDetails);
    const { _id, ...rest } = filteredCarDetails;
    const transformedCarDetails = {
      carId: _id,
      ...rest
    };
    console.log(transformedCarDetails);

    try {
      const updatedCar = await updateCar({
        variables: { carData: transformedCarDetails },
      });
      if (updatedCar) {
        refetchCars();
        closeModal();
      }
    } catch (error) {
      console.log('Failed to update car, ', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-car-form">
      <div className='flex justify-center'>
        <h1>Edit {carData.year} {carData.make} {carData.model}</h1>
      </div>
      <Button type="button" onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:bg-red-700 transition-colors rounded-full">×</Button>
      <Input type="hidden" name="carId" value={carDetails.carId} />
      <Input className='mt-8' name="make" label="Make" placeholder="Car Make" value={carDetails.make} onChange={handleChange} required />
      <Input name="model" label="Model" placeholder="Car Model" value={carDetails.model} onChange={handleChange} required />
      <Input type="number" name="year" label="Year" placeholder="Car Year" value={carDetails.year} onChange={handleChange} required />
      <Input type="number" name="price" label="Price" placeholder="Car Price" value={carDetails.price} onChange={handleChange} required />
      <Input name="color" label="Color" placeholder="Car Color" value={carDetails.color} onChange={handleChange} required />
      <Input type="number" name="mileage" label="Mileage" placeholder="Car Mileage" value={carDetails.mileage} onChange={handleChange} required />
      <Textarea name="description" label="Description" placeholder="Car Description" value={carDetails.description} onChange={handleChange} />
      <div className="form-group">
        <label htmlFor="images">Images:</label>
        <textarea id="images" name="images" value={carDetails.images.join(', ')} onChange={(e) => setCarDetails(prevState => ({
          ...prevState,
          images: e.target.value.split(', ').map(image => image.trim())
        }))} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
      </div>
    </form>
  );
};

export default EditCarForm;