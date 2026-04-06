import type { City } from "../types/City.ts";
import { getCitiesPerCountry } from "./getCitiesPerCountry.ts";

export const getTopCountryByCityCount = (cities: City[]) => {
  const { categories, series } = getCitiesPerCountry(cities);
  const topCountry = categories[0];
  const topPopulation = series[0].data[0];
  return {
    country: topCountry,
    percentage: Math.round((topPopulation / cities.length) * 100),
  };
};
