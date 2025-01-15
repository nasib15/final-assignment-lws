"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.replace(`/?${params.toString()}`);
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
