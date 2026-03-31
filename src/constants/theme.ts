import { createTheme, type ThemeOptions } from "@mui/material/styles";
import type { Mode } from "../types/ThemeProps.ts";

const baseTheme: ThemeOptions = {
  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "'Noto Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
};

const getScrollbarStyles = (mode: Mode) => ({
  "*": {
    scrollbarWidth: "thin",
    scrollbarColor: mode === "dark" ? "#888 #0f0f0f" : "#444 #ffffff",
  },

  "*::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },

  "*::-webkit-scrollbar-track": {
    background: mode === "dark" ? "#0f0f0f" : "#ffffff",
  },

  "*::-webkit-scrollbar-thumb": {
    backgroundColor: mode === "dark" ? "#888" : "#444",
    borderRadius: "8px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },

  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: mode === "dark" ? "#aaa" : "#222",
  },
});

const lightPalette: ThemeOptions["palette"] = {
  mode: "light",

  primary: {
    main: "#111111",
  },

  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },

  text: {
    primary: "#111111",
    secondary: "#666666",
  },

  divider: "#e0e0e0",
};

const darkPalette: ThemeOptions["palette"] = {
  mode: "dark",

  primary: {
    main: "#ffffff",
  },

  background: {
    default: "#0f0f0f",
    paper: "#161616",
  },

  text: {
    primary: "#ffffff",
    secondary: "#aaaaaa",
  },

  divider: "#2a2a2a",
};

export const lightTheme = createTheme({
  palette: lightPalette,
  ...baseTheme,
  components: {
    MuiCssBaseline: { styleOverrides: getScrollbarStyles("light") },
  },
});

export const darkTheme = createTheme({
  palette: darkPalette,
  ...baseTheme,
  components: {
    MuiCssBaseline: { styleOverrides: getScrollbarStyles("dark") },
  },
});
