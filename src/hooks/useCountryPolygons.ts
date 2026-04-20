import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountryPolygons } from "../api/CountryPolygons.ts";
import type { CountryFeatureCollection } from "../types/CountryPolygons.ts";

export function useCountryPolygons() {
  return useQuery({
    queryKey: ["countryPolygons"],
    placeholderData: {
      type: "FeatureCollection",
      features: [],
    },
    staleTime: 8 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const apiRes = await axios(getCountryPolygons());
      return apiRes.data as CountryFeatureCollection;
    },
  });
}
