import { useState } from "react";

export function useSort<T>() {
  const [orderBy, setOrderBy] = useState<keyof T | null>(null);
  const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined);
  const handleSort = (columnId: keyof T) => {
    if (orderBy === columnId) {
      if (order === "asc") {
        setOrder("desc");
      } else if (order === "desc") {
        setOrderBy(null);
        setOrder(undefined);
      }
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };
  return {
    order,
    orderBy,
    handleSort,
  };
}
