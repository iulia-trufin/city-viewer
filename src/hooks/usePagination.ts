import { type ChangeEvent, useState } from "react";

export function usePagination<T>(data: T[]) {
  //mui is 0 based, so a normal human page starts from 0...
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //MUI insists that I have the event param, but don't need it, so trying to ignore it cleanly
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const paginatedData: T[] = [];
  const startIndex: number = page * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;
  data.forEach((value: T, index: number) => {
    if (index >= startIndex && index < endIndex) {
      paginatedData.push(value);
    }
  });

  return {
    page,
    rowsPerPage,
    paginatedData,
    handlePageChange,
    handleRowsChange,
  };
}
