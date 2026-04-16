import maplibregl from "maplibre-gl";
import type { FeatureCollection } from "geojson";
import type { Theme } from "@mui/material";

export const addCountryLayersMap = (
  map: maplibregl.Map,
  countryPolygons: FeatureCollection,
  theme: Theme,
) => {
  map.addSource("countryPolygons", {
    type: "geojson",
    data: countryPolygons,
  });

  // invisible fill layer used for hover detection
  map.addLayer({
    id: "countries-hit-area",
    type: "fill",
    source: "countryPolygons",
    paint: {
      "fill-color": "#000000",
      "fill-opacity": 0,
    },
  });

  // visible hovered country polygon
  map.addLayer({
    id: "countries-hover-fill",
    type: "fill",
    source: "countryPolygons",
    paint: {
      "fill-color":
        theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.main,
      "fill-opacity": 0.35,
    },
    filter: ["==", ["get", "name"], ""],
  });

  // outline for hovered country
  map.addLayer({
    id: "countries-hover-outline",
    type: "line",
    source: "countryPolygons",
    paint: {
      "line-color":
        theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.main,
      "line-width": 2,
    },
    filter: ["==", ["get", "name"], ""],
  });
};
