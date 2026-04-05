import { useMemo } from "react";
import { useCities } from "../../hooks/useCities.ts";
import { Box } from "@mui/material";
import { KpiSection } from "../../components/KpiSection";
import { PageTitle } from "../../components/PageTitle";
import { ChartsSection } from "../../components/ChartsSection";

export const Dashboard = () => {
  const cityQuery = useCities();
  const cityData = useMemo(() => {
    return cityQuery.data ?? [];
  }, [cityQuery.data]);
  return (
    <Box sx={{ p: 3 }}>
      need to make some error message and spiiiinny circle in case of no data
      <PageTitle title="Global Overview" />
      {!cityQuery.isLoading && !cityQuery.isFetching && !cityQuery.error && (
        <>
          <KpiSection cities={cityData} />
          <ChartsSection cities={cityData} />
        </>
      )}
    </Box>
  );
};
