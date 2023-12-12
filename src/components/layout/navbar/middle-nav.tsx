"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationList } from "@/constants/navbar";
import CartNav from "./cart-nav";
import UserNav from "./user-nav";
import { PawPrint } from "lucide-react";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationList.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.content ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[1000px] lg:grid-cols-[.75fr_1fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {item.content.hero.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {item.content.hero.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {item.content.submenu.map((subItem) => (
                      <div key={subItem.title}>
                        <p className="font-medium ml-2">{subItem.title}</p>
                        {subItem.subcategory.map((subCategory) => (
                          <ListItem key={subCategory.title}>
                            {subCategory.title}
                          </ListItem>
                        ))}
                      </div>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function NavigationMenuMiddle() {
  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <PawPrint className="h-6 w-6" />
          <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
            Haiwan
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <NavigationMenuDemo />
        </div>
        <div className="flex md:order-2 gap-2 align-middle">
          <CartNav />
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
