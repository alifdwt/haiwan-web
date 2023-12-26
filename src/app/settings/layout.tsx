"use client";

import { SidebarNav } from "@/components/settings-page/sidebar";
import { Card, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SidebarNavItems = [
  {
    title: "General",
    href: "/settings",
  },
  {
    title: "Address",
    href: "/settings/address",
  },
  {
    title: "Payment",
    href: "/settings/payment",
  },
  {
    title: "Security",
    href: "/settings/security",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 my-5">
      <div className="col-span-1">
        <Card>
          <CardHeader className="flex gap-2">
            <Image
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-bold">{session?.user?.name}</p>
              <p className="text-sm">{session?.user?.email}</p>
            </div>
          </CardHeader>
        </Card>
      </div>
      <Card className="col-span-4">
        <SidebarNav items={SidebarNavItems} />
        {children}
      </Card>
    </div>
  );
}
