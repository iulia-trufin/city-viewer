// maplibre uses [lng, lat] and not [lat, lng}
import type { ContinentKey } from "../types/ContinentKey.ts";

export const continentsCoords: Record<
  ContinentKey,
  { name: string; center: [number, number]; zoom: number }
> = {
  europe: { name: "Europe", center: [15, 54], zoom: 2.7 },
  asia: { name: "Asia", center: [100, 34], zoom: 2.5 },
  africa: { name: "Africa", center: [20, 1], zoom: 2.5 },
  north_america: { name: "North America", center: [-100, 40], zoom: 2 },
  south_america: { name: "South America", center: [-60, -15], zoom: 2.3 },
  oceania: { name: "Oceania", center: [135, -25], zoom: 2.5 },
  antarctica: {
    name: "Antarctica",
    center: [0, -75],
    zoom: 1.5,
  },
};
