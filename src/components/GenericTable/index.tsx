import type { GenericTableProps } from "../../types/GenericTableProps.ts";
import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
} from "@mui/material";
import { GenericTableActions } from "../GenericTableActions";
import { PageTitle } from "../PageTitle";

export function GenericTable<T>({
  title,
  data,
  columns,
  loading = false,
  error = false,
  page = 0,
  rowsPerPage = 10,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  cell,
  search = "",
  onSearchChange,
  onFilterClick,
  onExportClick,
  orderBy = null,
  order,
  onSort,
}: GenericTableProps<T>) {
  return (
    <Box sx={{ p: 3 }}>
      {/*header and its actions*/}
      <Toolbar
        sx={(theme) => ({
          px: 3,
          py: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <PageTitle title={title} />
          <GenericTableActions
            search={search}
            onSearchChange={onSearchChange}
            onFilterClick={onFilterClick}
            onExportClick={onExportClick}
          />
        </Stack>
      </Toolbar>
      <Box
        sx={{
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
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.paper,
                })}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    sx={(theme) => ({
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      color: theme.palette.text.secondary,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      cursor: "pointer",
                    })}
                    onClick={() => onSort?.(column.id)}
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
              {loading && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No records found. Please check with us.
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                !error &&
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={(theme) => ({
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      transition: "background-color 0.2s ease",
                    })}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={String(column.id)}
                          sx={(theme) => ({
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            fontSize: "0.9rem",
                            py: 1.5,
                          })}
                        >
                          {cell
                            ? cell(row, column)
                            : String(row[column.id] ?? "")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={totalCount}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
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
}
