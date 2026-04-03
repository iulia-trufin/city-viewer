import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountries } from "../api/Countries.ts";
import type { Country } from "../types/Country.ts";

export function useContries() {
  return useQuery({
    queryKey: ["countries"],
    placeholderData: {},
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const apiRes = await axios(getCountries());
      const countries = apiRes.data?.geonames ?? [];
      //converting from array to object of objects for performance PTSD
      const result: Record<number, Country> = {};
      countries.forEach((country: Country) => {
        if (!result[country.geonameId]) {
          result[country.geonameId] = country;
        }
      });
      return result;
    },
  });
}
