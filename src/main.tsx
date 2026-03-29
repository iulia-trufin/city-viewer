import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "./helpers/getTheme.ts";

const queryClient = new QueryClient();
const mode: "light" | "dark" = "dark";

const root = createRoot(document.getElementById("root")!);

root.render(
  <ThemeProvider theme={getTheme(mode)}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>,
);
