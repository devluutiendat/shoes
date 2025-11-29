"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as ItemType } from "@/store/cartSlice";

interface Props {
  item: ItemType;
  onIncrement: (item: ItemType) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-6 p-6">
        <div className="flex-shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="h-24 w-24 rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              ${item.price.toFixed(2)} each
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecrement(item.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center font-medium">{item.quantity}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onIncrement(item)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <p className="text-lg font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <Button variant="ghost" onClick={() => onRemove(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
