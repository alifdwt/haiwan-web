"use client";

import { useShoppingCart } from "@/context/shoppingCartContext";
import { z } from "zod";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

// export function AddToCart({ id }: { id: string }) {
//   const [quantities, setQuantities] = useState(0);
//   const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
//     useShoppingCart();
//   const quantity = getItemQuantity(id);
//   const form = useForm<z.infer<typeof addToCartSchema>>({
//     resolver: zodResolver(addToCartSchema),
//     defaultValues: {
//       quantity: 1,
//     },
//   });

//   function onSubmit(values: z.infer<typeof addToCartSchema>) {
//     setQuantities(values.quantity);
//     increaseCartQuantity(id.repeat(quantities));
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex gap-2 items-center"
//       >
//         <FormField
//           control={form.control}
//           name="quantity"
//           render={({ field }) => (
//             <FormItem className="w-[30%]">
//               <FormControl>
//                 <Input {...field} type="number" className="text-center" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           type="submit"
//           variant={"secondary"}
//           className="w-[70%] flex gap-2 text-white rounded-full"
//         >
//           <ShoppingCart className="h-5 w-5" />
//           Add to cart
//         </Button>
//       </form>
//     </Form>
//   );
// }

export function AddToCart({ id }: { id: string }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <>
      {quantity === 0 ? (
        <Button
          variant={"secondary"}
          className="w-full flex gap-2 text-white rounded-full"
          onClick={() => increaseCartQuantity(id)}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to cart
        </Button>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2 items-center justify-center">
            <Button
              onClick={() => decreaseCartQuantity(id)}
              variant={"secondary"}
              className="w-full flex gap-2 text-white rounded-full"
            >
              -
            </Button>
            <div>
              <span>{quantity}</span> in cart
            </div>
            <Button
              onClick={() => increaseCartQuantity(id)}
              variant={"secondary"}
              className="w-full flex gap-2 text-white rounded-full"
            >
              +
            </Button>
          </div>
          <Button
            onClick={() => removeFromCart(id)}
            variant={"destructive"}
            className="w-full flex gap-2 text-white rounded-full"
          >
            Remove
          </Button>
        </div>
      )}
    </>
  );
}
