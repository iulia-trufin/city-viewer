import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountries } from "../../api/Countries.ts";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { Country } from "../../types/Country.ts";
import type { TableColumn } from "../../types/TableColumn.ts";
import { useState } from "react";

export const CountryPopulationPage = () => {
  const [search, setSearch] = useState("");
  const countryQuery = useQuery({
    queryKey: ["cities"],
    placeholderData: {},
    queryFn: async () => {
      const apiRes = await axios(getCountries());
      const countries = apiRes.data?.geonames ?? [];
      //converting from array to object of objects for performance PTSD
      const result: Record<number, Country> = {};
      countries.forEach((country: Country) => {
        if (!result[country.geonameId]) {
          result[country.geonameId] = country;
        }
      });
      return result;
    },
  });

  const countryColumns: TableColumn<Country>[] = [
    { id: "countryName", label: "Country" },
    { id: "countryCode", label: "Code" },
    { id: "capital", label: "Capital" },
    { id: "continentName", label: "Continent" },
    { id: "population", label: "Population" },
  ];
  const countryData = countryQuery.data ? Object.values(countryQuery.data) : [];

  if (countryQuery.isFetched) {
    return (
      <Box sx={{ p: 3 }}>
        {/*header and its actions*/}
        <Toolbar
          sx={{
            px: 3,
            py: 2,
            borderBottom: "1px solid #eee",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Countries
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  minWidth: 220,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#fafafa",
                  },
                }}
              />
              <IconButton
                sx={{
                  border: "1px solid #eee",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <FilterListOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #eee",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <FileDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
        {/*actual table and its contents*/}
        <TableContainer
          sx={{
            borderRadius: 3,
            border: "1px solid #eee",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#fafafa",
                }}
              >
                {countryColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      color: "#666",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {countryQuery.isLoading && (
                <TableRow>
                  <TableCell colSpan={countryColumns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {countryQuery.error && (
                <TableRow>
                  <TableCell colSpan={countryColumns.length} align="center">
                    No records found. Please check with us.
                  </TableCell>
                </TableRow>
              )}
              {countryQuery.isFetched &&
                countryData.map((row) => (
                  <TableRow
                    key={row.geonameId}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {countryColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            borderBottom: "1px solid #f5f5f5",
                            fontSize: "0.9rem",
                            py: 1.5,
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};

export default CountryPopulationPage;
