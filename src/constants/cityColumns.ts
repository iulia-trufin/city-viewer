import type { TableColumn } from "../types/TableColumn.ts";
import type { City } from "../types/City.ts";

export const cityColumns: TableColumn<City>[] = [
  { id: "cityName", label: "City" },
  { id: "country", label: "Country" },
  { id: "type", label: "Type" },
  { id: "population", label: "Population" },
];
