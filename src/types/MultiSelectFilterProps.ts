export type MultiSelectFilterProps = {
  label: string;
  id: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  maxWidth?: number;
};
