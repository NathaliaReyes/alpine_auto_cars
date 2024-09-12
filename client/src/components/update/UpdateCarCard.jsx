import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { Carousel } from "@material-tailwind/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import CustomModal from '@/components/update/CustomModal';
import EditCarForm from '@/components/update/EditCarForm.jsx';
import { useMutation } from '@apollo/client';
import { DELETE_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';
import { formatPrice } from "../../utils/helpers";

const UpdateCarCard = ({ refetchCars, car }) => {
    const [deleteCar] = useMutation(DELETE_CAR);

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const openEditModal = () => setEditModalIsOpen(true);
    const closeEditModal = () => setEditModalIsOpen(false);
    const openDeleteModal = () => setDeleteModalIsOpen(true);
    const closeDeleteModal = () => setDeleteModalIsOpen(false);

    const handleDelete = async (carId) => {
        // console.log(carId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const deletedCar = await deleteCar({
                variables: { id: carId },
            })
            if (deletedCar) {
                refetchCars();
                closeDeleteModal();
            }
        } catch (err) {
            console.log('Failed to delete car: ', err.message);
            return err;
        }
    };

    return (
        <>
            <Card className="md:m-3 w-full md:p-4 shadow-md">
                <CardHeader>
                    <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <Carousel className="rounded-xl ">
                                {car.images.map((image, index) => (
                                    <div key={index} className="overflow-hidden relative h-full w-full carousel-slide">
                                        <img src={`${image}`} alt="image 1" className="h-96 w-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className='flex flex-col justify-evenly space-y-4 md:ml-2'>
                            <CardTitle className="tracking-normal text-base md:text-lg">{car.year} {car.make} {car.model}</CardTitle>
                            {car.description ? (
                                <CardDescription>
                                    <div className="flex items-center">
                                        <span className="text-sm md:text-base text-left text-muted-foreground tracking-wide sm:ml-0.5">
                                            {car.description}
                                        </span>
                                    </div>
                                </CardDescription>
                            ) : ''}
                            <CardContent>
                                <div className="flex flex-col justify-between">
                                    <div className="w-full grid grid-cols-2 gap-2 text-xs md:text-base mb-3">
                                        <ul className="flex flex-col text-left space-y-2">
                                            <li><strong>Year: </strong>{car.year}</li>
                                            <li><strong>Make: </strong>{car.make}</li>
                                            <li><strong>Model: </strong>{car.model}</li>
                                            {car.mileage ? (<li><strong>Mileage: </strong>{car.mileage}</li>) : ''}
                                            {car.engine ? (<li><strong>Engine Size: </strong>{car.engine}</li>) : ''}
                                            {car.engineType ? (<li><strong>Engine Type: </strong>{car.engineType}</li>) : ''}
                                            {car.transmission ? (<li><strong>Transmission: </strong>{car.transmission}</li>) : ''}
                                            {car.driveTrain ? (<li><strong>Drive Train: </strong>{car.driveTrain}</li>) : ''}
                                        </ul>
                                        <ul className="flex flex-col text-left space-y-2">
                                            {car.color ? (<li><strong>Color: </strong>{car.color}</li>) : ''}
                                            {car.trim ? (<li><strong>Trim: </strong>{car.trim}</li>) : ''}
                                            {car.vehicleType ? (<li><strong>Vehicle Type: </strong>{car.vehicleType}</li>) : ''}
                                            {car.vin ? (<li><strong>VIN: </strong>{car.vin}</li>) : ''}
                                            {car.stock ? (<li><strong>Stock Number: </strong>{car.stock}</li>) : ''}
                                            {car.retail_price ? (<li><strong>Retail Price: </strong>${formatPrice(car.retail_price)}</li>) : ''}
                                            {car.asking_price ? (<li><strong>Asking Price: </strong>${formatPrice(car.asking_price)}</li>) : ''}
                                            <li className='hidden' id='carId'>{car._id}</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <div className="flex-1 sm:w-full md:mt-4 sm:mt-4 w-full">
                                <Button className="sm:w-full w-full bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-300 transition-colors">
                                    Asking Price: ${formatPrice(car.asking_price)}
                                </Button>
                            </div> */}
                            </CardContent>

                        </div>

                    </div>
                </CardHeader>
                <CardFooter>
                    <div className="flex flex-col sm:flex-row justify-evenly items-center w-full gap-8">
                        <Button onClick={openEditModal} className='sm:w-full lg:w-1/4 bg-gray-500 text-white hover:border-2 hover:bg-red-900 hover:border-red-300 transition-colors'>
                            Edit {car.year} {car.make} {car.model}
                        </Button>
                        <Button onClick={openDeleteModal} id={car._id} className='sm:w-full lg:w-1/4 bg-red-500 text-white hover:border-2 hover:border-red-300 hover:bg-red-900 transition-colors'>
                            Delete {car.year} {car.make} {car.model}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <Modal
                isOpen={editModalIsOpen}
                onClose={closeEditModal}
                contentLabel="Edit Car"
                className="modal bg-white md:p-2 w-full sm:w-1/2 lg:w-1/3"
                overlayClassName="modal-overlay"

                onConfirm={() => { }}
            >
                <EditCarForm closeModal={closeEditModal} refetchCars={refetchCars} carData={car} />
            </Modal>
            <Modal
                // carId={car._id}
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="modal-body flex justify-center">
                    <h1 className='block font-bold'>Are you sure you want to delete this car?</h1>
                </div>
                <div className="modal-body flex justify-center">
                    <h2 className=' font-bold block text-xl'>{car.year} {car.make} {car.model}</h2>
                </div>
                <div className="modal-footer">
                    <button onClick={closeDeleteModal} className="modal-button bg-gray-500 text-white hover:bg-gray-700">Cancel</button>
                    <button onClick={() => handleDelete(car._id)} className="modal-button bg-red-500 text-white hover:bg-red-700">Confirm</button>
                </div>
                <div className="modal-body font-bold flex justify-center">
                    <p className='block text-base'><i>* You will have to manually add this vehicle again to restore it once it is deleted * </i></p>
                </div>
            </Modal>
        </>
    );
};

const UpdateCarList = ({ cars, refetchCars }) => {
    console.log(cars);

    return (
        <>
            {cars ? (
                <div className="flex flex-wrap justify-center">
                    {Object.keys(cars).map(key => (
                        <UpdateCarCard key={key} car={cars[key]} refetchCars={refetchCars} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <p className='font-black text-2xl'>No vehicles in inventory yet</p>
                </div>
            )}
        </>
    );
};

export default UpdateCarList;
