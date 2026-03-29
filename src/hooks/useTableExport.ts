import type { TableColumn } from "../types/TableColumn.ts";
import { useCallback } from "react";

export function useTableExport<T extends Record<string, unknown>>() {
  const exportCSV = useCallback(
    (data: T[], columns: TableColumn<T>[], fileName: string) => {
      if (!data.length) return;

      // headers
      const headers = columns.map((col) => col.label);

      // rows
      const rows = data.map((row) =>
        columns.map((col) => {
          const value = row[col.id];

          if (value === null || value === undefined) return "";

          // escape quotes
          const stringValue = String(value).replace(/"/g, '""');

          return `"${stringValue}"`;
        }),
      );

      const csvContent = [
        headers.join(","),
        ...rows.map((r) => r.join(",")),
      ].join("\n");

      //need for diacritics so that names are correctly shown in the export
      const BOM = "\uFEFF";

      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // clean filename, no spaces
      const safeFileName = (fileName || "export")
        .toLowerCase()
        .replaceAll(" ", "_");

      link.setAttribute("download", `${safeFileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //freeing up memory after the download
      URL.revokeObjectURL(url);
    },
    [],
  );
  return { exportCSV };
}
