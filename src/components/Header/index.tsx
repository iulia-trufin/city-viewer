import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useThemeMode } from "../../providers/ThemeProviderWrapper";

export const Header = () => {
  const { mode, onToggleTheme } = useThemeMode();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        backdropFilter: "blur(10px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.8)"
            : "rgba(15,15,15,0.8)",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <LocationCityOutlinedIcon fontSize="medium" />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.02rem",
            }}
          >
            UrbanScope
          </Typography>
        </Stack>
        <IconButton
          onClick={onToggleTheme}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          {mode === "light" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
