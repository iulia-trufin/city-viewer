import type { MultiSelectFilterProps } from "../../types/MultiSelectFilterProps.ts";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export const MultiSelectFilter = ({
  label,
  id,
  value,
  options,
  onChange,
  maxWidth = 300,
}: MultiSelectFilterProps) => {
  return (
    <Stack
      spacing={0.5}
      sx={{ flex: 1, maxWidth, minWidth: 300, width: "100%" }}
    >
      <Typography
        variant="body2"
        sx={{ textTransform: "uppercase", fontSize: "0.7rem" }}
      >
        {label}
      </Typography>
      <Select
        key={id}
        multiple
        value={value}
        onChange={(e) => {
          const newValue = e.target.value as string[];
          const hasAll = newValue.includes("__All");
          const hadAll = value.includes("__All");
          //click all
          if (!hadAll && hasAll) {
            onChange(options);
            return;
          }
          //unclick all
          if (!hasAll && hadAll) {
            onChange([]);
            return;
          }
          //user manually selects all the items without clicking "All".... why???
          if (
            newValue.filter((v) => v !== "__All").length ===
            options.length - 1
          ) {
            onChange(options);
            return;
          }
          //user deselects one item from all selected
          onChange(newValue.filter((v) => v !== "__All"));
        }}
        input={<OutlinedInput />}
        sx={{
          height: 40,
          maxWidth,
          fontSize: "0.8rem",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
        }}
        renderValue={(selected) => {
          const values = selected as string[];
          if (values.length === 0) {
            return "";
          }
          if (values.length === options.length) {
            return "All";
          }
          //going to show only the first 2 values selected, or not if they don't fit
          const firstTwo = values.slice(0, 2);
          const text = firstTwo.join(", ");
          const maxLength = 60;
          if (values.length > 2 || text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
          }
          return text;
        }}
      >
        {options.map((option) => {
          const isAll = option === "__All";
          const selected = isAll
            ? value.length === options.length
            : value.includes(option);
          return (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selected} size={"small"}></Checkbox>
              <ListItemText primary={isAll ? "All" : option} />
            </MenuItem>
          );
        })}
      </Select>
    </Stack>
  );
};
