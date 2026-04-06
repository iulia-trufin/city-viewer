import type { City } from "../types/City.ts";

export const getConcentration = (cities: City[]) => {
  const sortedPopulation = [...cities].sort(
    (a, b) => b.population - a.population,
  );
  let totalPopulation = 0;
  let topPopulation = 0;
  cities.forEach((city) => {
    totalPopulation += city.population;
  });
  sortedPopulation.slice(0, 10).forEach((city) => {
    topPopulation += city.population;
  });
  return Math.round((topPopulation / totalPopulation) * 100);
};
