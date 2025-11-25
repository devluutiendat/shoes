import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { PriceSort } from "@/interface/productDto";

interface SortDropdownProps {
  sortOrder: PriceSort;
  setSortOrder: (order: PriceSort) => void;
}

export default function SortDropdown({
  sortOrder,
  setSortOrder,
}: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-4 py-2 bg-gray-100 border rounded-md">
          Price
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 p-2 bg-white border shadow-md"
      >
        <DropdownMenuRadioGroup
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as PriceSort)}
        >
          <DropdownMenuRadioItem value={PriceSort.INCRE}>
            Price Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={PriceSort.DCRE}>
            Price High to Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
