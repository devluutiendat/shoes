"use client";
import { Card } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { productType } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";

interface productProps {
  product: productType;
}
const ProductCard = ({ product }: productProps) => {
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
      key={product.id}
      onClick={() => router.push(`/detail/${product.id}`)}
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900 dark:shadow-gray-800"
    >
      <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-square items-center justify-center">
        <Image
          src={
            product.images?.[0]?.link
              ? `http://localhost:5000${product.images[0].link}`
              : "/placeholder.png"
          }
          width={300}
          height={300}
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
  );
};

export default ProductCard;
