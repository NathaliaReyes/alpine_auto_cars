import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import '../../styles/EditCarForm.css'; // Import your CSS file

const EditCarForm = ({ closeModal, carData }) => {
    const [formData, setFormData] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        description: '',
        price: '',
        mileage: '',
        color: '',
        engine: '',
        transmission: '',
        doors: '',
        seats: '',
        features: [],
        images: []
    });

    useEffect(() => {
        if (carData) {
            setFormData(carData);
        }
    }, [carData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="edit-car-form">
                <Button type="close" onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:bg-red-700 transition-colors rounded-full">✕</Button>
            <h2 className='mt-10'>Edit Car</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="make">Make:</label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="mileage">Mileage:</label>
                <input type="text" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="color">Color:</label>
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="engine">Engine:</label>
                <input type="text" id="engine" name="engine" value={formData.engine} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="transmission">Transmission:</label>
                <input type="text" id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="doors">Doors:</label>
                <input type="number" id="doors" name="doors" value={formData.doors} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="seats">Seats:</label>
                <input type="number" id="seats" name="seats" value={formData.seats} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="features">Features:</label>
                <textarea id="features" name="features" value={formData.features.join(', ')} onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    features: e.target.value.split(', ').map(feature => feature.trim())
                }))} />
            </div>
            <div className="form-group">
                <label htmlFor="images">Images:</label>
                <textarea id="images" name="images" value={formData.images.join(', ')} onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    images: e.target.value.split(', ').map(image => image.trim())
                }))} />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
        </form>
    );
};

export default EditCarForm;