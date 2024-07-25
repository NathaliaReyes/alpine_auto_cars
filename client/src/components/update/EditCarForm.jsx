import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function EditCarForm({ closeModal }) {
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    color: '',
    mileage: '',
    description: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCarDetails({
      ...carDetails,
      images: Array.from(e.target.files),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='flex justify-center'>
        <h1>Edit {carDetails.name}</h1>
      </div>
      <Button type="close" onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:bg-red-700 transition-colors rounded-full">✕</Button>
      <Input className='mt-8' name="make" label="Make" placeholder="Car Make" value={carDetails.make} onChange={handleChange} required />
      <Input name="model" label="Model" placeholder="Car Model" value={carDetails.model} onChange={handleChange} required />
      <Input type="number" name="year" label="Year" placeholder="Car Year" value={carDetails.year} onChange={handleChange} required />
      <Input type="number" name="price" label="Price" placeholder="Car Price" value={carDetails.price} onChange={handleChange} required />
      <Input name="color" label="Color" placeholder="Car Color" value={carDetails.color} onChange={handleChange} required />
      <Input type="number" name="mileage" label="Mileage" placeholder="Car Mileage" value={carDetails.mileage} onChange={handleChange} required />
      <Textarea name="description" label="Description" placeholder="Car Description" value={carDetails.description} onChange={handleChange} />
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className='flex justify-center'>
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors">Submit</Button>
      </div>
    </form>
  );
}

export default EditCarForm;