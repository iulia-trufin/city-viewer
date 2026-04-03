import type { FilterConfig } from "../types/GenericTableActionsProps.ts";

export function getFilterMeta<T>(data: T[], filter: FilterConfig) {
  const values = data.map((item) => item[filter.id as keyof T]);
  if (filter.type === "dropdown") {
    //making the options have unique values + removing empty or null values
    const options = Array.from(new Set(values))
      .filter(Boolean)
      .map((v) => String(v));
    return { options };
  }
  if (filter.type === "range") {
    // in case the column has numbers, but they're somehow stringified like "300"
    const numbers = values.map((v) => Number(v)).filter((v) => !isNaN(v));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return { min, max };
  }
  return {};
}
