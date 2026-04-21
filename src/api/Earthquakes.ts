import type { DateFilter } from "../types/DateFilter.ts";

export const getEarthquakes = (params: DateFilter) => ({
  url: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${params.startDate.toISOString()}&endtime=${params.endDate.toISOString()}&minmagnitude=3`,
  method: "GET",
});
