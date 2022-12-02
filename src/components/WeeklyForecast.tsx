import { useContext } from "react";
import { ForecastContext } from "../contexts/ForecastContextProvider";
import DailyForecast from "./DailyForecast";

type WeeklyForecastType = {
  setSelectedForecastDateStr: React.Dispatch<React.SetStateAction<string>>;
};

export const WeeklyForecast = ({
  setSelectedForecastDateStr,
}: WeeklyForecastType): JSX.Element => {
  const { weeklyForecastValues } = useContext(ForecastContext);

  return (
    <>
      {weeklyForecastValues.map((value, index) => (
        <div id={value.dateStr} key={`${value.weekdayName} + ${index}`}>
          <DailyForecast
            {...value}
            handleClick={() => setSelectedForecastDateStr(value.dateStr)}
          />
        </div>
      ))}
    </>
  );
};
