import moment from "moment";
import type { DateFilter } from "../types/DateFilter";

export const getLastWeekFilter = (): DateFilter => {
  const end = moment().startOf("minute");
  const start = moment().subtract(1, "week").startOf("minute");

  return { startDate: start, endDate: end };
};
