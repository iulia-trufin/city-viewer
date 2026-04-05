import type { City } from "../types/City.ts";

export const getPopulationDistribution = (cities: City[]) => {
  const buckets = {
    "0-100k": 0,
    "100k-500k": 0,
    "500k-1M": 0,
    "1M+": 0,
  };

  cities.forEach((city) => {
    const { population } = city;
    if (population < 100000) {
      buckets["0-100k"]++;
    } else if (population < 500000) {
      buckets["100k-500k"]++;
    } else if (population < 1000000) {
      buckets["500k-1M"]++;
    } else {
      buckets["1M+"]++;
    }
  });
  return { categories: Object.keys(buckets), series: Object.values(buckets) };
};
