"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralForm from "./general-form";
import { useSession } from "next-auth/react";
import AddressPage from "./address/page";
import { Separator } from "@/components/ui/separator";

export default function SettingPage() {
  const { data: session } = useSession();
  return (
    // <Tabs defaultValue="general">
    //   <TabsList className="grid w-full grid-cols-5">
    //     <TabsTrigger value="general">General</TabsTrigger>
    //     <TabsTrigger value="address">Address</TabsTrigger>
    //     <TabsTrigger value="payment">Payment</TabsTrigger>
    //     <TabsTrigger value="security">Security</TabsTrigger>
    //     <TabsTrigger value="notification">Notification</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="general" className="p-3">
    //     <GeneralForm session={session} />
    //   </TabsContent>
    //   <TabsContent value="address">
    //     <AddressPage />
    //   </TabsContent>
    //   <TabsContent value="payment">
    //     <h1 className="text-3xl font-bold">Payment</h1>
    //   </TabsContent>
    //   <TabsContent value="security">
    //     <h1 className="text-3xl font-bold">Security</h1>
    //   </TabsContent>
    //   <TabsContent value="notification">
    //     <h1 className="text-3xl font-bold">Notification</h1>
    //   </TabsContent>
    // </Tabs>
    <div>
      <GeneralForm session={session} />
    </div>
  );
}
