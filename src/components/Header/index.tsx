import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.8)",
        color: "text.primary",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <PublicOutlinedIcon fontSize="medium" />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.02rem",
            }}
          >
            UrbanScope
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
