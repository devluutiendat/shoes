import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/interface/productDto";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]?.link as string,
      })
    );
  };

  const productSlug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden hover:border-b hover:border-black">
      <Image
        src={
          product.images?.[0]?.link
            ? `http://localhost:5000${product.images?.[0]?.link}`
            : "/placeholder.png"
        }
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-3">
        <Link
          className="text-sm font-semibold cursor-pointer"
          href={`/${productSlug}-${product.id}`}
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold">₫{product.price}</span>
          <CiShoppingCart
            className="text-2xl"
            onClick={() => handleAddToCart()}
          />
        </div>
      </CardContent>
    </Card>
  );
}
