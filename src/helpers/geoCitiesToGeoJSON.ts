import type { CityLocation } from "../types/CityLocation.ts";
import type { FeatureCollection, Point } from "geojson";

export const geoCitiesToGeoJSON = (
  cities: CityLocation[],
): FeatureCollection<Point> => ({
  type: "FeatureCollection",
  features: cities.map((city) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [city.lng, city.lat],
    },
    properties: {
      id: city.geonameId,
      name: city.name,
      country: city.countrycode,
      population: city.population,
    },
  })),
});
