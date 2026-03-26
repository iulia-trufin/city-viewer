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
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import type { Country } from "../../types/Country.ts";
import type { TableColumn } from "../../types/TableColumn.ts";
import { type ChangeEvent, useState } from "react";
import Flag from "react-flagkit";

export const CountryPopulationPage = () => {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Country | null>(null);
  const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined);
  //mui is 0 based, so a normal human page starts from 0...
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const countryQuery = useQuery({
    queryKey: ["countries"],
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

  const handleSort = (columnId: keyof Country) => {
    if (orderBy === columnId) {
      if (order === "asc") {
        setOrder("desc");
      } else if (order === "desc") {
        setOrderBy(null);
        setOrder(undefined);
      }
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };

  const sortedData = [...countryData].sort((a, b) => {
    if (!orderBy || !order) {
      return 0;
    }
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    //population case so number handling
    if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
      if (order === "asc") {
        return Number(aValue) - Number(bValue);
      } else if (order === "desc") {
        return Number(bValue) - Number(aValue);
      }
    }
    //if normal so string
    if (
      order === "asc" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      return aValue.localeCompare(bValue);
    } else if (
      order === "desc" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      return bValue.localeCompare(aValue);
    }
    return 0;
    //not treating objects yet because no such case... yet
  });

  //MUI insists that I have the event param, but don't need it, so trying to ignore it cleanly
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const paginatedData: Country[] = [];
  const startIndex: number = page * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;
  sortedData.forEach((value: Country, index: number) => {
    if (index >= startIndex && index < endIndex) {
      paginatedData.push(value);
    }
  });

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
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid #eee",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/*actual table and its contents*/}
        <TableContainer
          sx={{
            overflow: "auto",
            maxHeight: "70vh",
          }}
        >
          <Table stickyHeader>
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
                      color: "#668",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort(column.id)}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(countryQuery.isLoading || countryQuery.isFetching) && (
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
                paginatedData.map((row) => (
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
                          {column.id === "countryName" ? (
                            <Stack
                              direction="row"
                              sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Flag country={row.countryCode} size={15} />
                              {value}
                            </Stack>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={countryData.length}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </Box>
    </Box>
  );
};

export default CountryPopulationPage;
