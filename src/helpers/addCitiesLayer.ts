import maplibregl from "maplibre-gl";
import type { FeatureCollection, Point } from "geojson";

export const addCitiesLayer = (
  map: maplibregl.Map,
  geojson: FeatureCollection<Point>,
) => {
  const existingSource = map.getSource("cities") as
    | maplibregl.GeoJSONSource
    | undefined;

  if (existingSource) {
    existingSource.setData(geojson);
    return;
  }

  map.addSource("cities", {
    type: "geojson",
    data: geojson,
  });

  // dots on the map
  map.addLayer({
    id: "cities-circle",
    type: "circle",
    source: "cities",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        5,
        7,
        9,
        11,
        13,
      ],
      "circle-color": "#90caf9",
      "circle-opacity": 0.5,
      "circle-stroke-width": 0.5,
      "circle-stroke-color": "#ffffff",
    },
  });

  // more labeling
  map.addLayer({
    id: "cities-label",
    type: "symbol",
    source: "cities",
    layout: {
      "text-field": ["get", "name"],
      "text-size": 12,
      "text-offset": [0, 1.2],
      "text-anchor": "top",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000000",
      "text-halo-width": 1,
    },
  });
};
