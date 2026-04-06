import type { City } from "../../types/City.ts";
import { Stack } from "@mui/material";
import { InsightCard } from "../InsightCard";
import { getConcentration } from "../../helpers/getConcentration.ts";
import { getSmallCitiesPercentage } from "../../helpers/getSmallCitiesPercentage.ts";
import { getLargestCity } from "../../helpers/getLargestCity.ts";
import { getTopCountryByCityCount } from "../../helpers/getTopCountryByCityCount.ts";
import { getPopulationImbalance } from "../../helpers/getPopulationImbalance.ts";
import { getTopCountryByPopulation } from "../../helpers/getTopCountryByPopulation.ts";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

export const InsightSection = ({ cities }: { cities: City[] }) => {
  const topConcentration = getConcentration(cities);
  const smallCitiesPctg = getSmallCitiesPercentage(cities);
  const largestCity = getLargestCity(cities);
  const topCityCountry = getTopCountryByCityCount(cities);
  const imbalance = getPopulationImbalance(cities);
  const topPopulationCountry = getTopCountryByPopulation(cities);

  return (
    <Stack sx={{ pt: 3 }} spacing={3}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <InsightCard
          title="Population is highly concentrated"
          description={`Top 10 cities account for ${topConcentration}% of total population`}
          icon={<ShowChartOutlinedIcon fontSize="small" />}
        />
        <InsightCard
          title="Small cities insight"
          description={`${smallCitiesPctg}% of the cities have fewer than 100k inhabitants`}
          icon={<PieChartOutlineOutlinedIcon fontSize="small" />}
        />
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <InsightCard
          title="Extreme outlier detected"
          description={`${largestCity.city} is ${largestCity.ratio}x larger than the average city`}
          icon={<WarningAmberOutlinedIcon fontSize="small" />}
        />
        <InsightCard
          title="Country dominance by city count"
          description={`${topCityCountry.country} contains ${topCityCountry.percentage}% of all the cities`}
          icon={<AccountTreeOutlinedIcon fontSize="small" />}
        />
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-between" }}
      >
        <InsightCard
          title="Population distribution can be skewed"
          description={
            imbalance.isImbalanced
              ? `Average population (${imbalance.avg.toLocaleString()}) is significantly higher than the median (${imbalance.median.toLocaleString()}), indicating strong concentration in a few large cities`
              : `Population is relatively evenly distributed across cities`
          }
          icon={<CompareArrowsOutlinedIcon fontSize="small" />}
        />
        <InsightCard
          title="Population concentration by country"
          description={`${topPopulationCountry.country} accounts for ${topPopulationCountry.percentage}% of the total population`}
          icon={<LanguageOutlinedIcon fontSize="small" />}
        />
      </Stack>
    </Stack>
  );
};
