"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doSearch = useDebounce((term) => {
    if (term) {
      router.replace(`/?page=1&query=${encodeURIComponent(term)}`);
    } else {
      router.replace("?page=1");
    }
  }, 500);

  return (
    <input
      type="text"
      placeholder="Where to?"
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => doSearch(e.target.value)}
      className="w-full bg-transparent focus:outline-none placeholder:text-sm"
    />
  );
};
export default SearchInput;
