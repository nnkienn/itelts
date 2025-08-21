"use client";

import { useState } from "react";
import NavbarPublic from "@/components/layout/NavbarPublic";
import FooterPublic from "@/components/layout/FooterPublic";
import Sidebar from "@/components/layout/Slidebar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Navbar */}
        <NavbarPublic />

        <div className="flex flex-1 pt-16">
          {/* Sidebar cố định */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Content chừa khoảng cho Sidebar */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              isOpen ? "ml-64" : "ml-20"
            }`}
          >
            <main className="flex-1">{children}</main>
            <FooterPublic />
          </div>
        </div>
      </body>
    </html>
  );
}
