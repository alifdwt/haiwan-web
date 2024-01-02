// "use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddressesDialog from "./AddressesDialog";

export type AddressesResponse = {
  status: number;
  message: string;
  data: IAddress[];
};

export default function AddressList({
  addresses,
}: {
  addresses: AddressesResponse;
}) {
  const primaryAddress = addresses?.data.find((address) => address.is_primary);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold">Shipping Address</h4>
      <Separator />
      <div className="">
        <h5>
          <span className="font-bold">{primaryAddress?.recipient}</span> (
          {primaryAddress?.address_name}){" "}
          {primaryAddress?.is_primary && (
            <span className="bg-primary p-0.5 rounded text-white">Primary</span>
          )}
        </h5>
        <p>{primaryAddress?.phone}</p>
        <p className="text-sm text-gray-500">
          {primaryAddress?.address} ({primaryAddress?.note})
        </p>
        <p className="text-sm text-gray-500">
          {primaryAddress?.city.name}, {primaryAddress?.province.name},
          {primaryAddress?.postcode}
        </p>
      </div>
      <Separator />
      <div className="flex gap-2">
        <AddressesDialog addresses={addresses?.data || []} />
        <Button variant="outline">Add New Address</Button>
      </div>
    </div>
  );
}
