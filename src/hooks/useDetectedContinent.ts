import type { ContinentKey } from "../types/ContinentKey.ts";
import { useEffect, useState } from "react";
import { getContinentFromCoords } from "../helpers/getContinentFromCoords.ts";

export const useDetectedContinent = () => {
  const [continent, setContinent] = useState<ContinentKey | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const detected = getContinentFromCoords(
        pos.coords.latitude,
        pos.coords.longitude,
      );
      setContinent(detected);
    });
  }, []);

  return [continent, setContinent] as const;
};
