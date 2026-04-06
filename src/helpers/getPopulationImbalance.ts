import type { City } from "../types/City.ts";

export const getPopulationImbalance = (cities: City[]) => {
  const populations = [...cities]
    .map((city) => city.population)
    .sort((a, b) => a - b);
  let total = 0;
  populations.forEach((population) => {
    total += population;
  });
  const avg = total / populations.length;
  const median = populations[Math.floor(populations.length / 2)];
  return {
    isImbalanced: avg > median * 2,
    avg: Math.round(avg),
    median,
  };
};
