import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import type { ContinentKey } from "../../types/ContinentKey.ts";
import { continentsCoords } from "../../constants/continentsCoords.ts";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useCountryPolygons } from "../../hooks/useCountryPolygons.ts";
import { useCityLocations } from "../../hooks/useCityLocations.ts";
import { useSessionStorageState } from "../../hooks/useSessionStorageState.ts";
import { useDetectedContinent } from "../../hooks/useDetectedContinent.ts";
import { useMapBounds } from "../../hooks/useMapBounds.ts";
import { useCountryLayers } from "../../hooks/useCountryLayers.ts";
import { useCitiesLayer } from "../../hooks/useCitiesLayer.ts";

export const ContinentalMap = () => {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const countryPolygonsQuery = useCountryPolygons();
  const [continent, setContinent] = useDetectedContinent();
  const [showCities, setShowCities] = useSessionStorageState(
    "showCities",
    true,
  );
  const bounds = useMapBounds(mapRef, continent);
  const cityLocationsQuery = useCityLocations(bounds);
  const hoveredCountry = useCountryLayers(
    mapRef,
    countryPolygonsQuery.data,
    theme,
  );

  useCitiesLayer(mapRef, cityLocationsQuery.data, showCities);

  const mapApiKey = import.meta.env.VITE_MAP_STYLE_KEY;

  //initialising the map once
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style:
        theme.palette.mode === "light"
          ? `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${mapApiKey}`
          : `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${mapApiKey}`,
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
        ? `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${mapApiKey}`
        : `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${mapApiKey}`,
    );
  }, [theme]);

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
          <FormControlLabel
            control={
              <Switch
                checked={showCities}
                onChange={(e) => setShowCities(e.target.checked)}
              />
            }
            label="Show cities"
          />
        </Stack>
        <Box
          sx={{
            position: "relative",
            height: "80vh",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            ref={containerRef}
            sx={{
              height: "80vh",
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          />
          {hoveredCountry && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                px: 2,
                py: 1,
                borderRadius: 2,
                zIndex: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(18,18,18,0.9)"
                    : "rgba(255,255,255,0.92)",
                boxShadow: 3,
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {hoveredCountry}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
