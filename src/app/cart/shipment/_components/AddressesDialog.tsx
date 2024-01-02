import { AddressFormValues } from "@/app/settings/address/address-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default function AddressesDialog({
  addresses,
}: {
  addresses: IAddress[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Choose Another Address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Another Address</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            quidem!
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Search" />
        <div className="flex flex-col gap-2 h-[500px] overflow-auto">
          {addresses.map((address, index) => (
            <AddressCard key={index} address={address} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const AddressCard = ({ address }: { address: IAddress }) => {
  return (
    <li className="list-none">
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
