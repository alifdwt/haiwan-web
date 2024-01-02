"use client";

import { Button } from "@/components/ui/button";
import AddressForm, { AddressFormValues } from "./address-form";
import { cn } from "@/lib/utils";
import { MapPin, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressPage() {
  const { data: session }: any = useSession();
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState<AddressFormValues[]>([]);

  useEffect(() => {
    const getAddresses = async () => {
      setFetching(true);
      try {
        const response = await fetch(
          `/api/address?creator=${session?.user?.id}`
        );
        const data = await response.json();
        setAddresses(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    getAddresses();
  }, [session?.user?.id]);

  const createAddress = async (data: AddressFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/address/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, creator: session?.user?.id }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateAddress = async (data: AddressFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/address/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId: session?.user?.id }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="m-7">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Input placeholder="Search" />
          <Button>Search</Button>
        </div>
        <AddressForm
          session={session}
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          }
          type="Add"
          onSubmit={createAddress}
          submitting={submitting}
        />
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {fetching ? (
          <Skeleton className="h-10 w-full" />
        ) : addresses === undefined ? (
          <p>No address found</p>
        ) : (
          addresses.map((address) => (
            <AddressForm
              session={session}
              key={address._id}
              address={address}
              type="Edit"
              trigger={<AddressCard address={address} />}
              onSubmit={updateAddress}
              submitting={submitting}
            />
          ))
        )}
      </ul>
    </div>
  );
}

const AddressCard = ({ address }: { address: any }) => {
  return (
    <li key={address._id}>
      <div
        className={cn(
          "flex flex-col border-2 p-2 cursor-pointer",
          address.is_primary ? "border-primary" : ""
        )}
      >
        <div className="flex gap-2">
          <p className="font-semibold text-gray-400">{address.address_name}</p>
          {address.is_primary ? (
            <p className="bg-primary text-white px-1 rounded text-sm font-bold">
              Primary
            </p>
          ) : (
            ""
          )}
        </div>
        <p className="font-bold">{address.recipient}</p>
        <p>{address.phone}</p>
        <p>
          {address.address}, {address.city.name}, {address.province.name}{" "}
          {address.postcode}
        </p>
        {address.note && <p>({address.note})</p>}
        {address.coordinates && (
          <div className="flex gap-2 items-center mt-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <p>Already Pinpointed</p>
          </div>
        )}
      </div>
    </li>
  );
};
