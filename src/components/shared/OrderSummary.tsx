"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  totalPrice: number;
  totalQuantity: number;
  onCheckout: () => void;
}

export default function OrderSummary({
  totalPrice,
  totalQuantity,
  onCheckout,
}: Props) {
  return (
    <Card className="sticky top-4 p-6">
      <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${(totalPrice * 0.1).toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 border-t" />

      <div className="mb-6 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${(totalPrice * 1.1).toFixed(2)}</span>
      </div>

      <Button className="w-full" size="lg" onClick={onCheckout}>
        Proceed to Checkout
      </Button>

      <div className="mt-4 rounded-lg bg-muted p-3">
        <p className="text-xs">
          Items in cart: <span className="font-semibold">{totalQuantity}</span>
        </p>
      </div>
    </Card>
  );
}
