import type { FilterConfig } from "../types/GenericTableActionsProps.ts";

export const cityFilters: FilterConfig[] = [
  { id: "cityName", label: "City", type: "dropdown" },
  { id: "population", label: "Population", type: "range" },
];
