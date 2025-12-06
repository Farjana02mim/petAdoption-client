import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from "../assets/slide1.webp";
import slide2 from "../assets/slide2.avif";
import slide3 from "../assets/slide3.webp";
import slide4 from "../assets/slide4.webp"; // Make sure you have a 4th image

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "Find Your Furry Friend Today!",
      subtitle: "Connect with loving pets waiting for a forever home."
    },
    {
      id: 2,
      image: slide2,
      title: "Adopt, Don’t Shop",
      subtitle: "Give a pet a home — they deserve love and care."
    },
    {
      id: 3,
      image: slide3,
      title: "Every Pet Deserves Care",
      subtitle: "Discover trusted pet services and adoption options."
    },
    {
      id: 4,
      image: slide4,
      title: "Bring Joy Home",
      subtitle: "Adopt a pet and make a lifetime of memories together."
    }
  ];

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-75"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
