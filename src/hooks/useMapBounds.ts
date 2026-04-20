import type { MapBounds } from "../types/MapBounds.ts";
import type { ContinentKey } from "../types/ContinentKey.ts";
import { useEffect, useState } from "react";

export const useMapBounds = (
  mapRef: React.RefObject<maplibregl.Map | null>,
  continent: ContinentKey | null,
) => {
  const [bounds, setBounds] = useState<MapBounds | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !continent) return;

    const updateBounds = () => {
      const mapBounds = map.getBounds();

      setBounds({
        north: mapBounds.getNorth(),
        south: mapBounds.getSouth(),
        east: mapBounds.getEast(),
        west: mapBounds.getWest(),
      });
    };

    map.on("moveend", updateBounds);
    map.once("idle", updateBounds);

    return () => {
      map.off("moveend", updateBounds);
    };
  }, [continent, mapRef]);

  return bounds;
};
