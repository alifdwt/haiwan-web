"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addressFormSchema = z.object({
  _id: z.string().optional(),
  // creator: z.string().min(1),
  address_name: z.string().min(1),
  recipient: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  phone: z.string().min(1),
  postcode: z.string().min(1),
  address: z.string().min(1),
  note: z.string().min(1),
  coordinates: z.string().optional(),
  is_primary: z.boolean().default(false),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

export const AddressForm = ({
  address,
  trigger,
  type,
  onSubmit,
  submitting,
}: {
  address?: AddressFormValues;
  trigger: any;
  type: string;
  onSubmit: (values: AddressFormValues) => void;
  submitting: boolean;
}) => {
  const defaultValues = {
    address_name: address?.address_name || "",
    recipient: address?.recipient || "",
    city: address?.city || "",
    province: address?.province || "",
    phone: address?.phone || "",
    postcode: address?.postcode || "",
    address: address?.address || "",
    note: address?.note || "",
    coordinates: address?.coordinates || "",
    is_primary: address?.is_primary || false,
  };

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // const [submitting, setSubmitting] = useState(false);
  // const createAddress = async (data: AddressFormValues) => {
  //   setSubmitting(true);
  //   try {
  //     console.log({ ...data, userId: session?.user?.id });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} address</DialogTitle>
          <DialogDescription>{type} your address here</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="address_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Address Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipient" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinates</FormLabel>
                  <FormControl>
                    <Input placeholder="Coordinates" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_primary"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Set this address as primary
                    </FormLabel>
                    <FormDescription>
                      This will be the default address
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
