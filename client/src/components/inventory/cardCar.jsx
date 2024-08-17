import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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
import '../../styles/inventory.css';
import { useQuery } from "@apollo/client";
import { GET_CARS } from "@/utils/queries";
import ModalCar from './modalCarCard';
import { formatPrice } from "../../utils/helpers";


function CarCard() {
    const { loading, error, data } = useQuery(GET_CARS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    if (loading) return (
        <div className="loading flex">
            <p className='loading-text'>Loading...</p>
        </div>
    );
    if (error) return (
        <div className="loading flex">
            <p className="loading-text">Error: {error.message}</p>
        </div>
    );
    const cars = data.cars;

    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    return (
        <Card className="max-w-5xl md:p-4 shadow-md mx-auto mt-2">
            <CardHeader>
                {cars.map((car, index) => (
                    <div key={index} className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="hover:scale-105  transition-transform duration-300 relative">
                            <Carousel className="rounded-xl ">
                                {car.images.map((image, index) => (
                                    <div key={index} className="overflow-hidden relative h-full w-full carousel-slide">
                                        <img src={image} alt="image 1" className="h-96 w-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                            <Button className="absolute right-1 bottom-0 lg:bottom-4 lg:left-1/2 transform lg:-translate-x-1/2 mb-4 h-10 w-24 bg-red-600 border border-1 border-gray-700 text-white rounded-full flex items-center justify-center text-sm md:text-base" onClick={() => handleOpenModal(car)}>
                                Details
                            </Button>

                        </div>
                        <div className="flex flex-col justify-evenly space-y-4 md:ml-2">
                            <CardTitle className="tracking-normal text-base md:text-lg">{car.year} {car.make} {car.model}</CardTitle>
                            {car.description ? (
                                <CardDescription >
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faExclamationCircle} className="hiddenIcon mr-2 h-4 w-4 opacity-70" />
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
                                            <li><strong>Make: </strong>{car.make}</li>
                                            <li><strong>Model: </strong>{car.model}</li>
                                            <li><strong>Year: </strong>{car.year}</li>
                                            {car.color ? (<li><strong>Color: </strong>{car.color}</li>) : ''}
                                            {car.trim ? (<li><strong>Trim: </strong>{car.trim}</li>) : ''}
                                            {car.vehicleType ? (<li><strong>Vehicle Type: </strong>{car.vehicleType}</li>) : ''}
                                        </ul>
                                        <ul className="flex flex-col text-left space-y-2">
                                            {/* <li><strong>Stock: </strong>{car.stock}</li> */}
                                            {car.engine ? (<li><strong>Engine Size: </strong>{car.engine}</li>) : ''}
                                            {car.engineType ? (<li><strong>Engine Type: </strong>{car.engineType}</li>) : ''}
                                            {car.transmission ? (<li><strong>Transmission: </strong>{car.transmission}</li>) : ''}
                                            {car.mileage ? (<li><strong>Mileage: </strong>{car.mileage}</li>) : ''}
                                            {car.driveTrain ? (<li><strong>Drive Train: </strong>{car.driveTrain}</li>) : ''}

                                        </ul>
                                    </div>
                                    <div className="flex flex-col sm:mt-4 w-full space-y-2 items-center">
                                        {car.retail_price ? (
                                            <Button className="w-full bg-gray-400 text-white hover:bg-blue-900 hover:border-blue-300 transition-colors">
                                                Retail Price: ${formatPrice(car.retail_price)}
                                            </Button>
                                        ) : ''}
                                        {car.asking_price ? (
                                            <Button className="w-full bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-300 transition-colors">
                                                Asking Price: ${formatPrice(car.asking_price)}
                                            </Button>
                                        ) : ''}
                                    </div>
                                </div>

                            </CardContent>
                        </div>
                        <CardFooter>
                            {/* <div className="flex flex-col sm:flex-row justify-evenly items-center w-full"> */}
                            {/* <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">View</Button> */}
                            {/* <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">Buy</Button> */}
                            {/* <Button className="w-full sm:w-auto bg-red-400 text-white hover:bg-blue-700 transition-colors" onClick={() => handleOpenModal(car)}>Details</Button> */}
                            {/* </div> */}
                        </CardFooter>
                    </div>
                ))}
            </CardHeader>
            <ModalCar isOpen={isModalOpen} onClose={handleCloseModal} carInfo={selectedCar} />
        </Card>
    );
};

export default CarCard;

