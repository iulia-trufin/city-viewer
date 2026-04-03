import { useNavigate } from "react-router-dom";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import { menuItems } from "../../constants/menuItems.ts";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        height: "calc(100vh - 64px)",
        position: "fixed",
        top: 64,
        left: 0,
        backgroundColor: "background.paper",
        paddingTop: 2,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        sx={{
          px: 2,
          pb: 1,
          fontSize: 12,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Navigation
      </Typography>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                mb: 1,
                px: 2.5,
                borderRadius: 2,
                position: "relative",
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
                "&::before": isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 2,
                      backgroundColor: "primary.main",
                    }
                  : {},
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "text.primary" : "text.secondary",
                }}
              >
                {item.label}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
