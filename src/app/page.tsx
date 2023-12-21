import FeaturedProducts, {
  FeaturedSkeleton,
} from "@/components/homepage/featured";
import Hero from "@/components/homepage/hero";
import TrendingProducts from "@/components/homepage/trending";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [trending, setTrending] = useState<IProduct[]>([]);
  // const [trendFetching, setTrendFetching] = useState(false);

  // const [featured, setFeatured] = useState<IProduct[]>([]);
  // const [featFetching, setFeatFetching] = useState(false);

  // useEffect(() => {
  //   const getTrending = async () => {
  //     setTrendFetching(true);
  //     try {
  //       const response = await fetch("/api/p?limit=8");
  //       const data = await response.json();
  //       setTrending(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setTrendFetching(false);
  //     }
  //   };
  //   getTrending();

  //   const getFeatured = async () => {
  //     setFeatFetching(true);
  //     try {
  //       const response = await fetch("/api/p?limit=8");
  //       const data = await response.json();
  //       setFeatured(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setFeatFetching(false);
  //     }
  //   };
  //   getFeatured();
  // });

  return (
    <>
      <Hero />
      <TrendingProducts />
      {/* {featFetching ? (
        <FeaturedSkeleton value={8} />
      ) : (
        <FeaturedProducts products={featured} />
      )} */}
      <FeaturedProducts />
    </>
  );
}
