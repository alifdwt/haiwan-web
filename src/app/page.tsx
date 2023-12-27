import FeaturedProducts, {
  FeaturedSkeleton,
} from "@/components/homepage/featured";
import Hero from "@/components/homepage/hero";
import TrendingProducts from "@/components/homepage/trending";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingProducts />
      <FeaturedProducts />
    </>
  );
}
