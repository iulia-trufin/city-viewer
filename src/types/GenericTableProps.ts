import type { TableColumn } from "./TableColumn.ts";
import type { ChangeEvent, ReactNode } from "react";

export type GenericTableProps<T> = {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  loading: boolean;
  error: boolean;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (_: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cell: (row: T, column: TableColumn<T>) => ReactNode;
  search?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  orderBy?: keyof T | null;
  order?: "asc" | "desc";
  onSort?: (columnId: keyof T) => void;
};
