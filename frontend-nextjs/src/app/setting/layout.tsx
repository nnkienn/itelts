"use client";
import { useState } from "react";

import NavbarPrivate from "@/components/layout/PrivateNavbar";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen ">
        <NavbarPrivate/>
        <main className="flex-1">{children}</main>

      </body>
    </html>
  );
}