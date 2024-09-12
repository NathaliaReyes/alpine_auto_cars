import { Carousel, Typography, Rating } from "@material-tailwind/react";
import BgTest from "../../../../assets/images/bg-route.jpg";
import '../../../../styles/fonts.css';

export default function CarouselTestimonials() {
  return (
    <div className=" justify-center items-center p-4">
      <h2 className="text-xl font-bold text-center text-gray-800 my-4 roboto700">Customer Testimonials</h2>
      <Carousel className="rounded-xl ">
      <div className="relative h-full w-full ">
          <img
            src={BgTest}
            alt="image background testimonial"
            className="h-80 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h2"
                color="white"
                className="mb-4 lg:text-xl md:text-lg sm:text-base text-base mt-2 roboto600"
              >
                "M.R. ~ Bayfield, CO"
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-5 lg:text-xl md:text-lg sm:text-base text-base opacity-80"
                style={{ fontFamily: 'Abel' }}
              >
                "They are fair and honest guys. Scott made sure the vehicle we bought was 
                in good shape, everything was in working order and he was very accommodating.
                 It was a great place to buy my son's first car. We will come back again!"
              </Typography>
              <Rating className="mb-10" value={5} readonly />
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src={BgTest}
            alt="image background testimonial"
            className="h-80 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h2"
                color="white"
                className="mb-4 lg:text-xl md:text-lg sm:text-base text-base mt-2 roboto600"
              >
                "Dj Lybarger. ~ Bayfield, CO"
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-5 lg:text-xl md:text-lg sm:text-base text-base opacity-80"
                style={{ fontFamily: 'Abel' }}
              >
                "I personally would recommend this business to anybody looking for a 
                used vehicle! We just picked up our 2nd Truck from Chris and Scott with 
                Alpine Auto Sales and we could not be happier. After getting our 1st 
                vehicle from them, we were so pleased with the service and the quality
                 of the vehicle we decided to get a work Truck from them."
              </Typography>
              <Rating className="mb-10" value={5} readonly />
            </div>
          </div>
        </div>
        
        <div className="relative h-full w-full">
          <img
            src={BgTest}
            alt="image background testimonial"
            className="h-80 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h2"
                color="white"
                className="mb-4 lg:text-xl md:text-lg sm:text-base text-base mt-2 roboto600"
              >
                "Brandi Pemble. ~ Bayfield, CO"
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-5 lg:text-xl md:text-lg sm:text-base text-xl opacity-80"
                style={{ fontFamily: 'Abel' }}
              >
                "The crew is top notch they went above and beyond any other dealerships 
                I've ever had! Thank you sooo much for being dabomb!!!"
              </Typography>
              <Rating className="mb-10" value={5} readonly />
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src={BgTest}
            alt="image background testimonial"
            className="h-80 w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h2"
                color="white"
                className="mb-4 lg:text-xl md:text-lg sm:text-base text-base mt-2 roboto600"
              >
                "LeRoy Holley. ~ Bayfield, CO"
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-5 lg:text-xl md:text-lg sm:text-base text-sm opacity-80"
                style={{ fontFamily: 'Abel' }}
              >
                "Friendly, Courteous, Fair. Traded in a couple of vehicles for a couple 
                of newer vehicles. Got good deals all around."
              </Typography>
              <Rating className="mb-10" value={5} readonly />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}