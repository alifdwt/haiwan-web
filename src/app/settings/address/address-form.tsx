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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import citiesDummy from "@/constants/mocks/city";
import provincesDummy from "@/constants/mocks/province";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
export type ProvincesResponse = {
  rajaongkir: {
    query: [];
    status: {
      code: number;
      description: string;
    };
    results: IProvince[];
  };
};
export type CitiesResponse = {
  rajaongkir: {
    query: [];
    status: {
      code: number;
      description: string;
    };
    results: ICity[];
  };
};

export const AddressForm = ({
  address,
  session,
  trigger,
  type,
  onSubmit,
  submitting,
}: {
  address?: AddressFormValues;
  session: any;
  trigger: any;
  type: string;
  onSubmit: (values: AddressFormValues) => void;
  submitting: boolean;
}) => {
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [cities, setCities] = useState<ICity[]>(citiesDummy.rajaongkir.results);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const defaultValues = {
    creator: session?.user?.id,
    address_name: address?.address_name || "",
    recipient: session?.user?.name,
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

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          // "https://api.rajaongkir.com/starter/province?key=7abde95ef7cb7b9f3cd2770685085807"
          "/api/address/province",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch provinces: ${response.statusText}`);
        }
        const data: ProvincesResponse = await response.json();
        setProvinces(data.rajaongkir.results);
      } catch (error) {
        console.log("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async (provinceId: string) => {
      try {
        const response = await fetch(
          // `https://api.rajaongkir.com/starter/city?key=7abde95ef7cb7b9f3cd2770685085807&province=${provinceId}`
          `/api/address/city?province=${provinceId}`
        );
        const data: CitiesResponse = await response.json();
        setCities(data.rajaongkir.results);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedProvince !== "") {
      fetchCities(selectedProvince);
    }
  }, [selectedProvince]);

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
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setSelectedProvince(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces?.map((province) => (
                        <SelectItem
                          key={province.province_id}
                          value={province.province_id}
                        >
                          {province.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.city_id} value={city.city_id}>
                          {city.type} {city.city_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
