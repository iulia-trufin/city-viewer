import type { City } from "../types/City.ts";
import { getPopulationPerCountry } from "./getPopulationPerCountry.ts";

export const getTopCountryByPopulation = (cities: City[]) => {
  const { categories, series } = getPopulationPerCountry(cities);
  const topCountry = categories[0];
  const topPopulation = series[0].data[0];
  let totalPopulation = 0;
  cities.forEach((city) => {
    totalPopulation += city.population || 0;
  });
  return {
    country: topCountry,
    percentage: Math.round((topPopulation / totalPopulation) * 100),
  };
};
