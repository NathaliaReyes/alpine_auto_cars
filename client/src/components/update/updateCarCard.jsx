import React, { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
// import carPlaceholder from "@/assets/images/placeholder-car.png";

import CustomModal from '@/components/update/CustomModal';
import EditCarForm from '@/components/update/EditCarForm.jsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { useQuery, useMutation } from '@apollo/client';
import { GET_CARS } from '@/utils/queries';
import { DELETE_CAR } from '@/utils/mutations';
import Auth from '@/utils/auth';

const UpdateCarCard = ({ car }) => {

    const [deleteCar] = useMutation(DELETE_CAR);

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const openEditModal = () => setEditModalIsOpen(true);
    const closeEditModal = () => setEditModalIsOpen(false);
    const openDeleteModal = () => setDeleteModalIsOpen(true);
    const closeDeleteModal = () => setDeleteModalIsOpen(false);

    const handleDelete = async () => {
        const token = Auth.loggedIn() ? Auth.getToken(): null;

        if (!token) {
            return false;
        }

        try {
            await deleteCar({
                variables: { carId },
                update: (cache, { data: { deletedCar } }) => {
                    const { cars } = cache.readQuery({ query: GET_CARS });
                    cache.writeQuery({
                      query: GET_CARS,
                      data: { cars: { ...cars} },
                    });
                  },
            })
        } catch (err) {
            console.log(err);
            return err;
        }

        closeDeleteModal();
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
                                            <li><strong>Price: </strong>${car.price}</li>
                                        </ul>
                                        <ul className="flex flex-col text-left space-y-2">
                                            <li><strong>Mileage: </strong>{car.mileage}</li>
                                            <li><strong>Color: </strong>{car.color}</li>
                                            <li><strong>Engine: </strong>{car.engine}</li>
                                            <li><strong>Trans: </strong>{car.transmission}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 sm:w-full md:mt-4 sm:mt-4 w-full">
                                <Button className="sm:w-full w-full bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-300 transition-colors">
                                    Price: ${car.price}
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
                        <Button onClick={openDeleteModal} className='sm:w-full lg:w-1/4 bg-blue-500 text-white hover:border-2 hover:border-blue-300 hover:bg-blue-900 transition-colors'>
                            Delete {car.year} {car.make} {car.model}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <CustomModal
                isOpen={editModalIsOpen}
                onClose={closeEditModal}
                contentLabel="Edit Car"
                className="modal"
                style={{ width: '80%' }}
                overlayClassName="modal-overlay"

                onConfirm={() => { }}
            >
                <EditCarForm closeModal={closeEditModal} carData={car} />
            </CustomModal>
            <CustomModal
                isOpen={deleteModalIsOpen}            >
                <div className="modal-body flex justify-center">
                    <h1 className='block font-bold'>Are you sure you want to delete this car?</h1>
                </div>
                <div className="modal-body flex justify-center">
                    <h2 className=' font-bold block text-xl'>{car.year} {car.make} {car.model}</h2>
                </div>
                <div className="modal-footer">
                    <button onClick={handleDelete} className="modal-button bg-red-500 text-white hover:bg-red-700">Confirm</button>
                    <button onClick={closeDeleteModal} className="modal-button bg-gray-500 text-white hover:bg-gray-700">Cancel</button>
                </div>
                <div className="modal-body font-bold flex justify-center">
                    <p className='block text-base'><i>* You will have to manually add this vehicle again to restore it once it is deleted * </i></p>
                </div>
            </CustomModal>
        </>
    );
};

const UpdateCarList = ({ cars }) => {
    return (
        <>
            <div className="flex flex-wrap justify-center">
                {Object.keys(cars).map(key => (
                    <UpdateCarCard key={key} car={cars[key]} />
                ))}
            </div>
        </>
    );
};

export default UpdateCarList;