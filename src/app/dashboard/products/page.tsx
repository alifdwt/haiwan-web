import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
  const res = await fetch("http://localhost:3000/api/p", {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ProductsDashboard = async () => {
  const products = await getData();

  return (
    <div className="max-w-screen-xl mx-auto my-5 p-3">
      <h1 className="text-3xl font-bold">Products Dashboard</h1>
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        ratione, assumenda quisquam totam mollitia dolor amet harum fugit magnam
        possimus accusamus omnis laborum saepe eos ea qui dicta ducimus
        distinctio praesentium doloribus labore quo! Ut tempore necessitatibus
        laudantium nihil eligendi amet nostrum magni eaque quis officia veniam
        expedita, sunt quos?
      </p>
      <div className="mx-auto py-10">
        <DataTable columns={columns} data={products.data} />
      </div>
    </div>
  );
};

export default ProductsDashboard;
