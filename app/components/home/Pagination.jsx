"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages, currentPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // add the page query parameter to the URL
  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);
    return `?${params.toString()}`;
  };

  // generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-8 flex justify-center">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center -space-x-px">
          {/* Previous button */}
          <li>
            <button
              onClick={() => router.push(createPageURL(currentPage - 1))}
              disabled={currentPage === 1}
              className="block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>

          {/* Page numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <Link
                href={createPageURL(number)}
                className={`py-2 px-3 leading-tight border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 ${
                  currentPage === number
                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                    : "bg-white text-zinc-500"
                }`}
              >
                {number}
              </Link>
            </li>
          ))}

          {/* Next button */}
          <li>
            <button
              onClick={() => router.push(createPageURL(currentPage + 1))}
              disabled={currentPage === totalPages}
              className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
