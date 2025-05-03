"use client";
// components/layout/ClientLayoutWrapper.tsx

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const { user, loading } = useAdminAuth(); // Authentication hook for admin

  return (
    <>
      {user && isAdmin && <Header />}
      {children}
      {user && isAdmin && <Footer />}
    </>
  );
}
