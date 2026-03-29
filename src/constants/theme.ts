import { createTheme, type ThemeOptions } from "@mui/material/styles";

const baseTheme: ThemeOptions = {
  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "'Noto Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
};

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
});

export const darkTheme = createTheme({
  palette: darkPalette,
  ...baseTheme,
});
