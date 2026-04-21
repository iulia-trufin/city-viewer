// Earthquakes.ts
import type { FeatureCollection, Point } from "geojson";

export type EarthquakeProperties = {
  mag: number;
  time: number;
  place: string;
  tsunami?: number; // I hope it's just 0 or 1, and not counting how many tsunamis it made
};

export type EarthquakeFeatureCollection = FeatureCollection<
  Point,
  EarthquakeProperties
>;
