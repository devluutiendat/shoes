import ProductCard from "@/components/shared/ProductCard";
import Search from "@/components/shared/Search";
import { getAllProducts } from "@/lib/actions/product";
import { productType } from "@/types";

import React from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    name?: string;
    page?: string;
    sort?: string;
    style?: string;
  }>;
}) {
  const rawParams = await props.searchParams;

  const params = new URLSearchParams();

  if (rawParams) {
    Object.entries(rawParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value);
      }
    });
  }

  const queryString = params.toString();
  const product = await getAllProducts(queryString);
  console.log(product);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Search totalPage={Number(product.meta.totalPage)} />
      <div className="grid-cols-2 grid lg:grid-cols-5 gap-6 bg-slate-900">
        <h2 className="text-2xl font-bold text-foreground mt-16 mb-6 col-span-full text-center">
          <div className="h-2 w-100% bg-slate-500 m-10" />
          My Products
        </h2>
        {product.data ? (
          product.data.map((product: productType) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <span>There is no product as described for you.</span>
        )}
      </div>
    </main>
  );
}
