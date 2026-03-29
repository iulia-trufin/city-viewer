export function sortData<T>(
  data: T[],
  orderBy?: keyof T | null,
  order?: "asc" | "desc",
): T[] {
  if (!orderBy || !order) {
    return data;
  }
  return [...data].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    //population case so number handling
    if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
      if (order === "asc") {
        return Number(aValue) - Number(bValue);
      } else if (order === "desc") {
        return Number(bValue) - Number(aValue);
      }
    }
    //if normal so string
    if (
      order === "asc" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      return aValue.localeCompare(bValue);
    } else if (
      order === "desc" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      return bValue.localeCompare(aValue);
    }
    return 0;
    //not treating objects yet because no such case... yet
  });
}
