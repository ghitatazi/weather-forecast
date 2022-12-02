import { TODAY_FR } from "../constants/date";
import "../styles/DailyForecast.css";
import { completeForecastValue } from "../types/forecastValue";

type DailyForecastType = completeForecastValue & {
  handleClick: () => void;
};

export default function DailyForecast({
  weekdayName,
  dateStr,
  day,
  temp_min,
  temp_max,
  description,
  handleClick,
}: DailyForecastType): JSX.Element {
  return (
    <button className="day" onClick={handleClick}>
      <p className="info main-info">
        {weekdayName === TODAY_FR ? TODAY_FR : `${weekdayName} ${day}`}
      </p>
      <p className="info main-info">
        <span className="temp_min">{`${temp_min}°C `}</span>/
        <span className="temp_max">{` ${temp_max}°C`}</span>
      </p>
      <p className="info description">{description}</p>
    </button>
  );
}
