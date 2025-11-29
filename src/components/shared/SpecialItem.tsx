"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { productType } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";

interface productProps {
  special_item: productType;
}
const SpecialItem = ({ special_item }: productProps) => {
  const router = useRouter();

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

  return (
    <Card
      onClick={() => router.push(`/detail/${special_item.id}`)}
      className="overflow-hidden border-0 shadow-lg dark:bg-gray-900 dark:shadow-gray-800"
    >
      <img
        src={
          special_item.images?.[0]?.link
            ? `http://localhost:5000${special_item.images[0].link}`
            : "/placeholder.png"
        }
        alt={special_item.name}
        className="w-full flex-1 flex object-cover"
      />

      <div className="p-6">
        <span className="text-orange-500 font-semibold">Featured Product</span>
        <h3 className="font-semibold text-2xl mb-1 my-2">
          {special_item.name}
        </h3>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          dolores saepe aperiam illum quod non, quidem quo voluptatum sapiente
          aliquid praesentium, quis voluptates doloribus repudiandae iusto natus
          nemo quisquam consectetur!
        </span>
        <div className="flex items-center gap-3">
          <p className=" font-bold">{special_item.price} $</p>
          <span className="text-xs text-muted-foreground">
            {special_item._count.orders} orders
          </span>
        </div>

        <Button
          onClick={() => handleAddToCart(special_item)}
          className="mt-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white rounded-full px-6 py-2"
        >
          <ShoppingCart className="w-4 h-4 text-accent-foreground" />
          buy Product
        </Button>
      </div>
    </Card>
  );
};

export default SpecialItem;
