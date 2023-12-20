"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductSwiper = ({ images }: any) => {
    return (
        <ProductSwiperConstant images={images} />
        // <ProductSwiperJS images={images} />
    )
}

export default ProductSwiper

const ProductSwiperConstant = ({ images }: any) => {
    return (
        <div className="flex flex-col gap-2">
            <Image
            src={images[0]}
            alt={images[0]}
            width={500}
            height={500}
            className="aspect-[1/1] object-cover"
            />
            <div className="flex gap-2 justify-center">
                {images.map((image: any, index: number) => (
                    <Image
                        key={index}
                        src={image}
                        alt={image}
                        width={100}
                        height={100}
                        className="aspect-[1/1] object-cover"
                    />
                ))}
            </div>
        </div>
    )
}

const ProductSwiperJS = ({ images }: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true, // Tampilkan dots untuk navigasi
    infinite: true, // Looping slideshow
    slidesToShow: 1, // Tampilkan 1 gambar utama
    slidesToScroll: 1, // Geser 1 gambar per kali
    arrows: false, // Optional: Tampilkan panah navigasi
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  return (
    <div className="flex flex-col gap-2">
      <Slider {...settings}>
        {images.map((image: string, index: number) => (
          <div key={index} className="aspect-[1/1] object-cover">
            <img src={image} alt={image} width={500} height={500} />
          </div>
        ))}
      </Slider>

      <div className="flex gap-2 justify-center">
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={image}
            width={100}
            height={100}
            className="aspect-[1/1] object-cover"
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}