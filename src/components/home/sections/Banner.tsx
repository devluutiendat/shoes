import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function Banner() {
  return (
    <Carousel id="Banner" className="w-full h-screen">
      <CarouselContent>
        {bannerImages.map((src, index) => (
          <CarouselItem key={index} className="w-full h-screen">
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                className="absolute top-0 left-0 object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
    </Carousel>
  );
}
