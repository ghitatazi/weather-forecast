import { TODAY_FR } from "../constants/date";
import { capitalize } from "./strings";

export const formatDateIntoDateMonthYear = (date: Date): string => {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
};

export const getHourFromDate = (date: Date): string =>
  date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

export const getDayFromDate = (dateStr: string) =>
  ("0" + new Date(dateStr).getDate()).slice(-2);

const areDatesEqual = (date1: Date, date2: Date) =>
  date1.toDateString() === date2.toDateString();

export const getWeekDayNameFromDateString = (dateStr: string) => {
  const today = new Date();
  const weekdayDate = new Date(dateStr);

  if (areDatesEqual(weekdayDate, today)) {
    return TODAY_FR;
  } else {
    const weekdayName = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
    }).format(weekdayDate);
    return capitalize(weekdayName);
  }
};
