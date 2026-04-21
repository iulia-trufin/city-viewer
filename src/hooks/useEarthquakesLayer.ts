import { useEffect, type RefObject, useState } from "react";
import maplibregl from "maplibre-gl";
import type {
  EarthquakeFeatureCollection,
  EarthquakeProperties,
} from "../types/Earthquakes";
import { addEarthquakesLayer } from "../helpers/addEarthquakesLayer";

export const useEarthquakesLayer = (
  mapRef: RefObject<maplibregl.Map | null>,
  data: EarthquakeFeatureCollection | undefined,
  showEarthquakes: boolean,
) => {
  const [hoveredEarthquake, setHoveredEarthquake] =
    useState<EarthquakeProperties | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !data) return;

    const handleMouseMove = (e: maplibregl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["earthquakes-circle", "earthquakes-glow"],
      });

      if (!features.length) {
        map.getCanvas().style.cursor = "";
        setHoveredEarthquake(null);
        return;
      }

      map.getCanvas().style.cursor = "pointer";

      const feature = features[0];
      const props = feature.properties as EarthquakeProperties;

      setHoveredEarthquake({
        mag: props?.mag,
        place: props?.place,
        time: props?.time,
      });
    };

    const setup = () => {
      addEarthquakesLayer(map, data);
      map.on("mousemove", handleMouseMove);
    };

    map.once("idle", setup);

    return () => {
      map.off("mousemove", handleMouseMove);
    };
  }, [mapRef, data, showEarthquakes]);

  return hoveredEarthquake;
};
