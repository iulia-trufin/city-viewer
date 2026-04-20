import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCityLocations } from "../api/CityLocations.ts";
import type { CityLocation } from "../types/CityLocation.ts";
import type { MapBounds } from "../types/MapBounds.ts";

export function useCityLocations(bounds: MapBounds | null) {
  return useQuery({
    queryKey: ["cityLocations", bounds],
    enabled: !!bounds,
    placeholderData: [],
    staleTime: 8 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!bounds) {
        return;
      }
      const apiRes = await axios(getCityLocations(bounds));
      return (apiRes.data?.geonames ?? []) as CityLocation[];
    },
  });
}
