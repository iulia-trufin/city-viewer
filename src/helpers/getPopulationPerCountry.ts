//this is done based on cities csv

import type { City } from "../types/City.ts";

export const getPopulationPerCountry = (cities: City[]) => {
  const countryPopulation: Record<string, number> = {};
  cities.forEach((city) => {
    if (!countryPopulation[city.country]) {
      countryPopulation[city.country] = 0;
    }
    countryPopulation[city.country] += city.population;
  });
  const sortedCountries = Object.entries(countryPopulation).sort(
    (a, b) => b[1] - a[1],
  );
  return {
    categories: sortedCountries.map(([country]) => country),
    series: [
      {
        name: "Population",
        data: sortedCountries.map(([, count]) => count),
      },
    ],
  };
};
