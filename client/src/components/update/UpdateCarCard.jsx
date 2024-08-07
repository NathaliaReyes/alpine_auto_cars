import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

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
            <Card className="mt-3 ml-0 mr-0 w-full">
                <CardHeader>
                    <CardTitle className="tracking-normal">{car.year} {car.make} {car.model}</CardTitle>
                    <CardDescription>
                        <div className="flex items-center pt-1">
                            <span className="text-sm text-left text-muted-foreground tracking-wide sm:ml-0.5">
                                {car.description}
                            </span>
                        </div>
                    </CardDescription>
                    <CardContent>
                        <div className="flex flex-col lg:flex-row justify-between p-0">
                            <div className="md:flex justify-evenly w-full">
                                <div className="w-full">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <ul className="flex flex-col text-left space-y-2">
                                            <li><strong>Make: </strong>{car.make}</li>
                                            <li><strong>Model: </strong>{car.model}</li>
                                            <li><strong>Year: </strong>{car.year}</li>
                                            <li><strong>Price: </strong>${formatPrice(car.asking_price)}</li>
                                        </ul>
                                        <ul className="flex flex-col text-left space-y-2">
                                            <li><strong>Mileage: </strong>{car.mileage}</li>
                                            <li><strong>Color: </strong>{car.color}</li>
                                            <li className='hidden' id='carId'>{car._id}</li>
                                            {/* <li><strong>Engine: </strong>{car.engine}</li>
                                            <li><strong>Trans: </strong>{car.transmission}</li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 sm:w-full md:mt-4 sm:mt-4 w-full">
                                <Button className="sm:w-full w-full bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-300 transition-colors">
                                    Price: ${formatPrice(car.asking_price)}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </CardHeader>
                <CardFooter>
                    <div className="flex flex-col sm:flex-row justify-evenly items-center w-full gap-8">
                        <Button onClick={openEditModal} className='sm:w-full lg:w-1/4 bg-blue-500 text-white hover:border-2 hover:bg-blue-900 hover:border-blue-300 transition-colors'>
                            Edit {car.year} {car.make} {car.model}
                        </Button>
                        <Button onClick={openDeleteModal} id={car._id} className='sm:w-full lg:w-1/4 bg-blue-500 text-white hover:border-2 hover:border-blue-300 hover:bg-blue-900 transition-colors'>
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
            <CustomModal
                carId={car._id}
                isOpen={deleteModalIsOpen}            >
                <div className="modal-body flex justify-center">
                    <h1 className='block font-bold'>Are you sure you want to delete this car?</h1>
                </div>
                <div className="modal-body flex justify-center">
                    <h2 className=' font-bold block text-xl'>{car.year} {car.make} {car.model}</h2>
                </div>
                <div className="modal-footer">
                    <button onClick={() => handleDelete(car._id)} className="modal-button bg-red-500 text-white hover:bg-red-700">Confirm</button>
                    <button onClick={closeDeleteModal} className="modal-button bg-gray-500 text-white hover:bg-gray-700">Cancel</button>
                </div>
                <div className="modal-body font-bold flex justify-center">
                    <p className='block text-base'><i>* You will have to manually add this vehicle again to restore it once it is deleted * </i></p>
                </div>
            </CustomModal>
        </>
    );
};

const UpdateCarList = ({ cars, refetchCars }) => {
    return (
        <>
            <div className="flex flex-wrap justify-center">
                {Object.keys(cars).map(key => (
                    <UpdateCarCard key={key} car={cars[key]} refetchCars={refetchCars} />
                ))}
            </div>
        </>
    );
};

export default UpdateCarList;
