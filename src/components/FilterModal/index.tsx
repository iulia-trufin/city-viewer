import type { FilterModalProps } from "../../types/FilterModalProps.ts";
import type { FilterValue } from "../../types/GenericTableActionsProps.ts";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MultiSelectFilter } from "../MultiSelectFilter";

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
        <MultiSelectFilter
          label={filter.label}
          id={filter.id}
          value={(current as string[]) ?? []}
          options={options}
          onChange={(value) => handleChangeFilter(filter.id, value)}
        />
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
              sx={(theme) => ({
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

                "& .MuiInputBase-root": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                },

                "& input": {
                  color: theme.palette.text.primary,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              })}
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
              sx={(theme) => ({
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

                "& .MuiInputBase-root": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                },

                "& input": {
                  color: theme.palette.text.primary,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              })}
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
          sx: (theme) => ({
            borderRadius: 3,
            p: 2,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: "none",
            boxShadow: theme.shadows[24],
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: "1.1rem",
          pb: 4,
        }}
      >
        Filters
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/*filters arrangements*/}
          <Stack direction="row" spacing={3}>
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
          <Stack justifyContent="flex-end" spacing={2} direction="row" mt={2}>
            <Button
              onClick={() => {
                onClose();
                setFilterState({});
                setTempFilterState({});
              }}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                onClose();
                setFilterState(tempFilterState);
              }}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
              }}
            >
              Apply
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
