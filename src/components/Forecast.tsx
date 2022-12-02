import { useContext, useState } from "react";
import { ForecastContext } from "../contexts/ForecastContextProvider";
import "../styles/Forecast.css";
import { DetailedForecast } from "./DetailedForecast";
import { WeeklyForecast } from "./WeeklyForecast";

export const Forecast = (): JSX.Element => {
  const { isError, isLoading } = useContext(ForecastContext);
  const [selectedForecastDateStr, setSelectedForecastDateStr] = useState("");

  if (isLoading) return <>{"Loading..."}</>;

  if (isError) return <>{"An error has occurred"}</>;

  return (
    <>
      <div className="forecast-week">
        <WeeklyForecast
          setSelectedForecastDateStr={setSelectedForecastDateStr}
        />
      </div>
      {selectedForecastDateStr && (
        <div className="forecast-details">
          <DetailedForecast dateStr={selectedForecastDateStr} />
        </div>
      )}
    </>
  );
};
