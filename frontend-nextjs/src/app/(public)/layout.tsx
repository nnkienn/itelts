"use client";
import { useState } from "react";
import NavbarPublic from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen ">
        {/* Navbar  */}
        <NavbarPublic></NavbarPublic>
        <main className="flex-1">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}