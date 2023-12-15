"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto my-5">
      <div className="col-span-1 bg-primary">
        <h1 className="text-3xl font-bold text-white text-center">
          Ini buat kategori
        </h1>
      </div>
      <div className="col-span-2">
        <NewArrival />
      </div>
    </div>
  );
};

export default Hero;

const NewArrival = () => {
  const [images, setImages] = useState([
    {
      src: "https://images.pexels.com/photos/5319920/pexels-photo-5319920.jpeg",
      alt: "Pemandangan alam",
    },
    {
      src: "https://images.pexels.com/photos/1068819/pexels-photo-1068819.jpeg",
      alt: "Kota metropolitan",
    },
    {
      src: "https://images.pexels.com/photos/8395860/pexels-photo-8395860.jpeg",
      alt: "Bintang-bintang di langit malam",
    },
  ]);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            {/* <img
              src={image.src}
              className="w-[1000px] h-[500px] object-cover"
              alt=""
            /> */}
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={500}
              className="w-[1000px] h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
