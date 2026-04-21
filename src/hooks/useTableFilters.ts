import type {
  FilterConfig,
  FilterValue,
} from "../types/GenericTableActionsProps.ts";
import { useMemo, useState } from "react";

export function useTableFilters<T>(data: T[], filters: FilterConfig[]) {
  const [filterState, setFilterState] = useState<Record<string, FilterValue>>(
    {},
  );
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return filters.every((filter) => {
        const state = filterState[filter.id];
        if (!state) {
          return true;
        }
        const value = item[filter.id as keyof T];
        if (filter.type === "dropdown" && Array.isArray(state)) {
          return state.includes(String(value));
        }
        if (filter.type === "range" && ("min" in state || "max" in state)) {
          const { min, max } = state;

          if (isNaN(Number(value))) {
            return false;
          }
          if (min != null && Number(value) < min) {
            return false;
          }
          if (max != null && Number(value) > max) {
            return false;
          }
        }
        return true;
      });
    });
  }, [data, filters, filterState]);
  return {
    filterState,
    setFilterState,
    filteredData,
  };
}
