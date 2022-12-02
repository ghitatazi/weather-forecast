import { useCallback, useEffect, useMemo, useState } from "react";
import {
  completeForecastValue,
  forecastValue,
  reducedForecastValue,
} from "../types/forecastValue";
import {
  createCompleteForecastValue,
  fetchForecastFromServer,
  groupForecastValuesByDate,
  reduceForecastValueInfos,
} from "../utils/forecast";
import { getSlicedObject } from "../utils/objects";
import { useLocalStorage } from "./useLocalStorage";

export type useWeatherForecastType = {
  weeklyForecastValues: completeForecastValue[];
  getHourlyForecastValues: (dateStr: string) => reducedForecastValue[];
  isError: boolean;
  isLoading: boolean;
};

export const useWeatherForecast = (): useWeatherForecastType => {
  const [valuesInStorage, setValuesInStorage] = useLocalStorage("forecast", "");
  const [forecastValues, setForecastValues] = useState<
    Record<string, forecastValue[]>
  >({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!valuesInStorage) {
      setIsLoading(true);
      fetchForecastFromServer()
        .then((data) => {
          setValuesInStorage(
            JSON.stringify(groupForecastValuesByDate(data.list))
          );
        })
        .catch(setIsError)
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!!valuesInStorage) {
      setForecastValues(JSON.parse(valuesInStorage));
    }
  }, [valuesInStorage]);

  const weeklyForecastValues = useMemo((): completeForecastValue[] => {
    const output = [];
    const slicedForecastValues = getSlicedObject(forecastValues);

    if (slicedForecastValues.length > 0) {
      for (const key in Object.keys(slicedForecastValues)) {
        const completeForecastValue = createCompleteForecastValue(
          slicedForecastValues[key][1][0], // first forecast value for the specific date
          slicedForecastValues[key][0] // date string
        );
        output.push(completeForecastValue);
      }
    }

    return output;
  }, [forecastValues]);

  const getHourlyForecastValues = useCallback(
    (dateStr: string): reducedForecastValue[] => {
      const dateForecaseValues = forecastValues[dateStr];
      const hourlyForecastValues = dateForecaseValues.map(
        reduceForecastValueInfos
      );
      return hourlyForecastValues;
    },
    [forecastValues]
  );

  return {
    weeklyForecastValues,
    getHourlyForecastValues,
    isError,
    isLoading,
  };
};
