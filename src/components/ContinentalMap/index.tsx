import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { ContinentKey } from "../../types/ContinentKey.ts";
import { continentsCoords } from "../../constants/continentsCoords.ts";
import { getContinentFromCoords } from "../../helpers/getContinentFromCoords.ts";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export const ContinentalMap = () => {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [continent, setContinent] = useState<ContinentKey | null>(null);
  const theme = useTheme();

  //initialising the map once on the first continent
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style:
        theme.palette.mode === "light"
          ? "https://tiles.stadiamaps.com/styles/alidade_smooth.json"
          : "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
      center: [0, 0],
      zoom: 2,
      attributionControl: false,
    });

    //dispose of the map
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    mapRef.current.setStyle(
      theme.palette.mode === "light"
        ? "https://tiles.stadiamaps.com/styles/alidade_smooth.json"
        : "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
    );
  }, [theme]);

  //detect user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const detected = getContinentFromCoords(
        pos.coords.latitude,
        pos.coords.longitude,
      );
      setContinent(detected);
    });
  }, []);

  //on changing the continent update the map
  useEffect(() => {
    if (!mapRef.current || !continent) {
      return;
    }

    const selected = continentsCoords[continent];

    mapRef.current.flyTo({
      center: selected.center,
      zoom: selected.zoom,
      essential: true,
    });
  }, [continent]);

  //if you use firefox you might wait a bit because of how its privacy is set up. fun

  return (
    <Box
      sx={{
        p: 3,
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {!continent && (
        <Stack
          sx={{
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.35)",
            zIndex: 1,
          }}
        >
          <CircularProgress size={100} />
        </Stack>
      )}
      <Stack gap={2} sx={{ flex: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Continental Map
          </Typography>
          <Select
            value={continent ?? ""}
            onChange={(e) => setContinent(e.target.value as ContinentKey)}
            size="small"
            sx={{
              minWidth: 180,
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.grey[100],
            }}
          >
            {Object.entries(continentsCoords).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Box
          ref={containerRef}
          sx={{
            height: "80vh",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        />
      </Stack>
    </Box>
  );
};
