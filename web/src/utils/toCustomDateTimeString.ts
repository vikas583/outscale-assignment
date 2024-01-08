import { DateTime } from "luxon";

export const toCustomDateTimeString = (dt: DateTime) => {
  return `${dt.toLocaleString()} ${dt.toFormat("hh:mm a")}`;
};
