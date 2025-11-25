"use client";
import { getMostSoldProducts } from "@/api/product";
import { Product } from "@/interface/productDto";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const MostProduct = () => {
  const [mostProducts, setMostProduct] = useState<Product[]>([]);
  const mostProduct = async () => {
    try {
      const response = await getMostSoldProducts();
      setMostProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    mostProduct();
  }, []);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {mostProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default MostProduct;
