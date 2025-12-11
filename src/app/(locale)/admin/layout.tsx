"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ModeToggle } from "@/components/shared/Theme-toggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useSelector((state: RootState) => state.admin);

  return (
    <div>
      <header className="flex flex-col bg-white dark:bg-gray-900 dark:text-white">
        <div className="bg-black text-white dark:bg-gray-800 dark:text-gray-100">
          <div className="flex h-16 items-center px-2 justify-between">
            {/* Logo */}
            <Link href="/">
              <Image src="/icons/logo.svg" width={48} height={48} alt="logo" />
            </Link>

            {/* Navigation */}
            {isAdmin ? (
              <nav className="flex gap-4">
                <Link href="/admin/products">Products</Link>
                <Link href="/admin/orders">Orders</Link>
              </nav>
            ) : (
              <nav className="flex gap-4">
                <Link href="/admin/orders">Orders</Link>
              </nav>
            )}

            {/* Theme toggle + Cart */}
            <div className="flex items-center gap-4">
              <ModeToggle />

              {!isAdmin && (
                <Link href="/carts" className="cursor-pointer">
                  <CiShoppingCart className="text-2xl" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 p-6 md:p-8">{children}</main>
    </div>
  );
}
