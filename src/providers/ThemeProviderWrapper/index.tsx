import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Mode, ThemeProps } from "../../types/ThemeProps.ts";
import { getTheme } from "../../helpers/getTheme.ts";
import { ThemeProvider } from "@mui/material";

/* eslint-disable react-refresh/only-export-components */
const ThemeModeContext = createContext<ThemeProps>({
  mode: "light",
  onToggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("light");
  const onToggleTheme = () => {
    setMode((prevMode) => {
      return prevMode === "light" ? "dark" : "light";
    });
  };
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ThemeModeContext.Provider value={{ mode, onToggleTheme }}>
      <ThemeProvider theme={theme}> {children} </ThemeProvider>{" "}
    </ThemeModeContext.Provider>
  );
};
