"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductDetail } from "@/lib/validate";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface ProductDetailProps {
  product: ProductDetail;
}

export default function Detail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity,
        image: product.images?.[0]?.link as string,
      })
    );
  };

  const handleBuyNow = () => {
    router.push(`/checkout?product=${product.id}`);
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="flex flex-col items-center">
        <Image
          src={product.images[imageIndex]?.link || "/placeholder.png"}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg shadow-md"
        />
      </motion.div>

      <motion.div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.style}</p>
        <p className="text-gray-700 mt-4">{product.description}</p>

        <p className="text-lg font-semibold mt-4">
          Price:{" "}
          <span className="text-purple-600">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>

        <div className="flex gap-2 mt-3">
          {product.images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setImageIndex(index)}
              className={`cursor-pointer border rounded-lg ${
                index === imageIndex ? "border-purple-600" : ""
              }`}
            >
              <Image
                src={img.link || "/placeholder.png"}
                alt="Product"
                width={60}
                height={60}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <p className="font-semibold">Quantity:</p>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity === 1}
            >
              <Minus size={16} />
            </Button>
            <span className="px-4">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <motion.button
            className="bg-purple-600 text-white w-full py-2 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
          >
            Mua Ngay
          </motion.button>

          <motion.button
            className="bg-gray-800 text-white w-full py-2 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
