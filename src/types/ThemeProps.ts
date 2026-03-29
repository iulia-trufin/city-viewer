export type Mode = "light" | "dark";

export type ThemeProps = {
  mode: Mode;
  onToggleTheme: () => void;
};
