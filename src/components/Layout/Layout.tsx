import { Box } from "@mui/material";
import { Header } from "../Header/Header.tsx";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
