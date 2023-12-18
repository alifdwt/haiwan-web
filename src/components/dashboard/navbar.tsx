import { Bell, LayoutGrid, PawPrint } from "lucide-react";
import Link from "next/link";
import UserNav from "../layout/navbar/user-nav";
import { Button } from "@/components/ui/button";

const NavbarDashboard = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <PawPrint className="h-6 w-6" />
          <p className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
            Haiwan
          </p>
        </Link>
        <div className="flex md:order-2 gap-2 align-middle">
          <Button variant={"ghost"} size={"icon"}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <LayoutGrid />
          </Button>
          <UserNav />
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
