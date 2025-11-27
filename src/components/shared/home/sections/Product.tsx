"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/actions/product";
import { PriceSort, Product } from "@/lib/validate";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import Loading from "@/app/loading";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<PriceSort>(PriceSort.INCRE);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllProducts({
          name: searchTerm,
          items_per_page: 8,
          page,
          sort_price: sortOrder,
        });
        setProducts(response.data);
        setTotalPages(response.meta.last_page);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, sortOrder, page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleSortChange = (order: PriceSort) => {
    setSortOrder(order);
    setPage(1);
  };

  return (
    <section id="products" className="px-4 sm:px-6 my-16 md:my-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Our Products
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
          <SortDropdown sortOrder={sortOrder} setSortOrder={handleSortChange} />
        </div>

        {error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : loading ? (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No products found. Try a different search term.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
