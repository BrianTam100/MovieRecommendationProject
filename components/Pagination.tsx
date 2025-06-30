import Link from 'next/link';
import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; 
  onPageChange?: (page: number) => void; 
}

const Pagination = ({ currentPage, totalPages, basePath, onPageChange }: PaginationProps) => {
    const [inputPage, setInputPage] = useState("");

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
    
  };
  const handleGoToPage = () => {
    const pageNumber = Number(inputPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange?.(pageNumber);
      setInputPage("");
    } else {
      alert(`Please enter a page number between 1 and ${totalPages}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <div className="flex gap-2 justify-center my-6">
      <button
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-700 rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        Previous
      </button>

      {getPages().map((p, i) =>
        typeof p === "number" ? (
          basePath ? (
            <Link key={i} href={`${basePath}/${p}`}>
              <button
                className={`px-3 py-1 rounded ${
                  p === currentPage
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-gray-700 hover:bg-blue-600"
                }`}
              >
                {p}
              </button>
            </Link>
          ) : (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                p === currentPage
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-700 hover:bg-blue-600"
              }`}
              onClick={() => onPageChange?.(p)}
            >
              {p}
            </button>
          )
        ) : (
          <span key={i} className="px-3 py-1 text-gray-400">
            {p}
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-700 rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        Next
      </button>
      <input
        type="number"
        min={1}
        max={totalPages}
        placeholder="Page #"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-16 px-2 py-1 rounded border border-gray-400 text-black ml-2"
      />
      <button
        onClick={handleGoToPage}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go
      </button>
    </div>
  );
};

export default Pagination;
