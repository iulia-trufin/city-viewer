import type { MapBounds } from "../types/MapBounds.ts";

export const getCityLocations = (params: MapBounds) => ({
  url: `/api/mapCities?north=${params.north}&south=${params.south}&east=${params.east}&west=${params.west}`,
  method: "GET",
});
