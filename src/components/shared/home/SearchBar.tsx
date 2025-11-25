import { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 500),
    []
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 pl-10 border rounded-md"
      />
      <button className="absolute left-3 top-3 text-gray-500">
        <FaSearch />
      </button>
    </div>
  );
}
