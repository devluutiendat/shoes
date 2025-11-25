interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pagesToShow = 5;
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= pagesToShow) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (page < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-2 border rounded-md"
      >
        {"<"}
      </button>
      {pageNumbers.map((p, index) =>
        typeof p === "number" ? (
          <button
            key={index}
            onClick={() => setPage(p)}
            className={`px-3 py-2 border rounded-md ${
              p === page ? "bg-red-500 text-white" : ""
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={index} className="px-3 py-2">
            ...
          </span>
        )
      )}
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-2 border rounded-md"
      >
        {">"}
      </button>
    </div>
  );
}
