import type { TableColumn } from "../types/TableColumn.ts";
import type { Country } from "../types/Country.ts";

export const countryColumns: TableColumn<Country>[] = [
  { id: "countryName", label: "Country" },
  { id: "countryCode", label: "Code" },
  { id: "capital", label: "Capital" },
  { id: "continentName", label: "Continent" },
  { id: "population", label: "Population" },
];
