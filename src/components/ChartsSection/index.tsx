import { Box, Stack } from "@mui/material";
import { GenericChart } from "../GenericChart";
import { getPopulationDistribution } from "../../helpers/getPopulationDistribution.ts";
import type { City } from "../../types/City.ts";
import { getTopCities } from "../../helpers/getTopCities.ts";
import { getCitiesPerCountry } from "../../helpers/getCitiesPerCountry.ts";
import { getPopulationPerCountry } from "../../helpers/getPopulationPerCountry.ts";

export const ChartsSection = ({ cities }: { cities: City[] }) => {
  const populationDistribution = getPopulationDistribution(cities);
  const topCities = getTopCities(cities);
  const citiesPerCountry = getCitiesPerCountry(cities);
  const populationPerCountry = getPopulationPerCountry(cities);
  return (
    <Stack spacing={3} sx={{ pt: 3 }}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1 }}>
          <GenericChart
            title="Population Distribution"
            type="pie"
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
      <Stack direction="row" spacing={3}>
        <Box sx={{ flex: 1 }}>
          <GenericChart
            title="Cities per Country"
            type="bar"
            categories={citiesPerCountry.categories}
            series={citiesPerCountry.series}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <GenericChart
            title="Population per Country"
            type="bar"
            categories={populationPerCountry.categories}
            series={populationPerCountry.series}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
