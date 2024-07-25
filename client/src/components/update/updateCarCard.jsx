import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import carPlaceholder from "@/assets/images/placeholder-car.png";

const cars = {
    "car1": {
        "name": "2024 Tesla Model S",
        "make": "Tesla",
        "model": "Model S",
        "year": 2023,
        "description": "The Tesla Model S is a high-performance electric sedan known for its impressive range, cutting-edge technology, and sleek design. It offers a luxurious interior with advanced autopilot features and fast acceleration.",
        "price": 89999,
        "mileage": "0",
        "color": "Midnight Silver Metallic",
        "engine": "Electric",
        "transmission": "Automatic",
        "doors": 4,
        "seats": 5,
        "features": [
            "Autopilot",
            "Navigation System",
            "Bluetooth Connectivity",
            "Heated Seats",
            "Sunroof",
            "Backup Camera",
            "Leather Upholstery",
            "Premium Sound System"
        ],
        "images": [
            carPlaceholder,
        ]
    },
    "car2": {
        "name": "2019 Ford Mustang",
        "make": "Ford",
        "model": "Mustang",
        "year": 2022,
        "description": "The Ford Mustang is a classic American muscle car known for its powerful performance and iconic design. It delivers an exhilarating driving experience with its robust engine and sporty handling.",
        "price": 55999,
        "mileage": "12000",
        "color": "Race Red",
        "engine": "5.0L V8",
        "transmission": "Manual",
        "doors": 2,
        "seats": 4,
        "features": [
            "Performance Package",
            "Touchscreen Display",
            "Apple CarPlay",
            "Heated and Ventilated Seats",
            "Rearview Camera",
            "Leather Seats",
            "Premium Sound System"
        ],
        "images": [
            carPlaceholder,
        ]
    },
    "car3": {
        "name": "2023 Toyota Camry",
        "make": "Toyota",
        "model": "Camry",
        "year": 2021,
        "description": "The Toyota Camry is a reliable and efficient midsize sedan that offers a comfortable ride, spacious interior, and advanced safety features. It's perfect for both daily commuting and long-distance travel.",
        "price": 27999,
        "mileage": "15000",
        "color": "Super White",
        "engine": "2.5L 4-Cylinder",
        "transmission": "Automatic",
        "doors": 4,
        "seats": 5,
        "features": [
            "Adaptive Cruise Control",
            "Lane Departure Warning",
            "Touchscreen Display",
            "Bluetooth Connectivity",
            "Rearview Camera",
            "Cloth Seats",
            "Dual-Zone Climate Control"
        ],
        "images": [
            carPlaceholder,
        ]
    },
    "car4": {
        "name": "2018 Chevrolet Tahoe",
        "make": "Chevrolet",
        "model": "Tahoe",
        "year": 2020,
        "description": "The Chevrolet Tahoe is a full-size SUV that offers a spacious interior, powerful engine options, and advanced safety features. It's perfect for families and those who need extra cargo space.",
        "price": 49999,
        "mileage": "30000",
        "color": "Black",
        "engine": "5.3L V8",
        "transmission": "Automatic",
        "doors": 4,
        "seats": 7,
        "features": [
            "Navigation System",
            "Rear-Seat Entertainment",
            "Bluetooth Connectivity",
            "Heated and Ventilated Seats",
            "Backup Camera",
            "Leather Seats",
            "Premium Sound System"
        ],
        "images": [
            carPlaceholder,
        ]
    },
    "car5": {
        "name": "2020 Honda Civic",
        "make": "Honda",
        "model": "Civic",
        "year": 2023,
        "description": "The Honda Civic is a compact car known for its fuel efficiency, reliable performance, and modern design. It offers a comfortable ride with a well-appointed interior and advanced technology features.",
        "price": 23999,
        "mileage": "0",
        "color": "Lunar Silver Metallic",
        "engine": "2.0L 4-Cylinder",
        "transmission": "CVT",
        "doors": 4,
        "seats": 5,
        "features": [
            "Adaptive Cruise Control",
            "Apple CarPlay",
            "Android Auto",
            "Bluetooth Connectivity",
            "Rearview Camera",
            "Cloth Seats",
            "Dual-Zone Climate Control"
        ],
        "images": [
            carPlaceholder,
        ]
    }
};

const UpdateCarCard = ({ car }) => {
    return (
        <Card className="mt-3 ml-0 mr-0">
            <CardHeader>
                <CardTitle className="tracking-normal">{car.name}</CardTitle>
                <CardDescription>
                    <div className="flex items-center pt-1">
                        {/* <FontAwesomeIcon icon={faExclamationCircle} className="hiddenIcon mr-2 h-4 w-4 opacity-70" /> */}
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
                            <Button className="sm:w-full w-full bg-blue-500 text-white hover:bg-blue-700 transition-colors">
                                Price: ${car.price}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </CardHeader>
            <CardFooter>
                <div className="flex flex-col sm:flex-row justify-evenly items-center w-full gap-8">
                    <Button className='sm:w-full lg:w-1/2 bg-blue-500 text-white hover:bg-blue-700 transition-colors'>Edit</Button>
                    <Button className='sm:w-full lg:w-1/2 bg-blue-500 text-white hover:bg-blue-700 transition-colors'>Delete</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const UpdateCarList = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {Object.keys(cars).map(key => (
                <UpdateCarCard key={key} car={cars[key]} />
            ))}
        </div>
    );
};

export default UpdateCarList;