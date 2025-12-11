"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { productType } from "@/types";
import Thumbnail from "@/components/shared/Thumbnail";
import { getProducts } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";

export default function ProductDisplay() {
  const [products, setproducts] = useState<productType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();
      setproducts(res);
    };
    fetchData();
  }, []);
  return (
    <div className=" max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Products
          </h1>
          <p className="text-base text-muted-foreground">
            Browse our collection of premium products
          </p>
        </div>
        <Button>create</Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Main Image Display */}
            <Thumbnail images={product.images} name={product.name} />

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <CardTitle className="line-clamp-1 text-xl">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Product ID: {product.id}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">
                  {product._count.orders}{" "}
                  {product._count.orders === 1 ? "order" : "orders"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Style */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Style
                </span>
                <Badge variant="outline">{product.style}</Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                    update
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                Created:{" "}
                {new Date(product.images[0]?.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
