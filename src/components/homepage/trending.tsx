import { Shell } from "lucide-react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import TrendingSection from "./trending-section";

export type ProductsResponse = {
  status: number;
  message: string;
  data: IProduct[];
};

async function getProducts() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/p?limit=8`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

const TrendingProducts = async () => {
  const products = await getProducts();
  // const [fetching, setFetching] = useState(false);
  // const [products, setProducts] = useState<ProductsResponse>();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     setFetching(true);
  //     try {
  //       const response = await fetch("/api/p?limit=8");
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setFetching(false);
  //     }
  //   };
  //   getProducts();
  // }, []);

  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Trending Products</h2>
      </div>

      {/* {products !== null ? (
        <TrendingSection products={products} />
      ) : (
        <TrendingSkeleton value={8} />
      )} */}
      {products === undefined ? (
        <TrendingSkeleton value={8} />
      ) : (
        <TrendingSection products={products} />
      )}
    </div>
  );
};

export default TrendingProducts;

// export async function getServerSideProps() {
//   const res = await fetch("/api/p?limit=8");
//   const response = await res.json();
//   console.log(response);

//   return { props: { products: response } };
// }

export const TrendingSkeleton = ({ value }: { value: number }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr_1fr] mt-4">
      <Card className="col-span-1 row-span-4">
        <CardHeader>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <Skeleton className="h-96 w-full rounded-md" />
        <CardFooter className="flex flex-col gap-4 justify-between p-1 h-[120px]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
      {[...Array(value)].map((_, index) => (
        <div key={index} className="flex p-4 rounded-lg m-1">
          <div className="w-[100px] h-[120px]">
            <Skeleton className="w-[100px] h-[120px] rounded-md" />
          </div>
          <div className="flex flex-col gap-2 ml-4 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
