import type { GenericTableActionsProps } from "../../types/GenericTableActionsProps.ts";
import { IconButton, Stack, TextField } from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const GenericTableActions = ({
  search = "",
  onSearchChange,
  onFilterClick,
  onExportClick,
  showSearch = true,
  showFilter = true,
  showExport = true,
}: GenericTableActionsProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      {showSearch && (
        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          sx={{
            minWidth: 220,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fafafa",
            },
          }}
        />
      )}
      {showFilter && (
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
      )}
      {showExport && (
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
      )}
    </Stack>
  );
};
