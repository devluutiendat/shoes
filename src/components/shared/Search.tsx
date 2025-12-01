"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/shared/Search-bar";
import SortDropdown from "@/components/shared/Sort-dropdown";
import { PriceSort } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import Tag from "@/components/shared/Tag";

interface searchProps {
  totalPage: number;
}
export default function Search({ totalPage }: searchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<PriceSort>(PriceSort.INCRE);
  const [page, setPage] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearTags = () => setSelectedTags([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // PAGE
    if (page) params.set("page", String(page));
    else params.delete("page");

    // SEARCH
    if (searchQuery) params.set("name", searchQuery);
    else params.delete("search");

    // SORT
    if (sortOrder) params.set("sort", sortOrder);
    else params.delete("sort");

    // TAGS
    if (selectedTags.length > 0) params.set("style", selectedTags.join(","));
    else params.delete("style");

    router.push(`?${params.toString()}`);
  }, [page, searchQuery, sortOrder, selectedTags]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Discover Products
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Search and filter to find exactly what you're looking for
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex-1 w-full sm:w-auto">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>

      <Tag
        selectedTags={selectedTags}
        handleClearTags={handleClearTags}
        handleTagToggle={handleTagToggle}
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPage} />
    </div>
  );
}
