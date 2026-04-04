import type { City } from "../types/City.ts";
import type { CityCsvRow } from "../types/CityCsvRow.ts";

export function mapCapital(value: string): City["type"] {
  if (value === "primary") return "Capital";
  if (value === "admin") return "Primary";
  if (!value) return "Town";
  return "Minor";
}

export function mapRowToCity(row: CityCsvRow): City {
  return {
    cityName: row.city,
    lat: Number(row.lat),
    lon: Number(row.lng),
    country: row.country,
    countryIso2: row.iso2,
    countryIso3: row.iso3,
    type: mapCapital(row.capital),
    population: Number(row.population),
  };
}
