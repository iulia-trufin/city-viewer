import { Stack } from "@mui/material";
import type { Country } from "../../types/Country.ts";
import { useState } from "react";
import Flag from "react-flagkit";
import { GenericTable } from "../../components/GenericTable";
import { useSort } from "../../hooks/useSort.ts";
import { sortData } from "../../helpers/sortData.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import { useContries } from "../../hooks/useContries.ts";
import { countryColumns } from "../../constants/countryColumns.ts";

export const CountryPopulation = () => {
  const [search, setSearch] = useState("");

  const { order, orderBy, handleSort } = useSort<Country>();
  const countryQuery = useContries();

  const countryData = countryQuery.data ? Object.values(countryQuery.data) : [];

  const sortedData = sortData(countryData, orderBy, order);

  const {
    page,
    rowsPerPage,
    paginatedData,
    handlePageChange,
    handleRowsChange,
  } = usePagination(sortedData);

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

export default CountryPopulation;
