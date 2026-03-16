import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountries } from "../../api/Countries.ts";
import { Box } from "@mui/material";

export const CountryPopulationPage = () => {
  const countryQuery = useQuery({
    queryKey: ["cities"],
    placeholderData: {},
    queryFn: async () => {
      const res = await axios(getCountries());
      return res.data;
    },
  });

  if (countryQuery.isLoading) {
    return <>Loading........</>;
  }
  if (countryQuery.error) {
    return <>ERROR</>;
  }
  if (countryQuery.isFetched) {
    return (
      <Box>
        {countryQuery.data.geonames?.map((country) => (
          <>{country.countryName}</>
        ))}
      </Box>
    );
  }
};

export default CountryPopulationPage;
