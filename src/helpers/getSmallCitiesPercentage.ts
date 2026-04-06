import type { City } from "../types/City.ts";
import { getPopulationDistribution } from "./getPopulationDistribution.ts";

export const getSmallCitiesPercentage = (cities: City[]) => {
  const { categories, series } = getPopulationDistribution(cities);
  const mappingBuckets: Record<string, number> = {};
  categories.forEach((category, index) => {
    mappingBuckets[category] = series[index];
  });
  const smallCount = mappingBuckets["0-100k"] || 0;
  return Math.round((smallCount / cities.length) * 100);
};
