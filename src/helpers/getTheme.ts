import { darkTheme, lightTheme } from "../constants/theme.ts";
import type { Mode } from "../types/ThemeProps.ts";

export const getTheme = (mode: Mode) => {
  return mode === "light" ? lightTheme : darkTheme;
};
