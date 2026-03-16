import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.1rem",
          }}
        >
          UrbanScope
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
