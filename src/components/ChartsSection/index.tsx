import { Box, Stack } from "@mui/material";
import { GenericChart } from "../GenericChart";
import { getPopulationDistribution } from "../../helpers/getPopulationDistribution.ts";
import type { City } from "../../types/City.ts";
import { getTopCities } from "../../helpers/getTopCities.ts";

export const ChartsSection = ({ cities }: { cities: City[] }) => {
  const populationDistribution = getPopulationDistribution(cities);
  const topCities = getTopCities(cities);
  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1 }}>
          <GenericChart
            title="Population Distribution"
            type="donut"
            categories={populationDistribution.categories}
            series={populationDistribution.series}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <GenericChart
            title="Top 10 Cities"
            type="bar"
            categories={topCities.categories}
            series={topCities.series}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
