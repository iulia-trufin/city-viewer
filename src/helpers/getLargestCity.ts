import type { City } from "../types/City.ts";

export const getLargestCity = (cities: City[]) => {
  let totalPopulation = 0;
  cities.forEach((city) => {
    totalPopulation += city.population;
  });
  const avgPopulation = totalPopulation / cities.length;
  const largestCity = [...cities].sort(
    (a, b) => b.population - a.population,
  )[0];
  const ratio = largestCity.population / avgPopulation;
  return { city: largestCity.cityName, ratio: Math.round(ratio) };
};
