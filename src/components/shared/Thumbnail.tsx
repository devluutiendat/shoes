"use client";
import { ProductImage } from "@/app/(locale)/(root)/detail/[id]/page";
import Image from "next/image";
import { useState } from "react";

interface Thumbnail {
  images: ProductImage[];
  name: string;
}
const Thumbnail = ({ images, name }: Thumbnail) => {
  const [selectedImage, setSelectedImage] = useState("");
  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="flex items-center justify-center bg-secondary rounded-lg overflow-hidden aspect-square">
        <div className="relative w-full h-full">
          <Image
            src={
              `http://localhost:5000${selectedImage}` ||
              `http://localhost:5000${
                images.find((p) => p.type === "main")?.link
              }` ||
              "/placeholder.svg"
            }
            alt={`Nike Air Max 24 React - ${name}`}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3">
        {images.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(thumb.link)}
            className="relative w-20 h-20 rounded-lg border-2 border-border overflow-hidden hover:border-foreground transition-colors"
            aria-label={`View angle ${idx + 1}`}
          >
            <Image
              src={`http://localhost:5000${thumb.link}` || "/placeholder.svg"}
              alt={`Product view ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
