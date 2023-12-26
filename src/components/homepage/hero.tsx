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
      src: "https://res.cloudinary.com/dxirtmo5t/image/upload/v1703140193/Haiwan/Commerce/3266488_481599-PH02V3-636_kglmjb.jpg",
      alt: "Hero-1",
    },
    {
      src: "https://res.cloudinary.com/dxirtmo5t/image/upload/v1703140194/Haiwan/Commerce/17877031_5925412_qbntme.jpg",
      alt: "hero-2",
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
        loop={true}
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={960}
              height={540}
              className="aspect-[21/9] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
