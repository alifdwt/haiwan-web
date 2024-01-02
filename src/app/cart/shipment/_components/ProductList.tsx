import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToRupiah } from "@/components/util/currency";
import Image from "next/image";
import { ProductWithQuantity } from "../page";

// async function getShippingCosts(city: string, weight: number, courier: string) {
//   const response = await fetch("https://api.rajaongkir.com/starter/cost", {
//     method: "POST",
//     headers: {
//       key: "7abde95ef7cb7b9f3cd2770685085807",
//     },
//     body: JSON.stringify({
//       origin: "501",
//       destination: city,
//       weight: weight,
//       courier: courier,
//     }),
//   });

//   if (!response.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   const data = await response.json();
//   return data;
// }

export default async function ProductList({
  cartProducts,
  totalPrice,
  destination,
}: {
  cartProducts: ProductWithQuantity[];
  totalPrice: number;
  destination: string;
}) {
  // const shippingCost = await getShippingCosts(destination, 1000, "jne");
  // console.log(shippingCost);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Image
          src={cartProducts[0].creator.image || ""}
          alt={cartProducts[0].creator.username || ""}
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="font-semibold">{cartProducts[0].creator.username}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          {cartProducts.map((product, index) => (
            <div key={index} className="flex gap-2">
              <div>
                <Image
                  src={product.imageData[0].image}
                  alt={product.title}
                  width={75}
                  height={75}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>{product.title}</p>
                <p className="text-sm">
                  {product.quantity} x {product.price}
                </p>
                <p className="text-sm">
                  Total:{" "}
                  <span className="font-semibold">
                    {ToRupiah(product.price * product.quantity)}
                  </span>
                </p>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{ToRupiah(totalPrice)}</p>
          </div>
        </div>
        <div className="col-span-1">
          <h4 className="font-semibold">Choose Shipment</h4>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Shipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="jne">JNE</SelectItem>
                <SelectItem value="tiki">TIKI</SelectItem>
                <SelectItem value="pos">Pos Indonesia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
