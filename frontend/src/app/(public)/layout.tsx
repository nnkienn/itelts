// src/app/(public)/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import NavbarPublic from "@/components/layout/NavbarPublic";
import FooterPublic from "@/components/layout/FooterPublic";

export const metadata: Metadata = {
  title: "My App - Public",
  description: "Trang dành cho người chưa đăng nhập",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavbarPublic></NavbarPublic>
        {/* Nội dung trang con */}
        <main className="min-h-screen">{children}</main>

        {/* Footer public */}
        <FooterPublic></FooterPublic>
      </body>
    </html>
  );
}
