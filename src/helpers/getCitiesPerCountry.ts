import type { City } from "../types/City.ts";

export const getCitiesPerCountry = (cities: City[]) => {
  const countryCount: Record<string, number> = {};
  cities.forEach((city) => {
    if (!countryCount[city.country]) {
      countryCount[city.country] = 0;
    }
    countryCount[city.country]++;
  });
  const sortedCountries = Object.entries(countryCount).sort(
    (a, b) => b[1] - a[1],
  );
  return {
    categories: sortedCountries.map(([country]) => country),
    series: [
      {
        name: "Cities",
        data: sortedCountries.map(([, count]) => count),
      },
    ],
  };
};
