import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { DateFilter } from "../types/DateFilter.ts";
import type { EarthquakeFeatureCollection } from "../types/Earthquakes.ts";
import { getEarthquakes } from "../api/Earthquakes.ts";

export function useEarthquakes(params: DateFilter) {
  return useQuery({
    queryKey: ["earthquakes", params.startDate, params.endDate],
    placeholderData: {
      type: "FeatureCollection",
      features: [],
    } as EarthquakeFeatureCollection,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const apiRes = await axios(getEarthquakes(params));
      return apiRes.data as EarthquakeFeatureCollection;
    },
  });
}
