import { useMemo, useState } from "react";

export function useTableSearch<T extends Record<string, unknown>>(
  data: T[],
  keys: (keyof T)[],
) {
  const [search, setSearch] = useState("");
  const searchedData = useMemo(() => {
    if (!search) {
      return data;
    }
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (!value) {
          return false;
        }
        const lowerCaseSearch = search.toLowerCase();
        const stringedValue = String(value).toLowerCase();
        return stringedValue.includes(lowerCaseSearch);
      }),
    );
  }, [data, search, keys]);
  return {
    search,
    setSearch,
    searchedData,
  };
}
