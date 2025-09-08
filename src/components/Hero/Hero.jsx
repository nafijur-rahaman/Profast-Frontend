import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";

const Hero = () => {
  return (
    <div className="mt-10 max-w-screen-xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={true}
        className="rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative">
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-[450px] object-cover"
          />
        </div>

        <div className="relative">
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-[450px] object-cover"
          />
        </div>

        <div className="relative">
          <img
            src={banner3}
            alt="Banner 3"
            className="w-full h-[450px] object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
