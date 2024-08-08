import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';
import '../../styles/EditCarForm.css'; // Import your CSS file

const EditCarForm = ({ closeModal, refetchCars, carData }) => {
  const [updateCar] = useMutation(UPDATE_CAR);

  const [carDetails, setCarDetails] = useState({
    year: '',
    make: '',
    model: '',
    retail_price: '',
    asking_price: '',
    color: '',
    mileage: '',
    description: '',
    images: [],
    vehicleType: '',
    driveTrain: '',
    engine: '',
    engineType: '',
    stock: '',
    transmission: '',
    trim: '',
    vin: '',
    fuelType: ''
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
      [name]: name === 'year' || name === 'mileage' || name === 'retail_price' || name == 'asking_price' || name == 'stock' ? parseInt(value, 10) : value,
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
      if (error.networkError) {
        console.error('Network error:', error.networkError);
      }
      if (error.graphQLErrors) {
        console.error('GraphQL errors:', error.graphQLErrors);
      }
      console.error('Error:', error);
      console.log('Failed to update car, ', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full pr-2 md:px-3 mt-3 overflow-hidden overflow-y-scroll z-50">
      <div className='flex justify-center'>
        <h1 className='text-blue-500 font-bold tracking-tight md:tracking-wide text-shadow mb-1 text-center text-base md:text-xl'><span className='text-gray-600 tracking-wide'>Edit:</span> {carData.year} {carData.make} {carData.model}</h1>
      </div>
      <Button type="button" onClick={closeModal} className="absolute top-0.5 md:top-4 right-3 md:right-12 p-1.5 md:p-3 border-gray-400 text-gray-800 hover:bg-red-600 hover:font-bold transition-colors rounded bg-white border-4">
        ✕
      </Button>
      <Label htmlFor="year" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Car Year:</Label>
      <Input name="year" type="number" placeholder="Car Year" value={carDetails.year} onChange={handleChange} required  />
      <Label htmlFor="make" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Make:</Label>
      <Input name="make" type="text" placeholder="Car Make" value={carDetails.make}  onChange={handleChange} required />
      <Label htmlFor="model" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Model:</Label>
      <Input name="model" type="text" placeholder="Car Model" value={carDetails.model}
        onChange={handleChange} required />
      <Label htmlFor="vehicleType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Vehicle Type:</Label>
      <Input name="vehicleType" type="text" placeholder="Vehicle Type" value={carDetails.vehicleType} onChange={handleChange} required />
      <Label htmlFor="color" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Color:</Label>
      <Input name="color" type="text" placeholder="Car Color" value={carDetails.color} onChange={handleChange} required />
      <Label htmlFor="trim" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Trim:</Label>
      <Input name="trim" type="text" placeholder="Trim Color" value={carDetails.trim} onChange={handleChange} required />
      <Label htmlFor="mileage" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Mileage:</Label>
      <Input name="mileage" type="number" placeholder="Car Mileage" value={carDetails.mileage} onChange={handleChange} required />
      <Label htmlFor="stock" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Stock No.</Label>
      <Input name="stock" type="number" placeholder="Stock No." value={carDetails.stock} onChange={handleChange} required />
      <Label htmlFor="engine" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Engine:</Label>
      <Input name="engine" type="text" placeholder="Car Engine" value={carDetails.engine} onChange={handleChange} required />
      <Label htmlFor="engineType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Engine Type:</Label>
      <Input name="engineType" type="text" placeholder="Engine Type" value={carDetails.engineType} onChange={handleChange} required />
      <Label htmlFor="transmission" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Transmission:</Label>
      <Input name="transmission" type="text" placeholder="Transmission Type" value={carDetails.transmission} onChange={handleChange} required />
      <Label htmlFor="fuelType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Fuel Type:</Label>
      <Input name="fuelType" type="text" placeholder="Fuel Type" value={carDetails.fuelType} onChange={handleChange} required />
      <Label htmlFor="driveTrain" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Drive Train:</Label>
      <Input name="driveTrain" type="text" placeholder="Drive Train" value={carDetails.driveTrain} onChange={handleChange} required />
      <Label htmlFor="vin" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">VIN:</Label>
      <Input name="vin" type="text" placeholder="VIN" value={carDetails.vin} onChange={handleChange} required />
      <Label htmlFor="retail_price" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Retail Price:</Label>
      <Input name="retail_price" type="number" placeholder="Retail Price" value={carDetails.retail_price} onChange={handleChange} required />
      <Label htmlFor="asking_price" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Asking Price:</Label>
      <Input name="asking_price" type="number" placeholder="Asking Price" value={carDetails.asking_price} onChange={handleChange} required />
      <Label htmlFor="description" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Description:</Label>
      <Textarea name="description" placeholder="Car Description" value={carDetails.description} onChange={handleChange} rows="4" />
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
      <div className="form-actions mt-4">
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
      </div>
    </form>
  );
};

export default EditCarForm;