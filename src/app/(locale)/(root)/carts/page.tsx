"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { createOrder } from "@/lib/actions/order";
import CartItemCard from "@/components/shared/Cart-item";
import OrderSummary from "@/components/shared/Order-summary";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const handleCheckout = async () => {
    const orders = items.map((item) => ({
      productId: Number(item.id),
      quantity: item.quantity,
    }));

    await createOrder(orders);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-3xl font-bold tracking-tight">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground">
              Add some items to get started!
            </p>
            <Link className="mt-6" href="/">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          <OrderSummary
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </main>
  );
}
