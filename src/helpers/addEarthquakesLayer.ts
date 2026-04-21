import maplibregl from "maplibre-gl";
import type { EarthquakeFeatureCollection } from "../types/Earthquakes";

export const addEarthquakesLayer = (
  map: maplibregl.Map,
  data: EarthquakeFeatureCollection,
) => {
  const sourceId = "earthquakes";
  const layerId = "earthquakes-circle";

  const existingSource = map.getSource(sourceId) as
    | maplibregl.GeoJSONSource
    | undefined;

  if (existingSource) {
    existingSource.setData(data);
    return;
  }

  map.addSource(sourceId, {
    type: "geojson",
    data,
  });

  // glow layer (behind)
  map.addLayer({
    id: "earthquakes-glow",
    type: "circle",
    source: "earthquakes",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        10,
        7,
        30,
        11,
        80,
      ],
      "circle-color": "#ff1744",
      "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        0.25,
        7,
        0.35,
        11,
        0.6,
      ],
      "circle-blur": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        0.8,
        7,
        1.2,
        11,
        1.8,
      ],
    },
  });

  // core layer (front)
  map.addLayer({
    id: layerId,
    type: "circle",
    source: sourceId,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        ["interpolate", ["linear"], ["get", "mag"], 0, 1, 7, 4],
        7,
        ["interpolate", ["linear"], ["get", "mag"], 0, 2, 7, 10],
        11,
        ["interpolate", ["linear"], ["get", "mag"], 0, 4, 7, 20],
      ],
      "circle-color": [
        "case",
        ["==", ["get", "tsunami"], 1],
        "#00e5ff",
        "#ffffff", // neutral core
      ],
      "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        0,
        7,
        0.3,
        11,
        0.8,
      ],
      "circle-stroke-width": 0,
    },
  });
};
