"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { productType } from "@/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import type { AppDispatch } from "@/store";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

interface BestSellerProps {
  products: productType[];
}

export default function BestSeller({ products }: BestSellerProps) {
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: productType) => {
    const payload = {
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.link
        ? `http://localhost:5000${product.images[0].link}`
        : "/placeholder.png",
    };
    dispatch(addToCart(payload));
    toast.success(`${product.name} added to cart!`);
  };

  const start = page * ITEMS_PER_PAGE;
  const currentProducts = products.slice(start, start + ITEMS_PER_PAGE);

  const featuredItem = currentProducts.reduce((prev, curr) =>
    curr._count.orders > prev._count.orders ? curr : prev
  );

  const normalItems = currentProducts.filter((obj) => obj !== featuredItem);

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
            <Card
              key={product.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900 dark:shadow-gray-800"
            >
              <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-square items-center justify-center">
                <img
                  src={
                    product.images?.[0]?.link
                      ? `http://localhost:5000${product.images[0].link}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="flex items-center justify-between px-4">
                <div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <p className=" font-bold">{product.price} $</p>
                    <span className="text-xs text-muted-foreground">
                      {product._count.orders} orders
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 bg-accent rounded-full hover:bg-orange-300 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 text-accent-foreground" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* FEATURED BIG CARD */}
        {featuredItem && (
          <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-900 dark:shadow-gray-800">
            <img
              src={
                featuredItem.images?.[0]?.link
                  ? `http://localhost:5000${featuredItem.images[0].link}`
                  : "/placeholder.png"
              }
              alt={featuredItem.name}
              className="w-full flex-1 flex object-cover"
            />

            <div className="p-6">
              <span className="text-orange-500 font-semibold">
                Featured Product
              </span>
              <h3 className="font-semibold text-2xl mb-1 my-2">
                {featuredItem.name}
              </h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                dolores saepe aperiam illum quod non, quidem quo voluptatum
                sapiente aliquid praesentium, quis voluptates doloribus
                repudiandae iusto natus nemo quisquam consectetur!
              </span>
              <div className="flex items-center gap-3">
                <p className=" font-bold">{featuredItem.price} $</p>
                <span className="text-xs text-muted-foreground">
                  {featuredItem._count.orders} orders
                </span>
              </div>

              <Button
                onClick={() => handleAddToCart(featuredItem)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white rounded-full px-6 py-2"
              >
                <ShoppingCart className="w-4 h-4 text-accent-foreground" />
                buy Product
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
