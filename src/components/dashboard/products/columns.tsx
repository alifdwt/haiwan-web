"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToRupiah } from "@/components/util/currency";
import { productsDummy } from "@/constants/dummy";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import Image from "next/image";
import FormDashboard from "../form";
import { Switch } from "@/components/ui/switch";

const columns: ColumnDef<IProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "image",
    cell: ({ row }) => (
      <Image
        src={row.original.imageData[0].image}
        alt="image"
        width={50}
        height={50}
        className="object-cover aspect-square"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("title")}
        <p className="text-xs text-gray-500">#{row.original._id}</p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{ToRupiah(row.getValue("price"))}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock*",
    cell: ({ row }) => (
      <div className="capitalize">{Math.floor(Math.random() * 100)}</div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active*",
    cell: ({ row }) => <Switch checked />,
  },
  {
    id: "action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <FormDashboard
          type="Edit"
          product={row.original}
          setPost={() => {}}
          submitting={false}
          handleSubmit={() => {}}
        />
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
];

export default columns;
