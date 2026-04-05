import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import type { CityCsvRow } from "../types/CityCsvRow.ts";
import { mapRowToCity } from "../helpers/mapCapital.ts";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    placeholderData: [],
    staleTime: 8 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await fetch("/cities.csv");
      const csvText = await response.text();

      const parsed = Papa.parse<CityCsvRow>(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      return parsed.data.map(mapRowToCity);
    },
  });
}
