"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

const productFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title is too long" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  imageData: z.array(
    z.object({
      image: z.string().url({ message: "Invalid image url" }),
    })
  ),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

const defaultValues: Partial<ProductFormValues> = {
  title: "",
  description: "",
  price: "0",
  category: "",
  imageData: [{ image: "" }, { image: "" }],
};

export function FormProduct({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: ProductFormValues) => void;
  submitting: boolean;
}) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "imageData",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`imageData.${index}.image`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index === 0 ? "" : "sr-only")}>
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              append({ image: "" });
            }}
          >
            Add Image
          </Button>
        </div>
        <Button type="submit">{submitting ? "Submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}

const FormDashboard = ({ type, onSubmit, submitting }: any) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{type} Product</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{type} Product</SheetTitle>
          <SheetDescription>{type} your product.</SheetDescription>
        </SheetHeader>
        <FormProduct onSubmit={onSubmit} submitting={submitting} />
        {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save Changes</Button>
            </SheetClose>
          </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default FormDashboard;
