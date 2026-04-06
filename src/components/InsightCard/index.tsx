import type { InsightCardProps } from "../../types/InsightCardProps.ts";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export const InsightCard = ({ title, description, icon }: InsightCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        width: "100%",
        backgroundColor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
            }}
            spacing={1.5}
          >
            {icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "action.hover",
                  color: "text.secondary",
                }}
              >
                {icon}
              </Box>
            )}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.2,
                color: "text.secondary",
              }}
            >
              {description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
