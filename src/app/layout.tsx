"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Suspense } from "react";
import Footer from "@/components/layout/footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const disableNavbar = ["/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen">
        {!disableNavbar.includes(pathname) && (
          <div>
            <Navbar />
          </div>
        )}
        <Suspense>
          <main>{children}</main>
        </Suspense>
        {!disableNavbar.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
