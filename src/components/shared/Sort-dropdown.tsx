"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { PriceSort } from "@/types";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortOrder: PriceSort;
  setSortOrder: (value: PriceSort) => void;
}

export default function SortDropdown({
  sortOrder,
  setSortOrder,
}: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          Price
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg"
      >
        <DropdownMenuRadioGroup
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as PriceSort)}
        >
          <DropdownMenuRadioItem
            value={PriceSort.INCRE}
            className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            Price: Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={PriceSort.DCRE}
            className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          >
            Price: High to Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
