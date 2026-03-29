import { Stack } from "@mui/material";
import type { Country } from "../../types/Country.ts";
import Flag from "react-flagkit";
import { GenericTable } from "../../components/GenericTable";
import { useSort } from "../../hooks/useSort.ts";
import { sortData } from "../../helpers/sortData.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import { useContries } from "../../hooks/useContries.ts";
import { countryColumns } from "../../constants/countryColumns.ts";
import { useTableSearch } from "../../hooks/useTableSearch.ts";
import { useTableExport } from "../../hooks/useTableExport.ts";

export const CountryPopulation = () => {
  const { order, orderBy, handleSort } = useSort<Country>();
  const countryQuery = useContries();

  const countryData = countryQuery.data ? Object.values(countryQuery.data) : [];

  //only searching in the displayed columns, no point to search ids or geolocations
  const searchKeys = countryColumns.map((col) => col.id);

  const { search, setSearch, searchedData } = useTableSearch(
    countryData,
    searchKeys,
  );

  const sortedData = sortData(searchedData, orderBy, order);

  const { exportCSV } = useTableExport<Country>();
  const handleExport = () => {
    exportCSV(searchedData, countryColumns, "Countries");
  };

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
      totalCount={searchedData.length}
      search={search}
      onSearchChange={setSearch}
      onFilterClick={() => {}}
      onExportClick={handleExport}
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
