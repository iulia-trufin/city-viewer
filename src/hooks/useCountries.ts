import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountries } from "../api/Countries.ts";
import type { Country } from "../types/Country.ts";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    placeholderData: [],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const apiRes = await axios(getCountries());
      return (apiRes.data?.geonames ?? []) as Country[];
    },
  });
}
