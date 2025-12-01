"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productType } from "@/types";
import ProductCard from "./ProductCard";
import SpecialItem from "./Special-item";

const ITEMS_PER_PAGE = 5;

interface BestSellerProps {
  products: productType[];
}

export default function BestSeller({ products }: BestSellerProps) {
  const [page, setPage] = useState<number>(0);

  const start = page * ITEMS_PER_PAGE;
  const currentProducts = products.slice(start, start + ITEMS_PER_PAGE);

  const speacialItem = currentProducts.reduce((prev, curr) =>
    curr._count.orders > prev._count.orders ? curr : prev
  );

  const normalItems = currentProducts.filter((obj) => obj !== speacialItem);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <section className="container mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Best Seller
        </h2>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 rounded-full"
            size="icon"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* NORMAL 4 PRODUCT CARDS */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {normalItems.map((product: productType) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        {/*  BIG CARD */}
        {speacialItem && <SpecialItem special_item={speacialItem} />}
      </div>
    </section>
  );
}
