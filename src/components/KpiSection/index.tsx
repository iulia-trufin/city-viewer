import type { City } from "../../types/City.ts";
import { Stack } from "@mui/material";
import { KpiCard } from "../KpiCard";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

export const KpiSection = ({ cities }: { cities: City[] }) => {
  const totalCities = cities?.length;
  let totalPopulation = 0;
  cities.forEach((city) => {
    totalPopulation += city.population || 0;
  });
  const avgPopulation =
    totalCities > 0 ? Math.round(totalPopulation / totalCities) : 0;
  let largestCity = "-";
  let max = 0;
  cities.forEach((city) => {
    if (city.population > max) {
      max = city.population;
      largestCity = city.cityName;
    }
  });

  return (
    <Stack direction="row" spacing={3} sx={{ pt: 3 }}>
      <KpiCard
        title="Total Cities"
        value={totalCities?.toLocaleString()}
        subtitle="All the cities available"
        icon={<DomainOutlinedIcon fontSize="small" />}
      />
      <KpiCard
        title="Total Population"
        value={totalPopulation.toLocaleString()}
        subtitle="Sum of all listed cities"
        icon={<PublicOutlinedIcon fontSize="small" />}
      />
      <KpiCard
        title="Avg City Population"
        value={avgPopulation.toLocaleString()}
        subtitle="Average of all listed cities"
        icon={<PersonOutlinedIcon fontSize="small" />}
      />
      <KpiCard
        title="Largest City"
        value={largestCity}
        subtitle={`${max.toLocaleString()} people`}
        icon={<ExploreOutlinedIcon fontSize="small" />}
      />
    </Stack>
  );
};
