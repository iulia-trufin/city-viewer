import { useMemo } from "react";
import { useCities } from "../../hooks/useCities.ts";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { KpiSection } from "../../components/KpiSection";
import { PageTitle } from "../../components/PageTitle";
import { ChartsSection } from "../../components/ChartsSection";
import { InsightSection } from "../../components/InsightSection";

export const Dashboard = () => {
  const cityQuery = useCities();
  const cityData = useMemo(() => {
    return cityQuery.data ?? [];
  }, [cityQuery.data]);
  const isLoading = cityQuery.isLoading || cityQuery.isFetching;
  const isError = !!cityQuery.error;
  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Global Overview" />
      {isLoading && !isError && (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={100} />
        </Stack>
      )}
      {!isLoading && isError && (
        <Typography
          sx={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 32,
          }}
        >
          Something went wrong while fetching the data. Please try again or
          check with us.
        </Typography>
      )}
      {!isLoading && !isError && (
        <>
          <KpiSection cities={cityData} />
          <ChartsSection cities={cityData} />
          <InsightSection cities={cityData} />
        </>
      )}
    </Box>
  );
};
