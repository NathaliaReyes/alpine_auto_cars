import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

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

import '../../styles/inventory.css';

// Array of Cars for now, will be rreplaced with API call, we need to set up mutations and queries for this to work
const carInfo = {
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

const CarCard = ({ car }) => {
    return (
        <Card className="mt-3 ml-0 mr-0">
            <CardHeader>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="hover:scale-105  transition-transform duration-300">
                        <a href="#">
                            <img src={car.images[0]} alt={`${car.name}`} className="w-full h-auto object-cover rounded overflow-hidden hover:scale-100 hover:shadow-lg transition-transform duration-300 mb-5 border-4 border-white" />
                        </a>
                    </div>
                    <div className="flex flex-col justify-evenly space-y-4">
                        <CardTitle className="tracking-normal">{car.name}</CardTitle>
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
                    </div>
                </div>
            </CardHeader>
            <CardFooter>
                <div className="flex flex-col sm:flex-row justify-evenly items-center w-full">
                    <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">View</Button>
                    <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors mb-1 sm:mb-0">Buy</Button>
                    <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-700 transition-colors">Details</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const CarList = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {Object.keys(carInfo).map(key => (
                <CarCard key={key} car={carInfo[key]} />
            ))}
        </div>
    );
}

export default CarList;



// return (
//     // <div className="  flex justify-center items-center sm:flex-row ">
//     <Card className=" mt-3 ml-0 mr-0 " >
//         <CardHeader>
//             {/* Flex container for image and text */}
//             <div className="flex ">
//                 {/* Div for the image */}
//                 <div className="md:w-1/3 lg:w-1/2 hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-5 border-4 border-white">
//                     <a>
//                         <img src={car1} alt="car1" className="w-full h-auto object-cover" />
//                     </a>
//                 </div>
//                 {/* Div for the text */}
//                 <div className="md:w-1/3 lg:w-1/2 flex flex-col justify-between ml-4">
//                     <CardTitle>Tesla Model S</CardTitle>
//                     <CardDescription>
//                         <div className="flex items-center pt-2">
//                             <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-4 w-4 opacity-70" />
//                             <span className="text-xs text-muted-foreground">
//                                 Important Details
//                             </span>
//                         </div>
//                     </CardDescription>
//                     <CardContent>
//                         <div className="flex justify-between">
//                             <div className="flex-1 mr-8">
//                                 <ul className="flex flex-col text-left">
//                                     <li>Make: Tesla</li>
//                                     <li>Car Model</li>
//                                     <li>Car Year</li>
//                                     <li>Car Price</li>
//                                 </ul>
//                             </div>
//                             <div className="flex-1 ml-8">
//                                 <ul className="flex flex-col text-left">
//                                     <li>Car Name</li>
//                                     <li>Car Model</li>
//                                     <li>Car Year</li>
//                                     <li>Car Price</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </div>
//             </div>
//         </CardHeader>
//         <CardFooter>
//             <div className="flex justify-evenly items-center w-full">
//                 <Button className="outline-dashed">View</Button>
//                 <Button className="outline-dotted">Buy</Button>
//                 <Button className="outline-double">Details</Button>
//             </div>
//         </CardFooter>
//     </Card>
//     // </div>


// )

