"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SortingDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSort = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-600">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
