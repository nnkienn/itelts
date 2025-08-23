"use client";
import { useState } from "react";
import PrivateNavbar from "@/components/layout/PrivateNavbar"


export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <PrivateNavbar></PrivateNavbar>
      <main className="flex-1">
        {children}
      </main>
    </div>

  );
}