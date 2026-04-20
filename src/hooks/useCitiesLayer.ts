import { useEffect, type RefObject } from "react";
import maplibregl from "maplibre-gl";
import { geoCitiesToGeoJSON } from "../helpers/geoCitiesToGeoJSON.ts";
import { addCitiesLayer } from "../helpers/addCitiesLayer.ts";

type CityLocations = Parameters<typeof geoCitiesToGeoJSON>[0];

export const useCitiesLayer = (
  mapRef: RefObject<maplibregl.Map | null>,
  cities: CityLocations | undefined,
  showCities: boolean,
) => {
  useEffect(() => {
    const map = mapRef.current;

    if (!map || !cities?.length) {
      return;
    }

    const visibility = showCities ? "visible" : "none";

    const updateVisibility = () => {
      if (map.getLayer("cities-circle")) {
        map.setLayoutProperty("cities-circle", "visibility", visibility);
      }

      if (map.getLayer("cities-label")) {
        map.setLayoutProperty("cities-label", "visibility", visibility);
      }
    };

    updateVisibility();

    const geojson = geoCitiesToGeoJSON(cities);

    const addOrUpdateCitiesLayer = () => {
      addCitiesLayer(map, geojson);
      updateVisibility();
    };

    map.once("idle", addOrUpdateCitiesLayer);

    return () => {
      map.off("idle", addOrUpdateCitiesLayer);
    };
  }, [mapRef, cities, showCities]);
};
