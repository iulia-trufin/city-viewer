import type { GenericTableProps } from "../../types/GenericTableProps.ts";
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
            {title}
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
              onChange={onSearchChange}
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
              onClick={onFilterClick}
            >
              <FilterListOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
              onClick={onExportClick}
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
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      color: "#668",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                    }}
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
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={String(column.id)}
                          sx={{
                            borderBottom: "1px solid #f5f5f5",
                            fontSize: "0.9rem",
                            py: 1.5,
                          }}
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
