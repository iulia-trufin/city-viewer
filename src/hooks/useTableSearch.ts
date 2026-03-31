import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce.ts";

export function useTableSearch<T extends Record<string, unknown>>(
  data: T[],
  keys: (keyof T)[],
) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const searchedData = useMemo(() => {
    if (!debouncedSearch) {
      return data;
    }
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (!value) {
          return false;
        }
        const lowerCaseSearch = debouncedSearch.toLowerCase();
        const stringedValue = String(value).toLowerCase();
        return stringedValue.includes(lowerCaseSearch);
      }),
    );
  }, [data, debouncedSearch, keys]);
  return {
    search,
    setSearch,
    searchedData,
  };
}
