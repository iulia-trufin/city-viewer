import type { FilterConfig, FilterValue } from "./GenericTableActionsProps.ts";

export type FilterModalProps<T> = {
  open: boolean;
  onClose: () => void;
  filters: FilterConfig[];
  data: T[];
  filterState: Record<string, FilterValue>;
  setFilterState: (state: Record<string, FilterValue>) => void;
};
