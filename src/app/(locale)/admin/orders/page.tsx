"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { getAllOrders, getUserOrders } from "@/lib/actions/order";

interface Product {
  id: number;
  name: string;
  style: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  active: boolean;
  createdAt: string;
  productId: number;
  userId: number;
  product: Product;
}

export default function ProductDisplay() {
  const { isAdmin } = useSelector((state: RootState) => state.admin);
  const [orders, setOrders] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (isAdmin) {
        const res = await getAllOrders();
        setOrders(res);
      } else {
        const res = await getUserOrders();
        setOrders(res);
      }
    };
    fetchOrder();
  }, [isAdmin]);

  return (
    <div className=" max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {orders.length} {orders.length === 1 ? "item" : "orders"} in your cart
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex orders-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <CardTitle className="line-clamp-1">
                    {item.product.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    ID: {item.product.id}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Product Style */}
              <div className="flex orders-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Style:
                </span>
                <span className="text-sm font-semibold">
                  {item.product.style}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground line-clamp-2">
                {item.product.description}
              </p>

              {/* Price and Quantity */}
              <div className="flex orders-center justify-between border-t border-border pt-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-bold text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex orders-center gap-2 rounded-lg bg-secondary p-2">
                  <ShoppingCart className="h-4 w-4 text-secondary-foreground" />
                  <span className="font-semibold text-secondary-foreground">
                    {item.quantity}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
                <p>Cart ID: {item.id}</p>
                <p>User ID: {item.userId}</p>
                <p>Added: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
