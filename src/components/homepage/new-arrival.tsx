"use client";

import { heroDummy } from "@/constants/dummy";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

const NewArrival = () => {
  // const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      // className="w-full"
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {heroDummy.map((item: { src: string; alt: string }, index: number) => (
          <CarouselItem key={index}>
            <Link href={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={100}
                className="w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary border-primary text-white" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary border-primary text-white" />
    </Carousel>
  );
};

export default NewArrival;
