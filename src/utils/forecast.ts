import { PARIS_LAT, PARIS_LON } from "../constants/geolocation";
import {
  completeForecastValue,
  forecastValue,
  reducedForecastValue,
} from "../types/forecastValue";
import {
  formatDateIntoDateMonthYear,
  getDayFromDate,
  getHourFromDate,
  getWeekDayNameFromDateString,
} from "./datetime";
import { capitalize } from "./strings";
import { convertKelvinToIntCelsius } from "./temperature";

export const groupForecastValuesByDate = (
  forecastValues: forecastValue[]
): Record<string, forecastValue[]> => {
  const groupedDates: Record<string, forecastValue[]> = {};

  forecastValues.forEach((value) => {
    const date = new Date(value.dt_txt);
    const groupKey = formatDateIntoDateMonthYear(date);

    if (groupedDates[groupKey]) {
      groupedDates[groupKey] = [...groupedDates[groupKey], value];
    } else {
      groupedDates[groupKey] = [value];
    }
  });

  return groupedDates;
};

export const reduceForecastValueInfos = (
  forecastValue: forecastValue
): reducedForecastValue => {
  return {
    time: getHourFromDate(new Date(forecastValue.dt_txt)),
    temp_min: convertKelvinToIntCelsius(forecastValue.main.temp_min),
    temp_max: convertKelvinToIntCelsius(forecastValue.main.temp_max),
    description: capitalize(forecastValue.weather[0].description),
  };
};

export const createCompleteForecastValue = (
  forcastValue: forecastValue,
  dateStr: string
): completeForecastValue => {
  return {
    ...reduceForecastValueInfos(forcastValue),
    dateStr,
    day: getDayFromDate(dateStr),
    weekdayName: getWeekDayNameFromDateString(dateStr),
  };
};

export const fetchForecastFromServer = async () => {
  return await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${PARIS_LAT}&lon=${PARIS_LON}&appid=${
      import.meta.env.VITE_FORECAST_APP_ID
    }&lang=fr`,
    {
      method: "GET",
      headers: {
        // prettier-ignore
        "Accept": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((json) => Promise.reject(json));
  });
};
