import type { FilterConfig } from "../types/GenericTableActionsProps.ts";

export const countryFilters: FilterConfig[] = [
  { id: "countryName", label: "Country", type: "dropdown" },
  { id: "capital", label: "Capital", type: "dropdown" },
  { id: "continentName", label: "Continent", type: "dropdown" },
  { id: "population", label: "Population", type: "range" },
];
