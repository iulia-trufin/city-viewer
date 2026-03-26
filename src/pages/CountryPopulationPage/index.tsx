import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCountries } from "../../api/Countries.ts";
import { Stack } from "@mui/material";
import type { Country } from "../../types/Country.ts";
import type { TableColumn } from "../../types/TableColumn.ts";
import { type ChangeEvent, useState } from "react";
import Flag from "react-flagkit";
import { GenericTable } from "../../components/GenericTable";

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
    <GenericTable
      title="Countries"
      data={paginatedData}
      columns={countryColumns}
      loading={countryQuery.isLoading || countryQuery.isFetching}
      error={!!countryQuery.error}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={countryData.length}
      search={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      onFilterClick={() => {}}
      onExportClick={() => {}}
      orderBy={orderBy}
      order={order}
      onSort={handleSort}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsChange}
      cell={(row, column) => {
        const value = row[column.id];

        if (column.id === "countryName") {
          return (
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
          );
        }

        return value;
      }}
    />
  );
};

export default CountryPopulationPage;
