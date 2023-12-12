import FeaturedProducts from "@/components/homepage/featured";
import TrendingProducts from "@/components/homepage/trending";

export default function Home() {
  return (
    <>
      <TrendingProducts />
      <FeaturedProducts />
    </>
  );
}
