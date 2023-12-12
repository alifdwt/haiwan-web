import { Shell } from "lucide-react";

const FeaturedProducts = () => {
  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Featured Products</h2>
      </div>
    </div>
  );
};

export default FeaturedProducts;
