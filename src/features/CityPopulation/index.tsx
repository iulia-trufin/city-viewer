import { Stack } from "@mui/material";
import Flag from "react-flagkit";
import { GenericTable } from "../../components/GenericTable";
import { useSort } from "../../hooks/useSort.ts";
import { sortData } from "../../helpers/sortData.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import { useTableSearch } from "../../hooks/useTableSearch.ts";
import { useTableExport } from "../../hooks/useTableExport.ts";
import { useTableFilters } from "../../helpers/useTableFilters.ts";
import { useState } from "react";
import { FilterModal } from "../../components/FilterModal";
import { useCities } from "../../hooks/useCities.ts";
import type { City } from "../../types/City.ts";
import { cityColumns } from "../../constants/cityColumns.ts";
import { cityFilters } from "../../constants/cityFilters.ts";

export const CityPopulation = () => {
  const { order, orderBy, handleSort } = useSort<City>();
  const cityQuery = useCities();

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const cityData = cityQuery.data ? Object.values(cityQuery.data) : [];

  //only searching in the displayed columns, no point to search ids or geolocations
  const searchKeys = cityColumns.map((col) => col.id);

  const { search, setSearch, searchedData } = useTableSearch(
    cityData,
    searchKeys,
  );

  const { filterState, setFilterState, filteredData } = useTableFilters(
    searchedData,
    cityFilters,
  );

  const sortedData = sortData(filteredData, orderBy, order);

  const { exportCSV } = useTableExport<City>();
  const handleExport = () => {
    exportCSV(filteredData, cityColumns, "Cities");
  };

  const {
    page,
    rowsPerPage,
    paginatedData,
    handlePageChange,
    handleRowsChange,
  } = usePagination(sortedData);

  //raw data > searched data > filtered data > sorted data > paginated data

  return (
    <>
      <GenericTable
        title="Cities"
        data={paginatedData}
        columns={cityColumns}
        loading={cityQuery.isLoading || cityQuery.isFetching}
        error={!!cityQuery.error}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={sortedData.length}
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => setFilterModalOpen(true)}
        onExportClick={handleExport}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsChange}
        cell={(row, column) => {
          const value = row[column.id];

          if (column.id === "country") {
            return (
              <Stack
                direction="row"
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Flag country={row.countryIso2} size={15} />
                {value}
              </Stack>
            );
          }

          return value;
        }}
      />
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={cityFilters}
        data={cityData}
        filterState={filterState}
        setFilterState={setFilterState}
      />
    </>
  );
};
