import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@apollo/client';
import { ADD_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';
import axios from 'axios';
import CustomModal from './CustomModal';


function NewCarForm({ closeModal, refetchCars }) {
  const [carDetails, setCarDetails] = useState({
    year: '',
    make: '',
    model: '',
    retail_price: null,
    asking_price: null,
    color: null,
    mileage: null,
    description: null,
    images: [],
    vehicleType: null,
    driveTrain: null,
    engine: null,
    engineType: null,
    stock: null,
    transmission: null,
    trim: null,
    vin: null,
    fuelType: null
  });

  const [addCar] = useMutation(ADD_CAR);
  const [files, setFiles] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // const [validationMessages, setValidationMessages] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'year' || name === 'mileage' || name === 'retail_price' || name == 'asking_price' || name == 'stock' ? parseInt(value, 10) : value,
    }));

    // Clear validation message for the field being changed
    // setValidationMessages((prevMessages) => ({
    //   ...prevMessages,
    //   [name]: '',

    // }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files; // Convert FileList to an Array
    setFiles(selectedFiles);
    console.log('Selected files:', selectedFiles);
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
    console.log('Uploaded image paths:', uploadedImagePaths); // Add this line
    return uploadedImagePaths;
  };

  function formatFieldName(fieldName) {
    return fieldName
      // Convert camelCase to space-separated words
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Convert snake_case to space-separated words
      .replace(/_/g, ' ')
      // Capitalize the first letter of each word
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  const validateForm = (carDetails) => {
    console.log(carDetails.retail_price);
    const errors = [];
    for (const [key, value] of Object.entries(carDetails)) {
      if (!value) {
        errors.push(formatFieldName(key));
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(carDetails);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowConfirmationModal(true);
      return;
    }

    console.log("Submitting form with car details:", carDetails);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const imagePaths = await uploadFiles();
      console.log('imagePaths', imagePaths);

      const { data } = await addCar({
        variables: {
          ...carDetails,
          images: imagePaths
        },
      });
      if (data) {
        refetchCars(); // Refetch the cars query to update the UI
        closeModal();  // Close the modal after successful submission
      }
    } catch (error) {
      if (error.networkError) {
        console.error('Network error:', error.networkError);
      }
      if (error.graphQLErrors) {
        console.error('GraphQL errors:', error.graphQLErrors);
      }
      console.error('Error:', error);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmationModal(false);
    // Proceed with form submission
    try {
      const imagePaths = await uploadFiles();
      await addCar({
        variables: {
          ...carDetails,
          images: imagePaths,
        },
      });
      refetchCars(); // Refetch the cars query to update the UI
      closeModal();  // Close the modal after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  return (

    <form onSubmit={handleSubmit} className="w-full pr-2 md:px-3 mt-3 overflow-hidden overflow-y-scroll z-10">

      <div className="flex justify-center">
        <h1 className='text-grey-900 font-bold tracking-tight md:tracking-wide text-shadow mb-1 text-center text-base md:text-xl'>Insert a New Vehicle Into Inventory</h1>
      </div>
      <Button type="button" onClick={closeModal} className="absolute top-0.5 md:top-4 right-3 md:right-12 p-1.5 md:p-3 border-gray-400 text-gray-800 hover:bg-red-600 hover:font-bold transition-colors rounded bg-white border-4">
        ✕
      </Button>
      <Label htmlFor="year" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Car Year:</Label>
      <Input name="year" type="number" placeholder="Car Year" value={carDetails.year} onChange={handleChange} required />
      <Label htmlFor="make" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Make:</Label>
      <Input name="make" type="text" placeholder="Car Make" value={carDetails.make} onChange={handleChange} required />
      <Label htmlFor="model" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Model:</Label>
      <Input name="model" type="text" placeholder="Car Model" value={carDetails.model}
        onChange={handleChange} required />
      <Label htmlFor="vehicleType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Vehicle Type:</Label>
      <Input name="vehicleType" type="text" placeholder="Vehicle Type" value={carDetails.vehicleType} onChange={handleChange} />
      <Label htmlFor="color" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Color:</Label>
      <Input name="color" type="text" placeholder="Car Color" value={carDetails.color} onChange={handleChange} />
      <Label htmlFor="trim" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Trim:</Label>
      <Input name="trim" type="text" placeholder="Trim Color" value={carDetails.trim} onChange={handleChange} />
      <Label htmlFor="mileage" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Mileage:</Label>
      <Input name="mileage" type="number" placeholder="Car Mileage" value={carDetails.mileage} onChange={handleChange} />
      <Label htmlFor="stock" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Stock No.</Label>
      <Input name="stock" type="number" placeholder="Stock No." value={carDetails.stock} onChange={handleChange} />
      <Label htmlFor="engine" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Engine:</Label>
      <Input name="engine" type="text" placeholder="Car Engine" value={carDetails.engine} onChange={handleChange} />
      <Label htmlFor="engineType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Engine Type:</Label>
      <Input name="engineType" type="text" placeholder="Engine Type" value={carDetails.engineType} onChange={handleChange} />
      <Label htmlFor="transmission" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Transmission:</Label>
      <Input name="transmission" type="text" placeholder="Transmission Type" value={carDetails.transmission} onChange={handleChange} />
      <Label htmlFor="fuelType" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Fuel Type:</Label>
      <Input name="fuelType" type="text" placeholder="Fuel Type" value={carDetails.fuelType} onChange={handleChange} />
      <Label htmlFor="driveTrain" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Drive Train:</Label>
      <Input name="driveTrain" type="text" placeholder="Drive Train" value={carDetails.driveTrain} onChange={handleChange} />
      <Label htmlFor="vin" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">VIN:</Label>
      <Input name="vin" type="text" placeholder="VIN" value={carDetails.vin} onChange={handleChange} />
      <Label htmlFor="retail_price" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Retail Price:</Label>
      <Input name="retail_price" type="number" placeholder="Retail Price" value={carDetails.retail_price} onChange={handleChange} />
      <Label htmlFor="asking_price" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Asking Price:</Label>
      <Input name="asking_price" type="number" placeholder="Asking Price" value={carDetails.asking_price} onChange={handleChange} />
      <Label htmlFor="description" className="block text-gray-700 text-base font-semibold mt-2 md:mt-3 tracking-tight md:tracking-normal">Description:</Label>
      <Textarea name="description" placeholder="Car Description" value={carDetails.description} onChange={handleChange} rows="4" />
      <div>
        <label className="block text-gray-700 text-base font-medium">Upload Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="bg-red-500 text-white hover:bg-red-900 transition-colors hover:font-bold">Submit</Button>
      </div>

      <CustomModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirm}
        onClose={handleCancel}
        contentLabel="Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-body font-bold flex justify-center">
          <p className="mt-4  text-xl">Are you sure you want to submit the form with these fields incomplete?</p>
        </div>
        <div className="modal-body flex justify-center">
          <ul className="list-disc pl-5 mt-2">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-red-500">{error}</li>
            ))}
          </ul>
        </div>
      </CustomModal>


    </form>
  );
}

export default NewCarForm;