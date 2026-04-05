import { Typography } from "@mui/material";

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
    >
      {title}
    </Typography>
  );
};
