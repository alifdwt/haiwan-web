import { Shell } from "lucide-react";
import { Products } from "@/constants/dummy";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";

const TrendingProducts = () => {
  const productWithHighestRatingCount = Products.reduce((acc, product) => {
    if (product.rating.count > acc.rating.count) {
      return product;
    }
    return acc;
  }, Products[0]);
  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Trending Products</h2>
      </div>
      {/* trending products */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[.75fr_1fr_1fr] gap-4 mt-4">
        <Card className="row-span-3">
          <CardHeader>
            <div className="text-center ">
              <p className="uppercase mb-2">Offer ends at</p>
              <ul className="flex gap-4 justify-center items-center">
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  1
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  15
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  27
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  60
                </li>
              </ul>
            </div>
          </CardHeader>
          <CardContent>
            <Image
              src={productWithHighestRatingCount.image}
              alt={productWithHighestRatingCount.title}
              width={200}
              height={200}
              className="w-full"
            />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center mt-2">
                <Progress
                  value={(productWithHighestRatingCount.rating.rate / 5) * 100}
                  className="w-[50%]"
                />
                <p className="text-secondaryDark">
                  {productWithHighestRatingCount.rating.count}
                </p>
              </div>
              <h2 className="font-bold">
                {productWithHighestRatingCount.title}
              </h2>
              <div className="flex gap-4 items-center">
                <h3 className="font-bold text-primary">
                  ${productWithHighestRatingCount.price}
                </h3>
                <h5 className="text-secondaryDark text-xs line-through">
                  ${productWithHighestRatingCount.price * 1.5}
                </h5>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs">
                  Stock:{" "}
                  <span className="text-secondaryDark font-bold">107</span>
                </p>
                <p className="text-xs">
                  Sold: <span className="text-secondaryDark font-bold">15</span>
                </p>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>
        {Products.slice(0, 6).map((product) => (
          <div className="flex" key={product.id}>
            <div className="w-[130px] h-[160px]">
              <Image
                src={product.image}
                alt="image gambar"
                width={130}
                height={160}
                className="w-[130px] h-[160px]"
              />
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <h2 className="font-semibold">{product.title}</h2>
              <div className="flex gap-2 items-center mt-2">
                <Progress
                  value={(product.rating.rate / 5) * 100}
                  className="w-[50%]"
                />
                <p className="text-secondaryDark">{product.rating.count}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h3 className="font-bold text-primary">${product.price}</h3>
                <h5 className="text-secondaryDark text-xs line-through">
                  ${product.price * 1.5}
                </h5>
              </div>
              <p className="text-xs text-gray-500">260 sold</p>
              <p className="text-xs text-gray-500">Free Shipping</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
