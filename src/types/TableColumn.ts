export type TableColumn<T> = {
  id: keyof T;
  label: string;
};
