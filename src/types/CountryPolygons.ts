import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type CountryProperties = {
  name: string;
  "ISO3166-1-Alpha-3": string;
  "ISO3166-1-Alpha-2": string;
};

export type CountryFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  CountryProperties
>;
