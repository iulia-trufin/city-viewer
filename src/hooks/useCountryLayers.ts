import { useEffect, useState, type RefObject } from "react";
import maplibregl, { type MapLayerMouseEvent } from "maplibre-gl";
import type { Theme } from "@mui/material";
import { addCountryLayersMap } from "../helpers/addCountryLayersMap.ts";
import type { CountryFeatureCollection } from "../types/CountryPolygons.ts";

export const useCountryLayers = (
  mapRef: RefObject<maplibregl.Map | null>,
  countryPolygons: CountryFeatureCollection | undefined,
  theme: Theme,
) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !countryPolygons) {
      return;
    }

    const handleMouseMove = (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0];
      const countryName =
        feature?.properties && "name" in feature.properties
          ? String(feature.properties.name)
          : null;

      setHoveredCountry(countryName);
      map.getCanvas().style.cursor = "pointer";

      map.setFilter("countries-hover-fill", [
        "==",
        ["get", "name"],
        countryName ?? "",
      ]);
      map.setFilter("countries-hover-outline", [
        "==",
        ["get", "name"],
        countryName ?? "",
      ]);
    };

    const handleMouseLeave = () => {
      setHoveredCountry(null);
      map.getCanvas().style.cursor = "";

      map.setFilter("countries-hover-fill", ["==", ["get", "name"], ""]);
      map.setFilter("countries-hover-outline", ["==", ["get", "name"], ""]);
    };

    const addOrUpdateCountryLayers = () => {
      const hasSource = !!map.getSource("countryPolygons");
      const hasLayer = !!map.getLayer("countries-hit-area");
      const existingSource = map.getSource("countryPolygons") as
        | maplibregl.GeoJSONSource
        | undefined;

      if (!hasSource || !hasLayer) {
        addCountryLayersMap(map, countryPolygons, theme);

        map.on("mousemove", "countries-hit-area", handleMouseMove);
        map.on("mouseleave", "countries-hit-area", handleMouseLeave);
      } else if (existingSource) {
        existingSource.setData(countryPolygons);
      }
    };

    map.once("idle", addOrUpdateCountryLayers);

    return () => {
      map.off("idle", addOrUpdateCountryLayers);
      map.off("mousemove", "countries-hit-area", handleMouseMove);
      map.off("mouseleave", "countries-hit-area", handleMouseLeave);
    };
  }, [mapRef, countryPolygons, theme]);

  return hoveredCountry;
};
