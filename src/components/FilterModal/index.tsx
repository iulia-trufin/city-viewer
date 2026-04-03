import type { FilterModalProps } from "../../types/FilterModalProps.ts";
import type { FilterValue } from "../../types/GenericTableActionsProps.ts";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function FilterModal<T>({
  open,
  onClose,
  filters,
  data,
  filterState,
  setFilterState,
}: FilterModalProps<T>) {
  const [tempFilterState, setTempFilterState] = useState(filterState);
  const mid = Math.ceil(filters.length / 2);
  const leftFilters = filters.slice(0, mid);
  const rightFilters = filters.slice(mid);

  const handleChangeFilter = (id: string, value: FilterValue) => {
    setTempFilterState((prev) => {
      if (Array.isArray(value) && !value.length) {
        //it's so that we don't have leftover empty filters like countries: [], so we're removing "countries"
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: value };
    });
  };

  //avoiding duplication by rewriting the same code for both left and right sides of modal
  const renderFilter = (filter: (typeof filters)[number]) => {
    const current = tempFilterState[filter.id];
    // dropdown
    if (filter.type === "dropdown") {
      const options = Array.from(
        new Set(
          data.map((item) => {
            return String(item[filter.id as keyof T] ?? "");
          }),
        ),
      )
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "no"));
      return (
        <Stack spacing={0.5} sx={{ flex: 1, maxWidth: 300 }}>
          <Typography
            variant="body2"
            sx={{ textTransform: "uppercase", fontSize: "0.7rem" }}
          >
            {filter.label}
          </Typography>
          <Select
            key={filter.id}
            multiple
            value={(current as string[]) ?? []}
            onChange={(e) => {
              const value = e.target.value as string[];
              handleChangeFilter(filter.id, value);
            }}
            input={<OutlinedInput />}
            sx={{
              height: 40,
              maxWidth: 300,
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
              const selected = (current as string[])?.includes(option);
              return (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={!!selected} size={"small"}></Checkbox>
                  <ListItemText primary={option} />
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
      );
    }
    //range
    if (filter.type === "range") {
      const value = (current as { min?: number; max?: number }) || {};
      return (
        <Stack
          direction="column"
          spacing={0.5}
          sx={{ flex: 1, maxWidth: 300 }}
          key={filter.id}
        >
          <Typography
            variant="body2"
            sx={{ textTransform: "uppercase", fontSize: "0.7rem" }}
          >
            {filter.label}
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              type="number"
              placeholder="Min"
              value={value.min ?? ""}
              onChange={(e) =>
                handleChangeFilter(filter.id, {
                  ...value,
                  min:
                    e.target.value === "" ? undefined : Number(e.target.value),
                })
              }
              size="small"
              sx={{
                height: 40,
                maxWidth: 150,
                fontSize: "0.8rem",

                "& input[type=number]": {
                  MozAppearance: "textfield", // Firefox hiding the arrows
                },

                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Chrome/Safari/Edge/anything normal hiding the arrows
                    margin: 0,
                  },

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
            />
            <TextField
              type="number"
              placeholder="Max"
              value={value.max ?? ""}
              onChange={(e) =>
                handleChangeFilter(filter.id, {
                  ...value,
                  max:
                    e.target.value === "" ? undefined : Number(e.target.value),
                })
              }
              size="small"
              sx={{
                height: 40,
                maxWidth: 150,
                fontSize: "0.8rem",

                "& input[type=number]": {
                  MozAppearance: "textfield", // Firefox hiding the arrows
                },

                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none", // Chrome/Safari/Edge/anything normal hiding the arrows
                    margin: 0,
                  },

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
            />
          </Stack>
        </Stack>
      );
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        },
      }}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {/*filters arrangements*/}
          <Stack spacing={2} direction="row">
            {/* left column*/}
            <Stack spacing={3} flex={1}>
              {leftFilters.map(renderFilter)}
            </Stack>
            {/* right column*/}
            <Stack spacing={3} flex={1}>
              {rightFilters.map(renderFilter)}
            </Stack>
          </Stack>
          {/*clear and apply buttons*/}
          <Stack justifyContent="flex-end" spacing={2} direction="row">
            <Button
              onClick={() => {
                onClose();
                setFilterState({});
                setTempFilterState({});
              }}
              variant="outlined"
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                onClose();
                setFilterState(tempFilterState);
              }}
              variant="contained"
            >
              Apply
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
