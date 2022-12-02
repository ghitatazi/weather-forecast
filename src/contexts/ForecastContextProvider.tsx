import { createContext } from "react";
import {
  useWeatherForecast,
  useWeatherForecastType,
} from "../hooks/useWeatherForecast";

type ForecastContextProviderType = {
  children: JSX.Element;
};

export const ForecastContext = createContext<useWeatherForecastType>({
  weeklyForecastValues: [],
  getHourlyForecastValues: (dateStr) => [],
  isError: false,
  isLoading: false,
});

export const ForecastContextProvider = ({
  children,
}: ForecastContextProviderType): JSX.Element => {
  const { weeklyForecastValues, getHourlyForecastValues, isError, isLoading } =
    useWeatherForecast();

  return (
    <ForecastContext.Provider
      value={{
        weeklyForecastValues,
        getHourlyForecastValues,
        isError,
        isLoading,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
