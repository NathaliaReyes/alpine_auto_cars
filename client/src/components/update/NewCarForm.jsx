import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';
import axios from 'axios';

function NewCarForm({ closeModal, refetchCars }) {
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

  const [addCar] = useMutation(ADD_CAR);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'year' || name === 'price' || name === 'mileage' ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const uploadFiles = async () => {
    const uploadedImagePaths = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:3001/upload', formData);
        console.log('File upload response:', response.data); // Debug response
        if (response.data.filePath) {
          uploadedImagePaths.push(response.data.filePath);
        } else {
          console.error('No file path in response:', response.data);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    return uploadedImagePaths;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const imagePaths = await uploadFiles();
      console.log('imagePaths', imagePaths);
      const { data } = await addCar({
        variables: { ...carDetails, images: imagePaths },
      });
      if (data) {
        refetchCars(); // Refetch the cars query to update the UI
        closeModal();  // Close the modal after successful submission
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center">
        <h1>Insert a new vehicle into Inventory</h1>
      </div>
      <Button type="button" onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:bg-red-700 transition-colors rounded-full">✕</Button>
      <Input className="mt-8" name="make" placeholder="Car Make" value={carDetails.make} onChange={handleChange} required />
      <Input name="model" placeholder="Car Model" value={carDetails.model} onChange={handleChange} required />
      <Input type="number" name="year" placeholder="Car Year" value={carDetails.year} onChange={handleChange} required />
      <Input type="number" name="price" placeholder="Car Price" value={carDetails.price} onChange={handleChange} required />
      <Input name="color" placeholder="Car Color" value={carDetails.color} onChange={handleChange} required />
      <Input type="number" name="mileage" placeholder="Car Mileage" value={carDetails.mileage} onChange={handleChange} required />
      <Textarea name="description" placeholder="Car Description" value={carDetails.description} onChange={handleChange} />
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors">Submit</Button>
      </div>
    </form>
  );
}

export default NewCarForm;