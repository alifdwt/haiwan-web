import Image from "next/image";
import { categoryDummy } from "@/constants/dummy";
import { ArrowRight, List } from "lucide-react";
import Link from "next/link";
import NewArrival from "./new-arrival";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto my-5">
      <div className="col-span-1">
        <div className="border rounded-t-lg">
          <div className="bg-primary rounded-t-lg text-white px-2 py-1 flex justify-between items-center">
            <div>
              <p className="font-bold">All Categories</p>
              <p>Total {categoryDummy.length} Categories</p>
            </div>
            <List />
          </div>
          {categoryDummy.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between pr-2 hover:bg-gray-300"
            >
              <Link
                href={`category/${item.name.toLowerCase().replace(" ", "-")}`}
                className="p-2 flex gap-2 items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={35}
                  height={35}
                />
                <p>{item.name}</p>
              </Link>
              <ArrowRight className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <NewArrival />
      </div>
    </div>
  );
};

export default Hero;
