import { Box, Button, Stack, Typography } from "@mui/material";
import Flag from "react-flagkit";
import { GenericTable } from "../../components/GenericTable";
import { useSort } from "../../hooks/useSort.ts";
import { sortData } from "../../helpers/sortData.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import { useTableSearch } from "../../hooks/useTableSearch.ts";
import { useTableExport } from "../../hooks/useTableExport.ts";
import { useMemo, useState } from "react";
import { FilterModal } from "../../components/FilterModal";
import { useCities } from "../../hooks/useCities.ts";
import type { City } from "../../types/City.ts";
import { cityColumns } from "../../constants/cityColumns.ts";
import { cityFilters } from "../../constants/cityFilters.ts";
import { MultiSelectFilter } from "../../components/MultiSelectFilter";
import { useTableFilters } from "../../hooks/useTableFilters.ts";

export const CityPopulation = () => {
  const { order, orderBy, handleSort } = useSort<City>();
  const cityQuery = useCities();

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [tempCountries, setTempCountries] = useState<string[]>([]);
  const [tempTypes, setTempTypes] = useState<string[]>([]);

  const cityData = useMemo(() => {
    return cityQuery.data ?? [];
  }, [cityQuery.data]);

  const countryOptions = useMemo(() => {
    return Array.from(new Set(cityData.map((city) => city.country)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [cityData]);

  const typeOptions = useMemo(() => {
    return Array.from(new Set(cityData.map((city) => city.type)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [cityData]);

  const selectedData = useMemo(() => {
    if (!selectedCountries.length || !selectedTypes.length) {
      return [];
    }
    return cityData.filter(
      (city) =>
        selectedCountries.includes(city.country) &&
        selectedTypes.includes(city.type),
    );
  }, [cityData, selectedCountries, selectedTypes]);

  //only searching in the displayed columns, no point to search ids or geolocations
  const searchKeys = cityColumns.map((col) => col.id);

  const { search, setSearch, searchedData } = useTableSearch(
    selectedData,
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

  const FilterBar = (
    <Stack
      direction="row"
      spacing={5}
      sx={{
        mb: 2,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <MultiSelectFilter
        label="Country"
        id="country"
        value={tempCountries}
        options={["__All", ...countryOptions]}
        onChange={setTempCountries}
        maxWidth={500}
      />
      <MultiSelectFilter
        label="City Type"
        id="type"
        value={tempTypes}
        options={["__All", ...typeOptions]}
        onChange={setTempTypes}
        maxWidth={500}
      />
      <Button
        variant="contained"
        disabled={!tempCountries.length || !tempTypes.length}
        onClick={() => {
          setSelectedCountries(tempCountries);
          setSelectedTypes(tempTypes);
        }}
        sx={{
          textTransform: "none",
          borderRadius: 2,
        }}
        size="small"
      >
        Apply
      </Button>
    </Stack>
  );

  return (
    <>
      {!selectedCountries.length || !selectedTypes.length ? (
        <Stack
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          spacing={4}
        >
          <Typography variant="h5" textAlign="center">
            Select at least one country and city type to load a list of cities
          </Typography>
          {FilterBar}
        </Stack>
      ) : (
        <>
          <Box sx={{ p: 3 }}>
            {FilterBar}
            {selectedData.length > 25000 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                Performance may be affected due to the volume of results. Please
                refine your filters to improve responsiveness.
              </Typography>
            )}
          </Box>
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
        </>
      )}
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={cityFilters}
        data={selectedData}
        filterState={filterState}
        setFilterState={setFilterState}
      />
    </>
  );
};
