"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export const ProductSwiperJS = ({ images }: any) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {images.map((image: any, index: number) => (
            <CarouselItem key={index}>
              <Link href={image}>
                <Image
                  src={image}
                  alt={image}
                  width={500}
                  height={500}
                  className="aspect-[1/1] object-cover w-full"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2" />
        <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2" />
      </Carousel>
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
  );
};
