import type { KpiCardProps } from "../../types/KpiCardProps.ts";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export const KpiCard = ({ title, value, subtitle, icon }: KpiCardProps) => {
  return (
    <Card
      sx={{
        flex: 1,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack direction="column" spacing={1.5}>
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
                fontWeight: 500,
                color: "text.secondary",
              }}
              variant="body2"
            >
              {title}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
