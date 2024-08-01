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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
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
        <Card className="mt-3 ml-0 mr-0">
            <CardHeader>
                {cars.map((car, index) => (
                    <div key={index} className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="hover:scale-105  transition-transform duration-300">
                            <Carousel className="rounded-xl ">
                                {car.images.map((image, index) => (
                                    <div key={index} className="overflow-hidden relative h-full w-full carousel-slide">
                                        <img src={image} alt="image 1" className="h-96 w-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="flex flex-col justify-evenly space-y-4">
                            <CardTitle className="tracking-normal">{car.year} {car.make} {car.model}</CardTitle>
                            <CardDescription >
                                <div className="flex items-center pt-1">
                                    <FontAwesomeIcon icon={faExclamationCircle} className="hiddenIcon mr-2 h-4 w-4 opacity-70" />
                                    <span className="text-sm text-left text-muted-foreground tracking-wide sm:ml-0.5">
                                        {car.description}
                                    </span>
                                </div>
                            </CardDescription>
                            <CardContent>
                                <div className="flex flex-col lg:flex-row justify-between p-0">
                                    <div className="md:flex justify-evenly w-full">
                                        <div className="w-full">
                                            <div className="grid sm:grid-cols-2 gap-4 hiddenList">
                                                <ul className="flex flex-col text-left space-y-2">
                                                    <li><strong>Make: </strong>{car.make}</li>
                                                    <li><strong>Model: </strong>{car.model}</li>
                                                    <li><strong>Year: </strong>{car.year}</li>
                                                    <li><strong>Price: </strong>${formatPrice(car.price)}</li>
                                                </ul>
                                                <ul className="flex flex-col text-left space-y-2">
                                                    <li><strong>Mileage: </strong>{car.mileage}</li>
                                                    <li><strong>Color: </strong>{car.color}</li>
                                                    <li><strong>Description: </strong>{car.description}</li>
                                                    <li><strong>Transmission: </strong>{car.transmission}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 sm:w-full md:mt-4 sm:mt-4 w-full">
                                        <Button className="sm:w-full w-full bg-blue-500 text-white hover:bg-blue-700 transition-colors">
                                            Price: ${formatPrice(car.price)}
                                        </Button>
                                    </div>
                                </div>

                            </CardContent>
                        </div>
                        <CardFooter>
                            <div className="flex flex-col sm:flex-row justify-evenly items-center w-full">
                                <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">View</Button>
                                <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">Buy</Button>
                                <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors" onClick={() => handleOpenModal(car)}>Details</Button>
                            </div>
                        </CardFooter>
                    </div>
                ))}
            </CardHeader>
            <ModalCar isOpen={isModalOpen} onClose={handleCloseModal} carInfo={selectedCar} />
        </Card>
    );
};

export default CarCard;

