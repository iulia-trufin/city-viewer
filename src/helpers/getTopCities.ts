import type { City } from "../types/City.ts";

export const getTopCities = (cities: City[]) => {
  const topCities = [...cities]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);
  return {
    categories: topCities.map((city) => city.cityName),
    series: [
      { name: "Population", data: topCities.map((city) => city.population) },
    ],
  };
};
