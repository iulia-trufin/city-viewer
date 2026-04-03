import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Menu } from "../Menu";

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Menu />
        <Box
          sx={{
            marginLeft: "240px",
            padding: 2,
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
