export type GenericTableActionsProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  showSearch?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
};

export type FilterType = "dropdown" | "range" | "date";

export type FilterConfig = {
  id: string;
  label: string;
  type: FilterType;
};

export type UseGenericTableActionsProps<T> = {
  data: T[];
  filters?: FilterConfig[];
};
